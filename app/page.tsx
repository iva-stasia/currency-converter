import { fetchCurrencies, fetchRate, fetchRates } from "./lib/data";
import { ConverterForm } from "./ui/converter-form";

type HomeProps = {
  searchParams?: {
    from?: string;
    to?: string;
    amount?: string;
  };
};

export default async function Home({ searchParams }: HomeProps) {
  const currencies = await fetchCurrencies();
  const exchangeRate = await fetchRate(searchParams?.from, searchParams?.to);

  return <ConverterForm currencies={currencies} exchangeRate={exchangeRate} />;
}
