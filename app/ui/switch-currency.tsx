"use client";

import { ArrowsUpDownIcon } from "@heroicons/react/24/solid";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { useContext } from "react";
import { CurrencyContext } from "../context/currency-context";

export default function SwitchCurrency() {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();
  const { toAmount, setAmount } = useContext(CurrencyContext);

  const handleClick = () => {
    const params = new URLSearchParams(searchParams);

    const fromCurrency = searchParams.get("from")?.toString();
    const toCurrency = searchParams.get("to")?.toString();
    const amount = searchParams.get("amount")?.toString();

    if (!fromCurrency || !toCurrency || !amount || !toAmount) return;

    params.set("from", toCurrency);
    params.set("to", fromCurrency);
    params.set("amount", toAmount);

    setAmount(toAmount);

    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className="bg-background rounded-full p-3 border border-border hover:border-border-light transition-colors"
    >
      <ArrowsUpDownIcon className="w-6" />
    </button>
  );
}
