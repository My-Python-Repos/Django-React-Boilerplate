import Popover from '@mui/material/Popover';
import { makeStyles } from '@mui/material/styles';
import Typography from '@mui/material/Typography';
import HelpIcon from '@material-ui/icons/Help';
import PopupState, { bindHover, bindPopover } from 'material-ui-popup-state';
import PropTypes from 'prop-types';
import React from 'react';

const useStyles = makeStyles({
  helpIcon: {
    fontSize: 20,
    margin: 5,
  },
  popover: {
    pointerEvents: 'none',
  },
  paper: {
    padding: 5,
  },
});

export default function HelpIconPopover({ text }) {
  const classes = useStyles();

  return (
    <PopupState variant="popover">
      {(popupState) => (
        <>
          <HelpIcon
            {...bindHover(popupState)}
            className={classes.helpIcon}
          />
          <Popover
            {...bindPopover(popupState)}
            className={classes.popover}
            classes={{
              paper: classes.paper,
            }}
            anchorOrigin={{
              vertical: 'bottom',
              horizontal: 'center',
            }}
            transformOrigin={{
              vertical: 'top',
              horizontal: 'center',
            }}
            disableRestoreFocus
          >
            <Typography>{text}</Typography>
          </Popover>
        </>
      )}
    </PopupState>
  );
}

HelpIconPopover.propTypes = {
  text: PropTypes.string.isRequired,
};
