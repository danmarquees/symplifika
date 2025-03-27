/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./index.html", "./src/**/*.{js,ts,jsx,tsx}"],
  theme: {
    extend: {
      fontFamily: {
        title: ["Poppins", "sans-serif"],
        subtitle: ["Inter", "sans-serif"],
        body: ["Inter", "sans-serif"],
        highlight: ["Poppins", "sans-serif"],
      },
      fontSize: {
        h1: "2rem", // Ajuste o valor conforme necessário para mobile
        h2: "1.5rem",
        h3: "1.25rem",
        base: "1rem",
        small: "0.875rem",
      },
      colors: {
        sidebar: "#ffffff", // Adicionei isso
        textGray: "#4A5568",
        borderGray: "#E0E0E0", // Cinza Claro como separador e fundo sutil
        primary: "#00FF57", // Verde Neon
        "primary-foreground": "#000000", // Preto
        secondary: "#000000", // Preto
        "secondary-foreground": "#ffffff", // Branco
        destructive: "#EF4444",
        "destructive-foreground": "#ffffff",
        muted: "#9CA3AF",
        "muted-foreground": "#6B7280",
        accent: "#F3F4F6",
        "accent-foreground": "#1F2937",
        card: "#ffffff",
        "card-foreground": "#000000",
        background: "#ffffff",
        input: "#E2E8F0",
        verdeNeonClaro: "#00C853",
        white: "#FFFFFF", // Branco
        black: "#000000", // Preto
      },
    },
  },
  plugins: [require("@tailwindcss/forms"), require("@tailwindcss/typography")],
};
