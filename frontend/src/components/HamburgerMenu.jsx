import IconButton from '@mui/material/IconButton';
import Menu from '@mui/material/Menu';
import MenuItem from '@mui/material/MenuItem';
import { makeStyles } from '@mui/styles';
import MenuIcon from '@mui/icons-material/Menu';
import React, { useState } from 'react';
import { Link } from 'react-router-dom';

import { logout, userIsAdmin } from '../services/AuthService';

const useStyles = makeStyles({
  adminLink: {
    color: 'inherit',
    textDecoration: 'none',
  },
});

export default function HamburgerMenu() {
  const classes = useStyles();

  const [anchorEl, setAnchorEl] = useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    setAnchorEl(null);
  };

  const logoutAndCloseMenu = () => {
    logout();
    handleClose();
  };

  const adminSiteUrl = process.env.NODE_ENV === 'production' ? '/admin' : 'http://localhost:8000/admin';

  return (
    <div data-testid="hamburger-wrapper">
      <IconButton onClick={handleClick}>
        <MenuIcon />
      </IconButton>
      <Menu
        anchorEl={anchorEl}
        keepMounted
        open={Boolean(anchorEl)}
        onClose={handleClose}
      >
        <MenuItem component={Link} to="/">
          Home
        </MenuItem>
        {userIsAdmin() ? (
          <MenuItem>
            <a href={adminSiteUrl} className={classes.adminLink}>
              Admin Site
            </a>
          </MenuItem>
        ) : null}
        <MenuItem component={Link} to="/feedback">
          Give Feedback
        </MenuItem>
        <MenuItem component={Link} to="/login" onClick={logoutAndCloseMenu}>
          Logout
        </MenuItem>
      </Menu>
    </div>
  );
}
