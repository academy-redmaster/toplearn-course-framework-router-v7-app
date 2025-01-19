import { heroui } from "@heroui/react";

export default {
  content: [
    "./app/**/{**,.client,.server}/**/*.{js,jsx,ts,tsx}",
    "./node_modules/@heroui/theme/dist/**/*.{js,ts,jsx,tsx}",
  ],
  theme: {
    extend: {
      fontFamily: {
        exo2: ["Exo 2", "sans-serif"],
        pmarker: ["Permanent Marker", "sans-serif"],
      },
    },
  },
  darkMode: "class",
  plugins: [heroui()],
};
