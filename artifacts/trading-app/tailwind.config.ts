import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        "bg-primary": "#0f1117",
        "bg-card": "#1a1d27",
        "bg-card-hover": "#212436",
        "border-dark": "#2a2d3e",
        "text-primary": "#e2e8f0",
        "text-secondary": "#8892a4",
        "green-trade": "#00c896",
        "red-trade": "#ff4757",
        accent: "#6c63ff",
      },
      borderColor: {
        DEFAULT: "#2a2d3e",
      },
    },
  },
  plugins: [],
};
export default config;
