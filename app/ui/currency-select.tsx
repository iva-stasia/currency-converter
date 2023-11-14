"use client";

import { Listbox, Transition } from "@headlessui/react";
import { CheckIcon, ChevronUpDownIcon } from "@heroicons/react/24/solid";
import { usePathname, useRouter, useSearchParams } from "next/navigation";
import { Fragment } from "react";

type CurrencySelectProps = {
  type: "from" | "to";
  currencies: string[] | undefined;
  defaultValue: string;
};

export default function CurrencySelect({
  type,
  currencies,
  defaultValue,
}: CurrencySelectProps) {
  const searchParams = useSearchParams();
  const pathname = usePathname();
  const { replace } = useRouter();

  const handleSelect = (currency: string) => {
    const params = new URLSearchParams(searchParams);

    params.set(type, currency);

    replace(`${pathname}?${params.toString()}`);
  };

  const currentCurrency = searchParams.get(type)?.toString() || defaultValue;

  return (
    <Listbox
      onChange={(currency) => {
        handleSelect(currency);
      }}
      defaultValue={currentCurrency}
    >
      <div className="relative basis-1/4">
        <Listbox.Button className="w-full px-4 py-2.5 rounded-lg border-2 border-border text-left bg-transparent">
          <span className="block truncate">{currentCurrency}</span>
          <span className="pointer-events-none absolute inset-y-0 right-0 flex items-center pr-2">
            <ChevronUpDownIcon
              className="h-5 w-5 text-gray-400"
              aria-hidden="true"
            />
          </span>
        </Listbox.Button>
        {currencies && (
          <Transition
            as={Fragment}
            leave="transition ease-in duration-100"
            leaveFrom="opacity-100"
            leaveTo="opacity-0"
          >
            <Listbox.Options className="w-full z-10 rounded-lg border-2 border-border bg-background absolute mt-1 max-h-60 overflow-auto">
              {currencies.map((currency) => (
                <Listbox.Option
                  key={currency}
                  value={currency}
                  className={`relative cursor-default select-none px-4 py-2 pl-10 ${
                    currentCurrency === currency
                      ? "bg-primary-light text-slate-900"
                      : "text-gray"
                  } hover:bg-primary-light hover:text-slate-900 hover:cursor-pointer`}
                >
                  <>
                    <span
                      className={`block truncate ${
                        currentCurrency === currency
                          ? "font-medium"
                          : "font-normal"
                      }`}
                    >
                      {currency}
                    </span>
                    {currentCurrency === currency ? (
                      <span className="absolute inset-y-0 left-0 flex items-center pl-3">
                        <CheckIcon className="h-5 w-5" aria-hidden="true" />
                      </span>
                    ) : null}
                  </>
                </Listbox.Option>
              ))}
            </Listbox.Options>
          </Transition>
        )}
      </div>
    </Listbox>
  );
}
