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
      screens: {
        '3xl': '1792px',
        '5xl': '2304px',
        '7xl': '2816px',
        '8xl': '3072px',
      },
      keyframes: {
        fromTop: {
          '0%': {
            opacity: 0,
            transform: 'translateY(-150px) ',
          },
          '100%': {
            opacity: 1,
            transform: 'translateY(0) ',
          },
        },

        withClipPath: {
          '0%': {
            clipPath: 'circle(3.5% at 100% 0)',
          },
          '100%': {
            clipPath: 'circle(141.4% at 100% 0)',
          },
        },
        withOpacity: {
          '0%': {
            opacity: 0,
          },
          '100%': {
            opacity: 1,
          },
        },
        rotate: {
          '0%': {
            opacity: 0,
            transform: 'rotate(90deg)',
          },
          '100%': {
            opacity: 1,
            transform: 'rotate(0)',
          },
        },
      },
      animation: {
        fromTop: 'fromTop 1.2s ease',
        withClipPath: 'withClipPath 0.7s ease-in',
        withOpacity: 'withOpacity 1.2s ease-in',
        rotate: 'rotate 0.5s ease-in-out 1s',
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
