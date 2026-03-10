"use client";

import { createContext, useContext, useEffect, useState, useCallback } from "react";
import { initializePaddle, Paddle } from "@paddle/paddle-js";

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
          onSubscribed();
          localStorage.setItem("ogmaker_pro", "true");
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
