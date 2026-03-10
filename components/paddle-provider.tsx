"use client";

import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { initializePaddle, Paddle } from "@paddle/paddle-js";

// 서버에서 Pro 상태 확인
export async function checkProStatus(): Promise<boolean> {
  try {
    const res = await fetch("/api/check-pro", { credentials: "same-origin" });
    if (!res.ok) return false;
    const data = await res.json();
    return data.isPro === true;
  } catch {
    return false;
  }
}

// 서버에 트랜잭션 검증 요청
async function verifyTransaction(transactionId: string): Promise<boolean> {
  try {
    const res = await fetch("/api/verify-pro", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ transactionId }),
      credentials: "same-origin",
    });
    if (!res.ok) return false;
    const data = await res.json();
    return data.success === true;
  } catch {
    return false;
  }
}

interface PaddleContextType {
  paddle: Paddle | null;
  openCheckout: () => void;
}

const PaddleContext = createContext<PaddleContextType>({
  paddle: null,
  openCheckout: () => {},
});

export function usePaddle() {
  return useContext(PaddleContext);
}

export default function PaddleProvider({
  children,
  onSubscribed,
}: {
  children: React.ReactNode;
  onSubscribed: () => void;
}) {
  const [paddle, setPaddle] = useState<Paddle | null>(null);

  useEffect(() => {
    const clientToken = process.env.NEXT_PUBLIC_PADDLE_CLIENT_TOKEN;
    if (!clientToken) return;

    initializePaddle({
      token: clientToken,
      environment:
        process.env.NEXT_PUBLIC_PADDLE_ENV === "production"
          ? "production"
          : "sandbox",
      eventCallback(event) {
        if (event.name === "checkout.completed") {
          // eslint-disable-next-line @typescript-eslint/no-explicit-any
          const txId = (event.data as any)?.transaction_id;
          if (txId) {
            // 서버에서 Paddle API로 트랜잭션 검증 후 서명된 쿠키 발급
            verifyTransaction(txId).then((verified) => {
              if (verified) {
                onSubscribed();
              }
            });
          }
        }
      },
    }).then((p) => {
      if (p) setPaddle(p);
    });
  }, [onSubscribed]);

  const openCheckout = useCallback(() => {
    const priceId = process.env.NEXT_PUBLIC_PADDLE_PRICE_PRO;
    if (!paddle || !priceId) {
      console.warn("Paddle 미초기화 또는 가격 ID 없음");
      return;
    }

    paddle.Checkout.open({
      items: [{ priceId, quantity: 1 }],
      settings: {
        displayMode: "overlay",
        theme: "dark",
        locale: "ko",
      },
    });
  }, [paddle]);

  return (
    <PaddleContext.Provider value={{ paddle, openCheckout }}>
      {children}
    </PaddleContext.Provider>
  );
}
