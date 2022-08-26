import AppBar from '@mui/material/AppBar';
import Grid from '@mui/material/Grid';
import { makeStyles } from '@mui/styles';
import Toolbar from '@mui/material/Toolbar';
import Typography from '@mui/material/Typography';
import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

import logo from '../images/logo.ico';
import { isLoggedIn } from '../services/AuthService';
import DarkModeToggle from './DarkModeToggle';
import HamburgerMenu from './HamburgerMenu';

const useStyles = makeStyles((theme) => ({
  icon: {
    marginRight: 10,
  },
  titleLink: {
    display: 'flex',
    alignItems: 'center',
    textDecoration: 'none',
    color: theme.palette.secondary.contrastText,
    flex: 1,
  },
  leftFlexBox: {
    display: 'flex',
  },
}));

export default function NavBar({ handleThemeChange }) {
  const classes = useStyles();

  return (
    <AppBar position="static" color="secondary">
      <Toolbar data-testid="navbar-toolbar" className={classes.container}>
        <Grid
          justifyContent="space-between" // Add it here :)
          container
          spacing={0}
        >
          <Grid item className={classes.leftFlexBox}>
            {isLoggedIn() ? <HamburgerMenu /> : null}
            <Link className={classes.titleLink} to="/">
              <img
                className={classes.icon}
                src={logo}
                alt="logo"
                height="30"
                width="30"
              />
              <Typography variant="h6">Django React Boilerplate</Typography>
            </Link>
          </Grid>
          <DarkModeToggle handleThemeChange={handleThemeChange} />
        </Grid>
      </Toolbar>
    </AppBar>
  );
}

NavBar.propTypes = {
  handleThemeChange: PropTypes.func.isRequired,
};
