import { createTheme } from '@material-ui/core/styles';

const theme = createTheme({
  palette: {
    type: 'dark',
    primary: {
      main: '#424242',
      contrastText: '#FFFFFF',
    },
    secondary: {
      main: '#f50057',
      contrastText: '#FFFFFF',
    },
    background: {
      default: '#121212',
    },
  },
});

export default theme;
