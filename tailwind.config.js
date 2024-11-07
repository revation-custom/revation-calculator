/** @type {import('tailwindcss').Config} */
const px0_50 = { ...Array.from(Array(51)).map((_, i) => `${i}px`) };
const px0_100 = { ...Array.from(Array(101)).map((_, i) => `${i}px`) };
const px0_200 = { ...Array.from(Array(201)).map((_, i) => `${i}px`) };
const px0_400 = { ...Array.from(Array(401)).map((_, i) => `${i}px`) };

export default {
  content: ['./index.html', './src/**/*.{js,jsx,ts,tsx}'],
  theme: {
    extend: {
      boxShadow: {
        duplicationBox: '16px 16px 30px 0px rgba(0, 0, 0, 0.06)',
      },
      keyframes: {
        pulse: {
          '0%': {
            transform: 'scale(0.95)',
          },
          '70%': {
            transform: 'scale(1)',
            boxShadow: '0 0 0 10px rgba(0, 0, 0, 0)',
          },
          '100%': {
            transform: 'scale(0.95)',
            boxShadow: '0 0 0 0 rgba(0, 0, 0, 0)',
          },
        },
        bottomToTop: {
          '0%': {
            transform: 'scale(0.95)',
          },
          '70%': {
            transform: 'scale(1)',
            boxShadow: '0 0 0 10px rgba(0, 0, 0, 0)',
          },
          '100%': {
            transform: 'scale(0.95)',
            boxShadow: '0 0 0 0 rgba(0, 0, 0, 0)',
          },
        },
      },
      animation: {
        pulseAnimation: 'pulse 2s infinite',
      },
      fontFamily: {
        pretendard: ['pretendard'],
        geologica: ['geologica'],
      },
      screens: {
        lg: '1600px',
        md: '1200px',
        sm: '674px',
        xs: '320px',
      },
      ringWidth: {
        '1/2': '0.5px',
      },
      fontSize: px0_100,
      padding: px0_100,
      width: px0_400,
      height: px0_400,
      colors: {
        tooltip: '#222222',
        font: '#040000',
        solid: '#888888',
        bg: {
          50: '#F3F0ED',
          100: '#E1D8CF',
          200: '#CABEB0',
          300: '#B5A591',
          400: '#A18D73',
          500: '#86735A',
          600: '#685946',
          700: '#493F31',
          800: '#2B251D',
          900: '#0C0A08',
        },
        gray: {
          50: '#EFEFF0',
          100: '#D6D6D7',
          200: '#BCBCBE',
          300: '#A2A2A5',
          400: '#88888C',
          500: '#6E6E72',
          600: '#555558',
          700: '#3D3D3F',
          800: '#232324',
          900: '#0A0A0A',
        },
        primary: {
          50: '#E6EAE7',
          100: '#CAD4CD',
          200: '#ADBDB2',
          300: '#91A698',
          400: '#758F7D',
          500: '#5E7365',
          600: '#46564B',
          700: '#303B33',
          800: '#191F1B',
          900: '#020302',
        },
      },
    },
  },
  plugins: [
    function ({ addUtilities }) {
      const newFontUtilities = {
        '.heading-lg': {
          fontFamily: 'pretendard',
          fontSize: '3.75rem',
          fontWeight: '800',
        },
        '.heading-md': {
          fontFamily: 'pretendard',
          fontSize: '3rem',
          fontWeight: '800',
        },
        '.heading-sm': {
          fontFamily: 'pretendard',
          fontSize: '2.375rem',
          fontWeight: '800',
        },
        '.heading-xs': {
          fontFamily: 'pretendard',
          fontSize: '1.75rem',
          fontWeight: '800',
        },
        '.title-xl': {
          fontFamily: 'pretendard',
          fontSize: '1.75rem',
          fontWeight: '600',
        },
        '.title-lg': {
          fontFamily: 'pretendard',
          fontSize: '1.5rem',
          fontWeight: '600',
        },
        '.title-md-b': {
          fontFamily: 'pretendard',
          fontSize: '1.375rem',
          fontWeight: '700',
        },
        '.title-xs-sb': {
          fontFamily: 'pretendard',
          fontSize: '1rem',
          fontWeight: '600',
        },
        '.title-md': {
          fontFamily: 'pretendard',
          fontSize: '1.375rem',
          fontWeight: '600',
        },
        '.title-sm': {
          fontFamily: 'pretendard',
          fontSize: '1.0625rem',
          fontWeight: '700',
        },
        '.title-xs': {
          fontFamily: 'pretendard',
          fontSize: '1rem',
          fontWeight: '400',
        },
        '.body-lg': {
          fontFamily: 'pretendard',
          fontSize: '1rem',
          fontWeight: '600',
        },
        '.body-sm': {
          fontFamily: 'pretendard',
          fontSize: '1rem',
          fontWeight: '600',
        },
        '.body-xs': {
          fontFamily: 'pretendard',
          fontSize: '0.875rem',
          fontWeight: '600',
        },
        '.body-2xs': {
          fontFamily: 'pretendard',
          fontSize: '0.8125rem',
          fontWeight: '400',
        },
        '.body-2xs-sb': {
          fontFamily: 'pretendard',
          fontSize: '0.8125rem',
          fontWeight: '600',
        },
        '.body-3xs': {
          fontFamily: 'pretendard',
          fontSize: '0.75rem',
          fontWeight: '400',
        },
        '.input': {
          fontFamily: 'pretendard',
          fontSize: '1.0125rem',
          fontWeight: '400',
        },
        '.tooltip': {
          fontFamily: 'pretendard',
          fontSize: '0.8125rem',
          fontWeight: '400',
        },
        '.button-but1': {
          fontFamily: 'pretendard',
          fontSize: '1.25rem',
          fontWeight: '600',
        },
        '.button-but2': {
          fontFamily: 'pretendard',
          fontSize: '1rem',
          fontWeight: '600',
        },
        '.en-body-sm': {
          fontFamily: 'geologica',
          fontSize: '1rem',
          fontWeight: '500',
        },
        '.en-body-2sm': {
          fontFamily: 'geologica',
          fontSize: '0.875rem',
          fontWeight: '500',
        },
        '.en-body-2xs': {
          fontFamily: 'geologica',
          fontSize: '0.8125rem',
          fontWeight: '500',
        },
        '.body-md-sb': {
          fontFamily: 'pretendard',
          fontSize: '1.125rem',
          fontWeight: '600',
        },
        '.caption-md': {
          fontFamily: 'geologica',
          fontSize: '1.25rem',
          fontWeight: '500',
        },
        '.error': {
          fontFamily: 'pretendard',
          fontSize: '0.8125rem',
          fontWeight: '400',
        },
        '.table-md': {
          fontFamily: 'pretendard',
          fontSize: '0.875rem',
          fontWeight: '600',
        },
      };
      const headerHeight = 72;

      const RadialBarHeight = [593, 936, 1070];

      const heightUtilities = RadialBarHeight.reduce((acc, height) => {
        acc[`.h-calc-${height}`] = {
          height: `calc(${height}px - ${headerHeight}px)`,
        };
        return acc;
      }, {});

      addUtilities({ ...newFontUtilities, ...heightUtilities });
    },
  ],
};
