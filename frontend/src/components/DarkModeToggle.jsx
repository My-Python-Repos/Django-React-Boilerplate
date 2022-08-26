import { blue, orange } from '@mui/material/colors';
import { makeStyles } from '@mui/styles';
import Switch from '@mui/material/Switch';
import NightsStayIcon from '@mui/icons-material/NightsStay';
import WbSunnyIcon from '@mui/icons-material/WbSunny';
import PropTypes from 'prop-types';
import React, { useState } from 'react';

const useStyles = makeStyles(() => ({
  track: {
    // unchecked background track
    opacity: 1,
    backgroundColor: blue[500],
  },
  uncheckedThumb: {
    borderRadius: '50%',
    transform: 'translateY(-7px) translateX(-5px)',
    fontSize: '35px',
    color: orange[500],
  },
  switchBase: {
    '&.Mui-checked + .MuiSwitch-track': {
      // checked background track
      opacity: 0.9,
      backgroundColor: 'white',
    },
  },
  checkedThumb: {
    borderRadius: '50%',
    transform: 'translateY(-2px)',
    backgroundColor: 'white',
  },
  switch: {
    top: 5,
  },
}));

export default function DarkModeToggle({ handleThemeChange }) {
  const classes = useStyles();
  const [toggle, setToggle] = useState(localStorage.getItem('darkModeToggle') !== null && localStorage.getItem('darkModeToggle') !== 'true');

  const handleChange = () => {
    setToggle(!toggle);
    localStorage.setItem('darkModeToggle', JSON.stringify(toggle));
  };

  return (
    <Switch
      className={classes.switch}
      disableRipple
      defaultChecked={toggle}
      icon={<WbSunnyIcon className={classes.uncheckedThumb} />}
      checkedIcon={<NightsStayIcon className={classes.checkedThumb} />}
      classes={{
        switchBase: classes.switchBase,
        track: classes.track,
      }}
      onChange={() => {
        handleChange();
        handleThemeChange();
      }}
    />
  );
}

DarkModeToggle.propTypes = {
  handleThemeChange: PropTypes.func.isRequired,
};
