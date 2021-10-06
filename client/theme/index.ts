import { createTheme, responsiveFontSizes } from '@mui/material/styles'
import darkScrollbar from '@mui/material/darkScrollbar'

let theme = createTheme({
  components: {
    MuiCssBaseline: {
      styleOverrides: {
        body: darkScrollbar(),
      },
    },
  },
  palette: {
    mode: 'dark',
    background: {
      default: '#001E3C',
      paper: '#0A1929',
    },
    common: {
      black: '#1D1D1D',
      white: '#FFF',
    },
    primary: {
      main: '#3399FF',
    },
    secondary: {
      main: '#CE93D8',
    },
  },
})

theme = responsiveFontSizes(theme, {
  breakpoints: ['xs', 'sm', 'md', 'lg', 'xl'],
})

export default theme