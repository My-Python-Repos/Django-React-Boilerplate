import Button from '@mui/material/Button';
import Grid from '@mui/material/Grid';
import Step from '@mui/material/Step';
import StepLabel from '@mui/material/StepLabel';
import Stepper from '@mui/material/Stepper';
import { makeStyles } from '@mui/styles';
import Typography from '@mui/material/Typography';
import {
  Form, Formik,
} from 'formik';
import PropTypes from 'prop-types';
import React, { useState } from 'react';

const useStyles = makeStyles({
  buttonContainer: {
    display: 'flex',
    justifyContent: 'flex-end',
  },
  button: {
    marginLeft: 10,
  },
});

// MultiStepForm is a single Formik instance whose children are each page of the
// multi-step form. The form is submitted on each forward transition (can only
// progress with valid input), whereas a backwards step is allowed with
// incomplete data. A snapshot of form state is used as initialValues after each
// transition. Each page has an optional submit handler, and the top-level
// submit is called when the final page is submitted.

export default function MultiStepForm({
  title, children, initialValues, onSubmit, stepLabels,
}) {
  const classes = useStyles();

  const [stepNumber, setStepNumber] = useState(0);
  const steps = React.Children.toArray(children);
  const [snapshot, setSnapshot] = useState(initialValues);

  const step = steps[stepNumber];
  const totalSteps = steps.length;
  const isLastStep = stepNumber === totalSteps - 1;

  const next = (values) => {
    setSnapshot(values);
    setStepNumber(Math.min(stepNumber + 1, totalSteps - 1));
  };

  const previous = (values) => {
    setSnapshot(values);
    setStepNumber(Math.max(stepNumber - 1, 0));
  };

  // ? There might be a better way to do this without ignoring consistent-return
  // eslint-disable-next-line consistent-return
  const handleSubmit = async (values, bag) => {
    let shouldProceed = true;
    if (step.props.onSubmit) {
      shouldProceed = await step.props.onSubmit(values, bag);
    }
    if (shouldProceed !== false) {
      if (isLastStep) {
        return onSubmit(values, bag);
      }
      bag.setTouched({});
      next(values);
    }
  };

  return (
    <Formik
      initialValues={snapshot}
      onSubmit={handleSubmit}
      validationSchema={step.props.validationSchema}
    >
      {(formik) => (
        <Form>
          <Grid container spacing={2}>
            <Grid item xs={12}>
              <Typography component="h1" variant="h4" align="center">
                {title}
              </Typography>
            </Grid>
            <Grid item xs={12}>
              <Stepper activeStep={stepNumber}>
                {stepLabels.map((label) => (
                  <Step key={label}>
                    <StepLabel>{label}</StepLabel>
                  </Step>
                ))}
              </Stepper>
            </Grid>
          </Grid>
          {step}
          <div className={classes.buttonContainer}>
            {stepNumber > 0 && (
              <Button data-testid="multistep-back-button" onClick={() => previous(formik.values)} disabled={formik.isSubmitting} type="button" variant="contained" className={classes.button}>
                Back
              </Button>
            )}
            <div>
              <Button data-testid="multistep-next-button" disabled={formik.isSubmitting} type="submit" color="primary" variant="contained" className={classes.button}>
                {isLastStep ? 'Confirm and Submit' : 'Next'}
              </Button>
            </div>
          </div>
        </Form>
      )}
    </Formik>
  );
}

MultiStepForm.propTypes = {
  title: PropTypes.string.isRequired,
  children: PropTypes.node.isRequired,
  initialValues: PropTypes.object.isRequired,
  onSubmit: PropTypes.func.isRequired,
  stepLabels: PropTypes.arrayOf(PropTypes.string).isRequired,
};
