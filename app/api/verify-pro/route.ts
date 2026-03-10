import { NextRequest, NextResponse } from "next/server";
import { createHmac } from "crypto";

const PADDLE_API_KEY = process.env.PADDLE_API_KEY;
const PRO_SIGN_SECRET = process.env.PRO_SIGN_SECRET;
const PADDLE_ENV = process.env.NEXT_PUBLIC_PADDLE_ENV;

function signToken(txnId: string, timestamp: number): string {
  if (!PRO_SIGN_SECRET) throw new Error("PRO_SIGN_SECRET not set");
  const payload = `${txnId}.${timestamp}`;
  const signature = createHmac("sha256", PRO_SIGN_SECRET)
    .update(payload)
    .digest("hex");
  return `${payload}.${signature}`;
}

export async function POST(req: NextRequest) {
  try {
    const { transactionId } = await req.json();

    if (
      !transactionId ||
      typeof transactionId !== "string" ||
      !transactionId.startsWith("txn_")
    ) {
      return NextResponse.json(
        { error: "유효하지 않은 트랜잭션 ID" },
        { status: 400 }
      );
    }

    if (!PADDLE_API_KEY || !PRO_SIGN_SECRET) {
      return NextResponse.json(
        { error: "서버 설정 오류" },
        { status: 500 }
      );
    }

    // Paddle API로 트랜잭션 검증
    const baseUrl =
      PADDLE_ENV === "production"
        ? "https://api.paddle.com"
        : "https://sandbox-api.paddle.com";

    const paddleRes = await fetch(`${baseUrl}/transactions/${transactionId}`, {
      headers: {
        Authorization: `Bearer ${PADDLE_API_KEY}`,
        "Content-Type": "application/json",
      },
    });

    if (!paddleRes.ok) {
      return NextResponse.json(
        { error: "트랜잭션을 확인할 수 없습니다" },
        { status: 403 }
      );
    }

    const paddleData = await paddleRes.json();
    const status = paddleData.data?.status;

    if (status !== "completed" && status !== "paid") {
      return NextResponse.json(
        { error: "결제가 완료되지 않았습니다" },
        { status: 403 }
      );
    }

    // 서명된 토큰 생성
    const timestamp = Math.floor(Date.now() / 1000);
    const token = signToken(transactionId, timestamp);

    const response = NextResponse.json({ success: true });
    response.cookies.set("pro_token", token, {
      httpOnly: true,
      secure: true,
      sameSite: "strict",
      maxAge: 60 * 60 * 24 * 400, // 400일
      path: "/",
    });

    return response;
  } catch {
    return NextResponse.json(
      { error: "서버 오류가 발생했습니다" },
      { status: 500 }
    );
  }
}
