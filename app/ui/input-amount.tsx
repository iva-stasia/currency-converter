"use client";

import { usePathname, useRouter, useSearchParams } from "next/navigation";

type InputAmountProps = {
  label: "from" | "to";
  placeholder: string;
  onChangeAmount: (value: string) => void;
  amount: string | null;
  exchangeRate?: number;
};

export default function InputAmount({
  label,
  placeholder,
  onChangeAmount,
  amount,
  exchangeRate,
}: InputAmountProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleInputChange = (amount: string) => {
    onChangeAmount(amount);

    const params = new URLSearchParams(searchParams);

    if (amount && exchangeRate) {
      const newAmount =
        label === "from"
          ? amount
          : (Number(amount) / exchangeRate).toFixed(2).toString();
      params.set("amount", newAmount);
    } else if (amount) {
      params.set("amount", amount);
    } else {
      params.delete("amount");
    }

    replace(`${pathname}?${params.toString()}`);
  };

  return (
    <div className="relative flex flex-1 flex-shrink-0">
      <label htmlFor={label} className="sr-only">
        {label}
      </label>
      <input
        type="number"
        className="peer block w-full rounded-lg border border-border bg-background px-4 py-2.5 outline-2 placeholder:text-gray-500 hover:border-border-light transition-colors"
        placeholder={placeholder}
        onChange={(e) => {
          handleInputChange(e.target.value);
        }}
        value={amount || ""}
      />
    </div>
  );
}
