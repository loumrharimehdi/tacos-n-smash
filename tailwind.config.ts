import type { Config } from "tailwindcss";

const config: Config = {
  content: [
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./lib/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
      colors: {
        brand: {
          yellow: "#FFD700",
          "yellow-dark": "#E6C200",
          black: "#1a1a1a",
          green: "#2d6a4f",
          "green-dark": "#1f4d38",
          cream: "#FFF8E1",
        },
      },
      fontFamily: {
        display: ["var(--font-display)", "system-ui", "sans-serif"],
        body: ["var(--font-body)", "system-ui", "sans-serif"],
      },
      boxShadow: {
        brand: "0 10px 30px -10px rgba(0,0,0,0.35)",
        "brand-yellow": "0 10px 30px -12px rgba(255,215,0,0.55)",
      },
      backgroundImage: {
        "hero-gradient":
          "radial-gradient(circle at 20% 10%, rgba(255,215,0,0.25), transparent 45%), radial-gradient(circle at 85% 80%, rgba(45,106,79,0.25), transparent 45%)",
      },
      keyframes: {
        wiggle: {
          "0%, 100%": { transform: "rotate(-2deg)" },
          "50%": { transform: "rotate(2deg)" },
        },
      },
      animation: {
        wiggle: "wiggle 2.5s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
