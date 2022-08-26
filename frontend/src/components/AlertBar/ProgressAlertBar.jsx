import CircularProgress from '@mui/material/CircularProgress';
import Zoom from '@mui/material/Zoom';
import Alert from '@mui/lab/Alert';
import PropTypes from 'prop-types';
import React from 'react';

export default function ProgressAlertBar({ message }) {
  return (
    <Zoom in>
      <Alert data-testid="progress-alertbar" variant="filled" severity="info" icon={<CircularProgress size={20} color="secondary" />}>
        {message}
      </Alert>
    </Zoom>
  );
}

ProgressAlertBar.propTypes = {
  message: PropTypes.string.isRequired,
};
