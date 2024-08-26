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
          450: '#777786',
          500: '#626478',
          600: '#545566',
          700: '#454556',
          800: '#38384A',
          850: '#232323',
          900: '#21212E',
          950: '#1A1A25',
          1000: '#11111A',
        },
        'green': {
          100: '#CCFFE9',
          200: '#99FFD3',
          300: '#66FFBC',
          400: '#33FFA6',
          500: '#00FF90',
          600: '#00CC73',
          700: '#009956',
          800: '#00663A',
          900: '#00331D',
        },
        'white-50': '#ffffff80',
        'yellow': 'var(--yellow)',
        'body': '#9D9FAF',
        'title': '#F4F5F7',
      },
      backgroundImage: {
        'gradient': 'linear-gradient(to right, #00FF90, #F4FD36)',
        'navbar': 'linear-gradient(to top, rgba(0, 51, 29, 0), rgba(0, 51, 29, 1))'
      },
      fontFamily: {
        'airnt': "var(--ff-airnt)",
        'geist': "var(--font-geist-mono)",
        'mona': "var(--ff-mona)",
      },
      boxShadow: {
        'inner-primary': 'inset 0 0 8px 1px rgba(26, 247, 168, 0.25)',
        'inner-base': 'inset 0 0 8px 1px rgba(255, 255, 255, 0.15)',
        'point': '0 0 12px rgba(0, 255, 144, 0.45)'
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
