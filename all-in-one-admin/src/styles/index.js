import { createGlobalStyle } from 'styled-components'
import { normalize } from 'styled-normalize'

export { color } from './_color'
export { media } from './_mediaQuery'
export { size } from './_size'
export const GlobalStyle = createGlobalStyle`
    ${normalize}
    // You can continue writing global styles here
    body {
      margin: 0;
      font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
        'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
        sans-serif;
      -webkit-font-smoothing: antialiased;
      -moz-osx-font-smoothing: grayscale;
    }

    html {
      scroll-behavior: smooth;
      background-color: #f0f0f0;
    }

    a {
      color: inherit; /* blue colors for links too */
      text-decoration: inherit; /* no underline */
    }

    h2 {
      margin: 0;
    }
`