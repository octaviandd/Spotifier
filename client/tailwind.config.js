/** @format */

module.exports = {
  mode: "jit",
  purge: {
    enabled: true,
    content: ["./src/**/*.{js,ts,jsx,tsx}"],
  },
  darkMode: false,
  theme: {
    fontFamily: {
      custom: ["Roboto", "sans-serif"],
    },
    borderColor: (theme) => ({
      ...theme("colors"),
      spotify: "#1DB954",
    }),
    backgroundColor: (theme) => ({
      ...theme("colors"),
      primary: "#9effc8",
      soundwave: "#12E2DC",
      spotify: "#1DB954",
    }),
    extend: {
      colors: {
        "background-opacity": "rgba(0, 0, 0, 0.7)",
      },
      textColor: {
        spotify: "#1DB954",
      },
      skew: {
        45: "45deg",
        50: "-45deg",
      },
      keyframes: {
        loud: {
          "25%": {
            transform: "scaleY(1)",
          },
          "50%": {
            transform: "scaleY(0.4)",
          },
          "75%": {
            transform: "scaleY(1.2)",
          },
        },
        slow: {
          "25%": {
            transform: "scaleY(1)",
          },
          "50%": {
            transform: "scaleY(0.4)",
          },
          "75%": {
            transform: "scaleY(0.6)",
          },
        },
        quiet: {
          "25%": {
            transform: "scaleY(0.6)",
          },
          "50%": {
            transform: "scaleY(0.4)",
          },
          "75%": {
            transform: "scaleY(0.8)",
          },
        },
      },
      animation: {
        "bounce-loud": "loud 1.2s ease-in-out infinite",
        "bounce-slow": "slow 1.2s ease-in-out infinite",
        "bounce-quiet": "quiet 1.2s ease-in-out infinite",
      },
    },
  },
  variants: { extend: {} },
  plugins: [],
};
