import type { Config } from 'tailwindcss'
import { nextui } from '@nextui-org/react'

const colors = require('tailwindcss/colors')

const config = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx,mdx}',
    './components/**/*.{js,ts,jsx,tsx,mdx}',
    './app/**/*.{js,ts,jsx,tsx,mdx}',
    './src/**/*.{js,ts,jsx,tsx,mdx}',
    './node_modules/@nextui-org/theme/dist/**/*.{js,ts,jsx,tsx}'
  ],
  theme: {
    screens: {
      xs: '375px',
      '2xs': '425px',
      '3xs': '480px',
      sm: '576px',
      md: '768px',
      lg: '992px',
      xl: '1200px',
      '2xl': '1440px',
      height: {
        raw: '(max-height: 649px)'
      }
    },
    extend: {
      colors: {
        ...colors,
        primary: 'var(--primary)',
        purple: 'var(--purple)',
        gray: {
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
          1000: '#11111A'
        },
        green: {
          100: '#CCFFE9',
          200: '#99FFD3',
          300: '#66FFBC',
          400: '#33FFA6',
          500: '#00FF90',
          600: '#00CC73',
          700: '#009956',
          800: '#00663A',
          900: '#00331D'
        },
        yellow: {
          100: '#FDFFD7',
          200: '#FBFEAF',
          300: '#F8FE86',
          400: '#F6FD5E',
          500: '#F4FD36',
          600: '#C3CA2B',
          700: '#929820',
          800: '#626516',
          900: '#31330B'
        },
        'white-50': '#ffffff80',
        success: '#00FF90',
        error: '#E53935',
        info: '#3598db',
        warning: '#f39c11',
        'error-blur': '#E44A47',
        inactive: '#666666',
        body: '#9D9FAF',
        title: '#F4F5F7'
      },
      backgroundImage: {
        gradient: 'linear-gradient(to right, #00FF90, #F4FD36)',
        'gradient-reverse': 'linear-gradient(to left, #00FF90, #F4FD36)',
        'gradient-error': 'linear-gradient(to right, #E35D5B, #E53935)',
        'gradient-green': 'linear-gradient(315deg, #000 21%, #00331D 50%, #000 80%)',
        'gradient-yellow': 'linear-gradient(315deg, #000 22%, #31330B 50%, #000 73%)',
        navbar: 'linear-gradient(to top, rgba(0, 51, 29, 0), rgba(0, 51, 29, 1))',
        'item-accordion': 'linear-gradient(to right, #023C22, #022C19)',
        'item-default': 'linear-gradient(to right, rgba(0, 255, 144, 0.5), rgba(0, 255, 144, 0.1))',
        'item-blue': 'linear-gradient(to right, #0C344B, #0F171B)',
        'item-green': 'linear-gradient(to right, #0D3F29, #0F1814)',
        'item-orange': 'linear-gradient(to right, #4B350C, #1B170F)',
        'item-purple': 'linear-gradient(to right, #3A1A4B, #18111B)',
        'item-yellow':
          'linear-gradient(to right, rgba(244, 253, 54, 0.5), rgba(244, 253, 54, 0.1))',
        'skill-01': 'linear-gradient(to right, rgba(0, 76, 205, 1), rgba(0, 76, 205, 0.1))',
        'skill-02': 'linear-gradient(to right, rgba(0, 255, 144, 0.5), rgba(0, 255, 144, 0.1))',
        'skill-03': 'linear-gradient(to right, rgba(228, 140, 0, 1), rgba(228, 140, 0, 0.1))',
        'skill-04': 'linear-gradient(to right, rgba(152, 57, 255, 1), rgba(152, 57, 255, 0.1))',
        'skill-05': 'linear-gradient(to right, rgba(0, 215, 231, 1), rgba(0, 215, 231, 0.1))'
      },
      fontFamily: {
        airnt: 'var(--ff-airnt)',
        geist: 'var(--font-geist-mono)',
        mona: 'var(--ff-mona)'
      },
      boxShadow: {
        'inner-primary': 'inset 0 0 8px 1px rgba(26, 247, 168, 0.25)',
        'inner-base': 'inset 0 0 8px 1px rgba(255, 255, 255, 0.15)',
        point: '0 0 12px rgba(0, 255, 144, 0.45)'
      },
      dropShadow: {
        green: '0 0 16px rgba(0, 153, 86, 0.5)',
        blue: '0 0 16px rgba(0, 163, 255, 0.3)',
        purple: '0 0 16px rgba(186, 58, 255, 0.3)',
        orange: '0 0 16px rgba(255, 168, 0, 0.3)',
        yellow: '0 0 16px rgba(146, 152, 32, 0.5)'
      }
    }
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
    })
  ]
}
export default config
