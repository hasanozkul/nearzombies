module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {
    extend: {
      colors: {
        primary: '#5B0A91',
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
  daisyui: {
    themes: [
      {
        mytheme: {
          primary: '#5B0A91',
          secondary: '#D926A9',
          accent: '#1FB2A6',
          neutral: '#191D24',
          'base-100': '#d1d5db',
          info: '#3ABFF8',
          success: '#36D399',
          warning: '#FBBD23',
          error: '#F87272',
        },
      },
    ],
  },
  plugins: [require('daisyui')],
}
