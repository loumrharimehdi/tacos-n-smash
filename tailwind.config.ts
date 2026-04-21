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
          900: "#0a0a0a",
          800: "#111111",
          700: "#171717",
          600: "#1f1f1f",
        },
        brand: {
          yellow: "#FFD700",
          "yellow-dark": "#E6C200",
          "yellow-light": "#FFE55C",
          black: "#0a0a0a",
          green: "#2d6a4f",
          "green-dark": "#1f4d38",
          cream: "#FFF8E1",
        },
        paper: "#f5f5f5",
      },
      fontFamily: {
        display: ["var(--font-bebas)", "Impact", "system-ui", "sans-serif"],
        body: ["var(--font-inter)", "system-ui", "sans-serif"],
      },
      fontSize: {
        mega: ["clamp(4.5rem, 14vw, 10rem)", { lineHeight: "0.9", letterSpacing: "-0.02em" }],
        hero: ["clamp(3rem, 9vw, 6.25rem)", { lineHeight: "0.95", letterSpacing: "-0.01em" }],
        section: ["clamp(2.5rem, 6vw, 4.5rem)", { lineHeight: "1", letterSpacing: "-0.01em" }],
      },
      boxShadow: {
        brand: "0 30px 60px -20px rgba(0,0,0,0.6)",
        glow: "0 0 40px rgba(255,215,0,0.4), 0 0 80px rgba(255,215,0,0.15)",
        "glow-lg":
          "0 0 60px rgba(255,215,0,0.55), 0 0 120px rgba(255,215,0,0.25), inset 0 1px 0 rgba(255,255,255,0.2)",
        card: "0 20px 40px -20px rgba(0,0,0,0.8), 0 10px 20px -10px rgba(0,0,0,0.5)",
      },
      backgroundImage: {
        "radial-spot":
          "radial-gradient(circle at 50% 0%, rgba(255,215,0,0.15), transparent 60%)",
        "sep-gradient":
          "linear-gradient(90deg, transparent, rgba(255,215,0,0.6), transparent)",
      },
      keyframes: {
        pulseGlow: {
          "0%, 100%": {
            boxShadow:
              "0 0 0 0 rgba(37,211,102,0.55), 0 0 0 0 rgba(37,211,102,0.35)",
          },
          "50%": {
            boxShadow:
              "0 0 0 14px rgba(37,211,102,0), 0 0 0 28px rgba(37,211,102,0)",
          },
        },
        pulseYellow: {
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(255,215,0,0.55)" },
          "50%": { boxShadow: "0 0 0 18px rgba(255,215,0,0)" },
        },
        shimmer: {
          "0%": { backgroundPosition: "-200% 0" },
          "100%": { backgroundPosition: "200% 0" },
        },
        floatSlow: {
          "0%, 100%": { transform: "translateY(0px)" },
          "50%": { transform: "translateY(-8px)" },
        },
        scrollHint: {
          "0%": { transform: "translateY(-4px)", opacity: "0.2" },
          "50%": { opacity: "1" },
          "100%": { transform: "translateY(12px)", opacity: "0" },
        },
        marquee: {
          "0%": { transform: "translateX(0)" },
          "100%": { transform: "translateX(-50%)" },
        },
      },
      animation: {
        "pulse-glow": "pulseGlow 2.4s ease-out infinite",
        "pulse-yellow": "pulseYellow 2.4s ease-out infinite",
        shimmer: "shimmer 2.5s linear infinite",
        "float-slow": "floatSlow 4s ease-in-out infinite",
        "scroll-hint": "scrollHint 1.8s ease-in-out infinite",
        marquee: "marquee 30s linear infinite",
      },
    },
  },
  plugins: [],
};

export default config;
