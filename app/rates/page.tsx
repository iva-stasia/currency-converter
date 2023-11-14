import { fetchCurrencies, fetchRates } from "../lib/data";
import { RatesForm } from "../ui/rates-form";
import { RatesTable } from "../ui/rates-table";

type RatesProps = {
  searchParams?: {
    from?: string;
    to?: string;
  };
};

export default async function Rates({ searchParams }: RatesProps) {
  const rates = await fetchRates(searchParams?.from);
  const currencies = await fetchCurrencies();

  return (
    <div className="overflow-hidden">
      <RatesForm currencies={currencies} />
      <RatesTable rates={rates} />
    </div>
  );
}
