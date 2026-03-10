import { NextRequest, NextResponse } from "next/server";
import { createHmac } from "crypto";
import { createAdminClient } from "@/lib/supabase/admin";

const PADDLE_WEBHOOK_SECRET = process.env.PADDLE_WEBHOOK_SECRET;

function verifyWebhookSignature(
  rawBody: string,
  signature: string | null
): boolean {
  if (!signature || !PADDLE_WEBHOOK_SECRET) return false;

  const parts: Record<string, string> = {};
  signature.split(";").forEach((part) => {
    const [key, value] = part.split("=");
    if (key && value) parts[key] = value;
  });

  const ts = parts["ts"];
  const h1 = parts["h1"];
  if (!ts || !h1) return false;

  const payload = `${ts}:${rawBody}`;
  const computed = createHmac("sha256", PADDLE_WEBHOOK_SECRET)
    .update(payload)
    .digest("hex");

  return computed === h1;
}

export async function POST(req: NextRequest) {
  try {
    const rawBody = await req.text();
    const signature = req.headers.get("paddle-signature");

    if (!verifyWebhookSignature(rawBody, signature)) {
      return NextResponse.json(
        { error: "서명 검증 실패" },
        { status: 401 }
      );
    }

    const supabase = createAdminClient();
    if (!supabase) {
      console.error("Paddle webhook: Supabase 미설정");
      return NextResponse.json(
        { error: "서버 설정 오류" },
        { status: 500 }
      );
    }

    const event = JSON.parse(rawBody);
    const eventType = event.event_type as string;
    const data = event.data;

    if (
      eventType === "subscription.created" ||
      eventType === "subscription.updated" ||
      eventType === "subscription.activated"
    ) {
      const userId = data.custom_data?.userId;
      if (!userId) {
        console.warn("Paddle webhook: userId 없음", data.id);
        return NextResponse.json({ received: true });
      }

      const billingPeriod = data.current_billing_period;

      await supabase.from("subscriptions").upsert(
        {
          user_id: userId,
          paddle_subscription_id: data.id,
          paddle_customer_id: data.customer_id,
          status:
            data.status === "active" || data.status === "trialing"
              ? "active"
              : data.status,
          price_id: data.items?.[0]?.price?.id ?? null,
          current_period_start: billingPeriod?.starts_at ?? null,
          current_period_end: billingPeriod?.ends_at ?? null,
          updated_at: new Date().toISOString(),
        },
        { onConflict: "paddle_subscription_id" }
      );
    }

    if (eventType === "subscription.canceled") {
      await supabase
        .from("subscriptions")
        .update({
          status: "canceled",
          updated_at: new Date().toISOString(),
        })
        .eq("paddle_subscription_id", data.id);
    }

    if (eventType === "subscription.past_due") {
      await supabase
        .from("subscriptions")
        .update({
          status: "past_due",
          updated_at: new Date().toISOString(),
        })
        .eq("paddle_subscription_id", data.id);
    }

    return NextResponse.json({ received: true });
  } catch (err) {
    console.error("Paddle webhook 오류:", err);
    return NextResponse.json(
      { error: "처리 실패" },
      { status: 500 }
    );
  }
}
