import type { Config } from "tailwindcss";
import {nextui} from "@nextui-org/react";

const colors = require('tailwindcss/colors')

const config = {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/**/*.{js,ts,jsx,tsx,mdx}",
    "./node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}"
  ],
  theme: {
    screens: {
      '2xs': '375px',
      'xs': '425px',
      'sm': '576px',
      'md': '768px',
      'lg': '992px',
      'xl': '1200px',
      '2xl': '1440px',
    },
    extend: {
      colors: {
        ...colors,
        'primary': 'var(--primary)',
        'purple': 'var(--purple)',
        'gray': {
          100: '#F4F5F7',
          200: '#E4E5E9',
          300: '#CCCDD5',
          400: '#9D9FAF',
          500: '#626478',
          600: '#545566',
          700: '#454556',
          800: '#38384A',
          900: '#21212E',
          1000: '#11111A',
        },
        'white-50': '#ffffff80'
      },
      fontFamily: {
        'airnt': "var(--ff-airnt)",
        'geist': "var(--font-geist-mono)",
        'mona': "var(--ff-mona)",
      },
      boxShadow: {
        'inner-primary': 'inset 0 0 8px 1px rgba(26, 247, 168, 0.25)',
        'inner-base': 'inset 0 0 8px 1px rgba(255, 255, 255, 0.15)'
      }
    },
  },
  darkMode: 'selector',
  plugins: [
    nextui({
      layout: {
        // radius: {
        //   small: '2px',
        //   medium: '4px',
        //   large: '6px',
        // }
      }
    }),
  ],
};
export default config;
