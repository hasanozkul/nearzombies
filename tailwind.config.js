module.exports = {
  content: [
    './pages/**/*.{js,ts,jsx,tsx}',
    './components/**/*.{js,ts,jsx,tsx}',
  ],
  theme: {

    extend: {
      fontFamily: {
        sans: ['Poppins', 'sans-serif'],
      },
      backgroundImage: {
        'bone-frame': "url('../public/frame.png')",
        'main-char-left': "url('../public/main_char_left.png')",
        'main-char-right': "url('../public/main_char_right.png')",
        'bone-button': "url('../public/button.png')",
        'bg-footer': "url('../public/bg-footer.svg')",
        'bg-courses': "url('../public/bg-courses.png')",
        'bg-navbar': "url('../public/bg-navbar.svg')",
      }
    },    
  },
  plugins: [

  ],
}
