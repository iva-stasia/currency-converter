"use client";

import { useContext, useEffect } from "react";
import CurrencySelect from "./currency-select";
import InputAmount from "./input-amount";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { CurrencyContext } from "../context/currency-context";
import { DEFAULT_FROM_CURRENCY } from "../lib/constant";

type RatesFormProps = {
  currencies: string[] | undefined;
};

export function RatesForm({ currencies }: RatesFormProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const { amount, setAmount } = useContext(CurrencyContext);

  useEffect(() => {
    const params = new URLSearchParams(searchParams);

    if (!searchParams.get("from")) {
      params.set("from", DEFAULT_FROM_CURRENCY);
    }

    if (!searchParams.get("amount")) {
      params.set("amount", "1");
    }

    replace(`${pathname}?${params.toString()}`);
  }, []);

  function handleFromAmountChange(value: string) {
    setAmount(value);
  }

  return (
    <div className="flex flex-col items-center gap-2">
      <div className="w-full flex gap-2 items-center">
        <InputAmount
          label="from"
          placeholder="From"
          onChangeAmount={handleFromAmountChange}
          amount={amount}
        />
        {currencies && (
          <CurrencySelect
            type="from"
            currencies={currencies}
            defaultValue={DEFAULT_FROM_CURRENCY}
          />
        )}
      </div>
    </div>
  );
}
