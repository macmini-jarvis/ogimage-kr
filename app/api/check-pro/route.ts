import { NextRequest, NextResponse } from "next/server";
import { createHmac } from "crypto";

const PRO_SIGN_SECRET = process.env.PRO_SIGN_SECRET;

export async function GET(req: NextRequest) {
  try {
    const token = req.cookies.get("pro_token")?.value;

    if (!token || !PRO_SIGN_SECRET) {
      return NextResponse.json({ isPro: false });
    }

    const parts = token.split(".");
    if (parts.length !== 3) {
      return NextResponse.json({ isPro: false });
    }

    const [txnId, timestamp, signature] = parts;

    // txn_ 접두사 확인
    if (!txnId.startsWith("txn_")) {
      return NextResponse.json({ isPro: false });
    }

    // HMAC 서명 검증
    const payload = `${txnId}.${timestamp}`;
    const expectedSig = createHmac("sha256", PRO_SIGN_SECRET)
      .update(payload)
      .digest("hex");

    if (signature !== expectedSig) {
      return NextResponse.json({ isPro: false });
    }

    return NextResponse.json({ isPro: true, transactionId: txnId });
  } catch {
    return NextResponse.json({ isPro: false });
  }
}
