const colors = require('tailwindcss/colors');

module.exports = {
  important: true,
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    colors: {
      ...colors,
      app: {
        bg: '#FFFEFE',
        text1: '#36352E',
        text2: '#9A9A96',
        brown1: '#E9D4CC',
        brown2: '#C8B9B1',
        brownText: '#64473A',
        orange1: '#FDDFCC',
        orange2: '#FFD1A1',
        orangeText: '#D9730D',
        yellow1: '#FBEECC',
        yellow2: '#FEEDA5',
        yellowText: '#DFAB01',
        green1: '#CCE6E0',
        green2: '#A7D5CD',
        greenText: '#0F7B6C',
        blue1: '#CDE4F8',
        blue2: '#A9CDE5',
        blueText: '#0B6E99',
        purple1: '#E1D2F9',
        purple2: '#CDB7EB',
        purpleText: '#6940A5',
        pink1: '#F9CDE6',
        pink2: '#F1ABD0',
        pinkText: '#AD1A72',
        red1: '#FFCCD1',
        red2: '#FFB8B5',
        redText: '#E03E3E',
      },
    },
  },
  plugins: [],
};
