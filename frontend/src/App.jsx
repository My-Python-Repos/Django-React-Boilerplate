import { CssBaseline } from '@mui/material';

import { createTheme, ThemeProvider } from '@mui/material/styles';

import React, { useState } from 'react';
import {
  BrowserRouter,
  Navigate,
  Route,
  Routes,
} from 'react-router-dom';

import NavBar from './components/NavBar';
import FeedbackPage from './components/pages/FeedbackPage';
import LoginPage from './components/pages/LoginPage/LoginPage';
import NotFoundPage from './components/pages/NotFoundPage';
import SummaryPage from './components/pages/SummaryPage';
import PrivateRoute from './components/PrivateRoute';

function App() {
  const [darkState, setDarkState] = useState(localStorage.getItem('darkModeToggle') !== null && localStorage.getItem('darkModeToggle') !== 'true');

  const darkTheme = {
    palette: {
      mode: 'dark',
      primary: {
        main: '#2979ff',
      },
      secondary: {
        main: '#424242',
      },
      background: {
        default: '#303030',
        paper: '#303030',
      },
      error: {
        main: '#FF0000',
        dark: '#D32F2F',
      },
    },
  }

  const lightTheme = {
    palette: {
      mode: 'light',
      primary: {
        main: '#3f51b5',
      },
      secondary: {
        main: '#FFFFFF',
      },
      background: {
        default: '#fafafa',
      },
      error: {
        main: '#FF0000',
        dark: '#D32F2F',
      },
    },
  };

  const base = darkState ? darkTheme : lightTheme;
  
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

  const theme = createTheme(base, overrides);

  const handleThemeChange = () => {
    setDarkState(!darkState);
  };

  return (
    <ThemeProvider theme={theme}>
      <CssBaseline />
        <BrowserRouter>
          <NavBar handleThemeChange={handleThemeChange} />
          <Routes>
            <Route
              exact
              path="/login"
              element={
                <LoginPage />
              }
            />
            <Route
              exact
              path="/"
              element={
                <PrivateRoute>
                  <Navigate to="/summary" />
                </PrivateRoute>
              }
            />
            <Route
              exact
              path="/summary"
              element={
                <PrivateRoute>
                  <SummaryPage />
                </PrivateRoute>
              }
            />
            <Route
              exact
              path="/feedback/"
              element={
                <PrivateRoute>
                  <FeedbackPage />
                </PrivateRoute>
              }
            />
            <Route
              element={
                <NotFoundPage />
              }
            />
          </Routes>
        </BrowserRouter>
    </ThemeProvider>
  );
}

export default App;
