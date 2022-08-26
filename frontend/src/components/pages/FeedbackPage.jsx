import Grid from '@mui/material/Grid';
import Paper from '@mui/material/Paper';
import { makeStyles } from '@mui/styles';
import Typography from '@mui/material/Typography';
import MuiRating from '@mui/lab/Rating';
import { Field } from 'formik';
import { TextField } from 'formik-material-ui';
import React from 'react';
import { useNavigate } from 'react-router-dom';
import * as Yup from 'yup';

import api from '../../services/ApiService';
import {
  sleep,
} from '../../utilities';
import AlertBar, { AlertState } from '../AlertBar/AlertBar';
import Rating from '../fields/Rating';
import ConfirmTextField from '../fields/ConfirmTextField';
import FormStep from '../form/FormStep';
import MultiStepForm from '../form/MultiStepForm';

const useStyles = makeStyles((theme) => ({
  formLayout: {
    width: 'auto',
    marginLeft: theme.spacing(2),
    marginRight: theme.spacing(2),
    [theme.breakpoints.up('md')]: {
      width: 600,
      marginLeft: 'auto',
      marginRight: 'auto',
    },
  },
  paper: {
    justifyContent: 'center',
    marginTop: theme.spacing(3),
    marginBottom: theme.spacing(3),
    padding: theme.spacing(2),
    [theme.breakpoints.up('md')]: {
      marginTop: theme.spacing(6),
      padding: theme.spacing(3),
    },
  },
  gridContainer: {
    marginTop: theme.spacing(1),
    marginBottom: theme.spacing(1),
  },
}));

const stepLabels = ['Enter Feedback', 'Confirm and Submit'];

export default function FeedbackPage() {
  const classes = useStyles();
  const navigate = useNavigate();

  const [alert, setAlert] = React.useState(AlertState.OFF);

  const submit = async (values) => {
    setAlert(AlertState.PROGRESS);

    const response = await api.post('/api/Feedback/', values, {
      'Content-Type': 'application/json',
    });

    if (response.status === 201) {
      setAlert(AlertState.SUCCESS);
      await sleep(750);
      navigate('/')
    } else {
      setAlert(AlertState.FAILURE);
    }
  };

  return (
    <div className={classes.formLayout}>
      <Paper className={classes.paper}>
        <MultiStepForm
          title="Submit Feedback"
          initialValues={{
            rating: 0,
            text: '',
          }}
          onSubmit={submit}
          stepLabels={stepLabels}
        >
          <FormStep
            validationSchema={Yup.object({
              rating: Yup.number().required('Required').test('rating', 'Required', (v) => v >= 1 && v <= 10),
              text: Yup.string().trim().required('Required'),
            })}
          >
            <Grid container spacing={2} className={classes.gridContainer}>
              <Grid item xs={12}>
                <Typography>How would you rate the application?</Typography>
                <Rating name="rating" />
              </Grid>
              <Grid item xs={12}>
                <Field
                  component={TextField}
                  name="text"
                  placeholder="Please enter any feedback you have about the application."
                  multiline
                  rows={5}
                  variant="outlined"
                  fullWidth
                />
              </Grid>
            </Grid>
          </FormStep>
          <FormStep>
            {({ values }) => (
              <Grid container spacing={2} className={classes.gridContainer}>
                <Grid item xs={12}>
                  <Typography>Rating</Typography>
                  <MuiRating
                    label="Rating"
                    max={10}
                    value={values.rating}
                    readOnly
                  />
                </Grid>
                <Grid item xs={12}>
                  <ConfirmTextField
                    label="Feedback"
                    value={values.text}
                  />
                </Grid>
              </Grid>
            )}
          </FormStep>
        </MultiStepForm>
      </Paper>
      <AlertBar
        state={alert}
        hidden
      />
    </div>
  );
}
