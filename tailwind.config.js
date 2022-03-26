module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
        extend: {
          colors: {
            'primary':'#5B0A91'
          },
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
      backgroundImage: {
        'bone-frame':
          "url('../public/images/character_build/background/background_1.png')",
        'main-char-left': "url('../public/images/home_char_left.png')",
        'main-char-right': "url('../public/images/home_char_right.png')",
        'bone-button': "url('../public/images/button.png')",
        'bg-footer': "url('../public/images/bg-footer.svg')",
        'bg-courses': "url('../public/images/bg-courses.png')",
        'bg-navbar': "url('../public/images/bg-navbar.svg')",
      },
    },
  },
  plugins: [require('daisyui')],
}
