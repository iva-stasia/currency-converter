const API_KEY = process.env.API_KEY;

type CountriesData = {
  data: Record<string, {}>;
};

type RatesData = {
  data: Record<string, number>;
};

export async function fetchCurrencies() {
  const url = `https://api.freecurrencyapi.com/v1/currencies?apikey=${API_KEY}`;

  try {
    const response = await fetch(url);
    const data = (await response.json()) as CountriesData;

    return Object.keys(data.data);
  } catch (error) {
    console.error(error);
  }
}

export async function fetchRate(
  from: string | undefined,
  to: string | undefined
) {
  if (!from || !to) return;

  const url = `https://api.freecurrencyapi.com/v1/latest?apikey=${API_KEY}&base_currency=${from}&currencies=${to}`;
  try {
    const response = await fetch(url);
    const data = (await response.json()) as RatesData;

    // console.log(data);

    return Object.values(data.data)[0];
  } catch (error) {
    console.error(error);
  }
}

export async function fetchRates(base: string | undefined) {
  if (!base) return;
  const url = `https://api.freecurrencyapi.com/v1/latest?apikey=${API_KEY}&base_currency=${base}`;
  try {
    const response = await fetch(url);
    const data = (await response.json()) as RatesData;

    return Object.entries(data.data).map((entry) => ({
      currency: entry[0],
      rate: entry[1],
    }));
  } catch (error) {
    console.error(error);
  }
}
