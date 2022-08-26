import Zoom from '@mui/material/Zoom';
import Alert from '@mui/lab/Alert';
import PropTypes from 'prop-types';
import React from 'react';

export default function FailureAlertBar({ message }) {
  return (
    <Zoom in>
      <Alert data-testid="failure-alertbar" variant="filled" severity="error">{message}</Alert>
    </Zoom>
  );
}

FailureAlertBar.propTypes = {
  message: PropTypes.string.isRequired,
};
