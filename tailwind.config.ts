import type { Config } from "tailwindcss";

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/test/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        textPrimary: "var(--textPrimary)",
        textSecondary: "var(--textSecondary)",
        textTertiary: "var(--textTertiary)",
        link: 'var(--link)',
        backgroundPrimary: 'var(--backgroundPrimary)',
        backgroundSecondary: 'var(--backgroundSecondary)',
        backgroundTertiary: 'var(--backgroundTertiary)',
        button: 'var(--button)',
        danger: 'var(--danger)',
        warning: 'var(--warning)',
        success: 'var(--success)',
        modalBackground: 'var(--modalBackground)',
      },
    },
  },
  plugins: [  ],
  darkmode: 'class',
} satisfies Config;
