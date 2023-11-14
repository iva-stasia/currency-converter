"use client";

import { useContext, useEffect, useState } from "react";
import CurrencySelect from "./currency-select";
import InputAmount from "./input-amount";
import SwitchCurrency from "./switch-currency";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { CurrencyContext } from "../context/currency-context";

type ConverterForm = {
  currencies: string[] | undefined;
  exchangeRate: number | undefined;
};

const DEFAULT_FROM_CURRENCY = "USD";
const DEFAULT_TO_CURRENCY = "EUR";

export function ConverterForm({ currencies, exchangeRate }: ConverterForm) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const [amountInFromCurrency, setAmountInFromCurrency] = useState(true);
  const { amount, setAmount, setToAmount } = useContext(CurrencyContext);

  useEffect(() => {
    const params = new URLSearchParams(searchParams);

    if (!searchParams.get("from") && !searchParams.get("to")) {
      params.set("from", DEFAULT_FROM_CURRENCY);
      params.set("to", DEFAULT_TO_CURRENCY);
    }

    if (!searchParams.get("amount")) {
      params.set("amount", "1");
    }

    replace(`${pathname}?${params.toString()}`);
  }, []);

  useEffect(() => {
    setToAmount(toAmount);
  }, [searchParams]);

  let toAmount: string | null = null;
  let fromAmount: string | null = null;

  if (amountInFromCurrency && exchangeRate) {
    fromAmount = amount;
    toAmount = amount ? (Number(amount) * exchangeRate).toFixed(2) : null;
  } else if (exchangeRate) {
    toAmount = amount;
    fromAmount = amount ? (Number(amount) / exchangeRate).toFixed(2) : null;
  }

  useEffect(() => {
    setToAmount(toAmount);
  }, [toAmount]);

  function handleFromAmountChange(value: string) {
    setAmount(value);
    setAmountInFromCurrency(true);
  }

  function handleToAmountChange(value: string) {
    setAmount(value);
    setAmountInFromCurrency(false);
  }

  if (!currencies || !exchangeRate) return;

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="w-full flex gap-2 items-center">
        <InputAmount
          label="from"
          placeholder="From"
          onChangeAmount={handleFromAmountChange}
          amount={fromAmount}
          exchangeRate={exchangeRate}
        />
        <CurrencySelect
          type="from"
          currencies={currencies}
          defaultValue={DEFAULT_FROM_CURRENCY}
        />
      </div>
      <SwitchCurrency />
      <div className="w-full flex gap-2 items-center">
        <InputAmount
          label="to"
          placeholder="To"
          onChangeAmount={handleToAmountChange}
          amount={toAmount}
          exchangeRate={exchangeRate}
        />
        <CurrencySelect
          type="to"
          currencies={currencies}
          defaultValue={DEFAULT_TO_CURRENCY}
        />
      </div>
    </div>
  );
}
