import type { Config } from "tailwindcss";
const { createThemes } = require('tw-colors')

export default {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  plugins: [
    createThemes({
      gruvbox: {
        'textPrimary' : '#EBDBB2',
        'textSecondary' : '#A89984',
        'link' : '#458588',
        'backgroundPrimary' : '#32302F',
        'backgroundSecondary' : '#282828',
        'button' : '#98971A',
        'danger' : '#CC241D',
        'warning' : '#D65D0E',
        'success' : '#689D6A',
        'modalBackground' : 'rgba(0, 0, 0, 0.5)',
      }
   })
  ],
} satisfies Config;
