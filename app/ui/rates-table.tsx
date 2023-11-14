"use client";

import { useContext } from "react";
import { CurrencyContext } from "../context/currency-context";
import { RatesTableSkeleton } from "../rates/loading";

type RatesTableProps = {
  rates: { currency: string; rate: number }[] | undefined;
};

export function RatesTable({ rates }: RatesTableProps) {
  const { amount } = useContext(CurrencyContext);

  return rates ? (
    <div className="mt-2 max-h-full sm:max-h-96 overflow-auto">
      <div className="py-2 flex justify-between text-slate-400">
        <span className="basis-1/3">Currency</span>
        <span className="basis-1/3 text-end">Rate</span>
        <span className="basis-1/3 text-end">Result</span>
      </div>
      {rates.map((rate, index) => (
        <div
          key={rate.currency}
          className={`${
            index !== rates.length - 1 ? "border-b-2 border-border" : ""
          } py-2 flex justify-between`}
        >
          <span className="basis-1/3">{rate.currency}</span>
          <span className="basis-1/3 text-end">{rate.rate.toFixed(2)}</span>
          {amount && (
            <span className="basis-1/3 text-end">
              {(rate.rate * Number(amount)).toFixed(2)}
            </span>
          )}
        </div>
      ))}
    </div>
  ) : (
    <RatesTableSkeleton />
  );
}
