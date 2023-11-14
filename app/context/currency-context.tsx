"use client";

import { useSearchParams } from "next/navigation";
import React, { createContext, useState } from "react";

type CurrencyContextProps = {
  toAmount: string | null;
  amount: string | null;
  setToAmount: (amount: string | null) => void;
  setAmount: (amount: string | null) => void;
};

export const CurrencyContext = createContext<CurrencyContextProps>(
  {} as CurrencyContextProps
);

const CurrencyProvider = ({ children }: { children: React.ReactNode }) => {
  const searchParams = useSearchParams();
  const [toAmount, setToAmount] = useState<string | null>("");
  const [amount, setAmount] = useState<string | null>(
    searchParams.get("amount") || "1"
  );

  const value = {
    toAmount,
    setToAmount,
    amount,
    setAmount,
  };
  return (
    <CurrencyContext.Provider value={value}>
      {children}
    </CurrencyContext.Provider>
  );
};

export default CurrencyProvider;
