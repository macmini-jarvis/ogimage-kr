import { NextRequest, NextResponse } from "next/server";
import { createHmac, timingSafeEqual } from "crypto";
import { createClient } from "@/lib/supabase/server";

const PRO_SIGN_SECRET = process.env.PRO_SIGN_SECRET;

export async function GET(req: NextRequest) {
  try {
    // 1. Supabase DB 확인 (로그인 유저)
    const supabase = await createClient();

    if (supabase) {
      const {
        data: { user },
      } = await supabase.auth.getUser();

      if (user) {
        const { data: sub } = await supabase
          .from("subscriptions")
          .select("status, paddle_subscription_id")
          .eq("user_id", user.id)
          .eq("status", "active")
          .limit(1)
          .single();

        if (sub) {
          return NextResponse.json({
            isPro: true,
            subscriptionId: sub.paddle_subscription_id,
          });
        }
      }
    }

    // 2. 쿠키 폴백 (레거시 호환)
    const token = req.cookies.get("pro_token")?.value;

    if (!token || !PRO_SIGN_SECRET) {
      return NextResponse.json({ isPro: false });
    }

    const parts = token.split(".");
    if (parts.length !== 3) {
      return NextResponse.json({ isPro: false });
    }

    const [txnId, timestamp, signature] = parts;

    if (!txnId.startsWith("txn_")) {
      return NextResponse.json({ isPro: false });
    }

    const payload = `${txnId}.${timestamp}`;
    const expectedSig = createHmac("sha256", PRO_SIGN_SECRET)
      .update(payload)
      .digest("hex");

    if (!timingSafeEqual(Buffer.from(signature), Buffer.from(expectedSig))) {
      return NextResponse.json({ isPro: false });
    }

    return NextResponse.json({ isPro: true, transactionId: txnId });
  } catch {
    return NextResponse.json({ isPro: false });
  }
}
