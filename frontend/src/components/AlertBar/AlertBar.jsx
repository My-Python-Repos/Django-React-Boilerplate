import Alert from '@mui/lab/Alert';
import PropTypes from 'prop-types';
import React from 'react';

import FailureAlertBar from './FailureAlertBar';
import ProgressAlertBar from './ProgressAlertBar';
import SuccessAlertBar from './SuccessAlertBar';

export const AlertState = Object.freeze({
  OFF: 'OFF',
  PROGRESS: 'PROGRESS',
  SUCCESS: 'SUCCESS',
  FAILURE: 'FAILURE',
});

export default function AlertBar({
  state, progress, success, failure, message, hidden,
}) {
  if (state === AlertState.OFF && hidden) {
    return <Alert style={{ visibility: 'hidden' }} />;
  }

  if (state === AlertState.PROGRESS) {
    return (
      <ProgressAlertBar message={message || progress} />
    );
  }
  if (state === AlertState.SUCCESS) {
    return (
      <SuccessAlertBar message={message || success} />
    );
  }
  if (state === AlertState.FAILURE) {
    return (
      <FailureAlertBar message={message || failure} />
    );
  }

  return null;
}

AlertBar.propTypes = {
  state: PropTypes.oneOf(Object.keys(AlertState)),
  progress: PropTypes.string,
  success: PropTypes.string,
  failure: PropTypes.string,
  message: PropTypes.string,
  hidden: PropTypes.bool,
};

AlertBar.defaultProps = {
  state: AlertState.OFF,
  progress: 'Submitting..',
  success: 'Submission Sucessful',
  failure: 'Submission Failed',
  message: '',
  hidden: false,
};
