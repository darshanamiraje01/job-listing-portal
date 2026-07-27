module.exports = {
  content: ["./index.html", "./src/**/*.{js,jsx}"],
  theme: {
    extend: {
      colors: {
        brand: {
          50:  "#eff6ff",
          100: "#dbeafe",
          200: "#bfdbfe",
          500: "#3b82f6",
          600: "#2563eb",
          700: "#1d4ed8",
          800: "#1e40af",
          900: "#1e3a8a",
        },
        surface: {
          DEFAULT: "#ffffff",
          muted:   "#f8fafc",
          border:  "#e2e8f0",
        },
        text: {
          primary:   "#0f172a",
          secondary: "#475569",
          muted:     "#94a3b8",
        },
        success: { light: "#dcfce7", DEFAULT: "#16a34a", dark: "#15803d" },
        warning: { light: "#fef9c3", DEFAULT: "#ca8a04", dark: "#a16207" },
        danger:  { light: "#fee2e2", DEFAULT: "#dc2626", dark: "#b91c1c" },
      },
      fontFamily: {
        sans: ["Inter", "system-ui", "sans-serif"],
      },
      borderRadius: {
        card: "0.75rem",
        btn:  "0.5rem",
      },
      boxShadow: {
        card:    "0 1px 3px 0 rgb(0 0 0/0.07), 0 1px 2px -1px rgb(0 0 0/0.07)",
        "card-hover": "0 4px 16px 0 rgb(0 0 0/0.10), 0 2px 6px -2px rgb(0 0 0/0.08)",
        modal:   "0 20px 60px -10px rgb(0 0 0/0.20)",
      },
    },
  },
  plugins: [],
};