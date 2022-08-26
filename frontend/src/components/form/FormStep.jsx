import { useFormikContext } from 'formik';
import PropTypes from 'prop-types';
import React from 'react';

/**
 * Intended to be used as a child of a MultiStepForm component.
 * Its children can be nodes or a function.
 * If children is a function, the formik context will be passed as arguments.
 */
export default function FormStep({ children }) {
  if (typeof children === 'function') {
    return <>{children({ ...useFormikContext() })}</>;
  }

  return <>{children}</>;
}

FormStep.propTypes = {
  children: PropTypes.oneOfType([PropTypes.node, PropTypes.func]).isRequired,
};
