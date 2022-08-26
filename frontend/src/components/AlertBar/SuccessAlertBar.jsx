import Zoom from '@mui/material/Zoom';
import Alert from '@mui/lab/Alert';
import PropTypes from 'prop-types';
import React from 'react';

export default function SuccessAlertBar({ message }) {
  return (
    <Zoom in>
      <Alert data-testid="success-alertbar" variant="filled" severity="success">{message}</Alert>
    </Zoom>
  );
}

SuccessAlertBar.propTypes = {
  message: PropTypes.string.isRequired,
};
