const {
  colors: { teal, orange, pink, ...colors }
} = require('tailwindcss/defaultTheme');

module.exports = {
  theme: {
    screens: {
      sm: { min: '360px' },
      md: { min: '768px' },
      lg: { min: '992px' },
      xl: { min: '1200px' }
    },
    textColor: {
      ...colors,
      primary: '#3dbfb7',
      secondary: '#313131',
      danger: '#fc4949',
      white: '#ffffff'
    },
    backgroundColor: theme => ({
      ...theme('colors'),
      primary: '#3dbfb7',
      secondary: '#313131',
      danger: '#fc4949'
    })
  },
  variants: {},
  plugins: []
};
