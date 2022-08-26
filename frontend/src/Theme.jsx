import { createMuiTheme } from '@material-ui/core/styles';

const base = {
  palette: {
    primary: {
      main: '#006CA2',
    },
    secondary: {
      main: '#FFFFFF',
    },
    error: {
      main: '#FF0000',
      dark: '#D32F2F',
    },
  },
};

const overrides = {
  overrides: {
    MuiAlert: {
      filledInfo: {
        backgroundColor: base.palette.primary.main,
      },
    },
    MUIDataTableBodyCell: {
      root: {
        verticalAlign: 'top',
      },
    },
  },
};

const theme = createMuiTheme(base, overrides);

export default theme;
