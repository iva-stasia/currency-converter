import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        background: { DEFAULT: "#415072", light: "#52658F", dark: "#292F45" },
        primary: { DEFAULT: "#FF777D", light: "#FFB3B6" },
        gray: "#E8E8E8",
        border: { DEFAULT: "#7787A8", light: "#C9D9F8" },
      },
    },
  },
  plugins: [],
};
export default config;
