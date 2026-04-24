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
        ink: {
          900: "#FFC72C",
          800: "#FFF8E7",
          700: "#FFF8E7",
          600: "#FFF0C9",
        },
        brand: {
          yellow: "#FFC72C",
          "yellow-soft": "#FFD95F",
          green: "#1B5E3F",
          "green-dark": "#12472E",
          brown: "#4A2818",
          "brown-dark": "#32180E",
          orange: "#FF6B35",
          "orange-dark": "#DF5425",
          cream: "#FFF8E7",
        },
        paper: "#FFF8E7",
      },
      fontFamily: {
        display: ["var(--font-bebas)", "Impact", "system-ui", "sans-serif"],
        body: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      fontSize: {
        hero: ["8rem", { lineHeight: "0.82", letterSpacing: "0" }],
        "hero-sm": ["4.75rem", { lineHeight: "0.86", letterSpacing: "0" }],
        section: ["4.5rem", { lineHeight: "0.92", letterSpacing: "0" }],
        "section-sm": ["3rem", { lineHeight: "0.96", letterSpacing: "0" }],
      },
      boxShadow: {
        hard: "4px 4px 0 #4A2818",
        "hard-lg": "8px 8px 0 #4A2818",
        green: "5px 5px 0 #1B5E3F",
        "green-lg": "9px 9px 0 #1B5E3F",
        orange: "5px 5px 0 #FF6B35",
        "inner-ticket": "inset 0 0 0 2px rgba(74,40,24,0.08)",
        card: "4px 4px 0 #1B5E3F",
      },
      keyframes: {
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
        whatsappPulse: {
          "0%, 72%, 100%": { transform: "scale(1)" },
          "82%": { transform: "scale(1.08)" },
          "92%": { transform: "scale(1)" },
        },
        floatFood: {
          "0%, 100%": { transform: "translateY(0) rotate(-1deg)" },
          "50%": { transform: "translateY(-10px) rotate(1deg)" },
        },
      },
      animation: {
        marquee: "marquee 35s linear infinite",
        "whatsapp-pulse": "whatsappPulse 3s ease-in-out infinite",
        "float-food": "floatFood 5s ease-in-out infinite",
      },
    },
  },
  plugins: [],
};

export default config;
