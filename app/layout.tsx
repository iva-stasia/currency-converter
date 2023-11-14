import type { Metadata } from "next";
import { Poppins } from "next/font/google";
import "./globals.css";
import Nav from "./ui/nav";
import CurrencyProvider from "./context/currency-context";

const poppins = Poppins({ subsets: ["latin"], weight: ["400", "700"] });

export const metadata: Metadata = {
  title: "Currency Converter",
  description: "Web application for currency conversion",
};

export default function RootLayout({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <html lang="en">
      <CurrencyProvider>
        <body className={poppins.className}>
          <div className="w-[460px] p-4 h-[100svh] sm:h-auto flex flex-col gap-4 ">
            <Nav />
            <main className="p-4 bg-background-light border-2 border-border rounded-xl">
              {children}
            </main>
          </div>
        </body>
      </CurrencyProvider>
    </html>
  );
}
