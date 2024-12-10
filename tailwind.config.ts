import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/ui/**/*.{js,ts,jsx,tsx,mdx}"
  ],
  theme: {
    extend: {
      colors: {
        background: "var(--background)",
        backgroundTwo: "#32302f",
        foreground: "var(--foreground)",
        foregroundTwo: "#A89984",
        shade: "#1D2021",
        lime: "#98971A",
        aqua: "#689D6A",
        blue: "#458588",
      },
    },
  },
  plugins: [],
};
export default config;
