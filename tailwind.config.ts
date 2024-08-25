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
        colors: {
          themeColor: 'rgba(33, 33, 33, 1)',
          fontColor: 'rgba(34, 34, 34, 1)',
          grayFont: 'rgba(158, 158, 158, 1)',
          darkGrayFont: 'rgba(117, 117, 117, 1)',
          grayBorder: 'rgba(117, 117, 117, 1)',
        },
      },
    },
  },
  plugins: [],
};
export default config;
