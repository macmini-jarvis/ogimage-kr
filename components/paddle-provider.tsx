"use client";

import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { initializePaddle, Paddle } from "@paddle/paddle-js";

const PRO_STORAGE_KEY = "ogmaker_pro";
const PRO_TX_KEY = "ogmaker_pro_tx";

// Pro 상태 검증: transaction ID가 있어야 유효
export function isProStored(): boolean {
  try {
    const pro = localStorage.getItem(PRO_STORAGE_KEY);
    const tx = localStorage.getItem(PRO_TX_KEY);
    return pro === "true" && !!tx && tx.startsWith("txn_");
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
          const txId = (event.data as any)?.transaction_id ?? `txn_${Date.now()}`;
          localStorage.setItem(PRO_STORAGE_KEY, "true");
          localStorage.setItem(PRO_TX_KEY, txId);
          onSubscribed();
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
