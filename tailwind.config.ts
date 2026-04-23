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
        // Legacy `ink` palette remapped to warm tones so existing
        // `bg-ink-*` / `ring-offset-ink-*` utilities inherit the new look.
        ink: {
          900: "#FFC72C",
          800: "#FFF8E7",
          700: "#FFF8E7",
          600: "#FFEFC2",
        },
        brand: {
          yellow: "#FFC72C",
          "yellow-dark": "#E6B020",
          "yellow-light": "#FFD65A",
          brown: "#4A2818",
          "brown-dark": "#2E180E",
          black: "#4A2818",
          green: "#1B5E3F",
          "green-dark": "#144A31",
          orange: "#FF6B35",
          "orange-dark": "#E65A28",
          cream: "#FFF8E7",
        },
        paper: "#FFF8E7",
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
        brand: "0 10px 30px -12px rgba(74,40,24,0.25)",
        glow: "0 8px 20px -8px rgba(74,40,24,0.25)",
        "glow-lg": "0 14px 30px -12px rgba(74,40,24,0.35)",
        card: "0 6px 16px -8px rgba(74,40,24,0.2)",
      },
      backgroundImage: {
        "radial-spot":
          "radial-gradient(circle at 50% 0%, rgba(255,255,255,0.25), transparent 60%)",
        "sep-gradient":
          "linear-gradient(90deg, transparent, rgba(74,40,24,0.4), transparent)",
      },
      keyframes: {
        pulseGlow: {
          "0%, 100%": {
            boxShadow:
              "0 0 0 0 rgba(27,94,63,0.55), 0 0 0 0 rgba(27,94,63,0.35)",
          },
          "50%": {
            boxShadow:
              "0 0 0 14px rgba(27,94,63,0), 0 0 0 28px rgba(27,94,63,0)",
          },
        },
        pulseYellow: {
          "0%, 100%": { boxShadow: "0 0 0 0 rgba(255,107,53,0.55)" },
          "50%": { boxShadow: "0 0 0 18px rgba(255,107,53,0)" },
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
