import Button from '@mui/material/Button';
import FormHelperText from '@mui/material/FormHelperText';
import Grid from '@mui/material/Grid';
import InputAdornment from '@mui/material/InputAdornment';
import Paper from '@mui/material/Paper';
import { makeStyles } from '@mui/styles';
import Typography from '@mui/material/Typography';
import Lock from '@mui/icons-material/Lock';
import PersonIcon from '@mui/icons-material/Person';
import {
  Field,
  Form, Formik,
} from 'formik';
import { TextField } from 'formik-material-ui';
import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import * as Yup from 'yup';

import logo from '../../../images/logo.ico';
import { login } from '../../../services/AuthService';
import AlertBar, { AlertState } from '../../AlertBar/AlertBar';
import background from './background.jpg';

const useStyles = makeStyles((theme) => ({
  background: {
    minHeight: '100%',
    minWidth: 1024,
    width: '100%',
    height: 'auto',
    position: 'fixed',
    top: 0,
    left: 0,
    zIndex: -1,
  },
  layout: {
    position: 'relative',
    margin: 'auto',
    top: 250,
    width: 300,
  },
  paper: {
    padding: theme.spacing(2),
    marginBottom: 10,
  },
  title: {
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
  },
  logo: {
    marginRight: 10,
  },
  button: {
    marginTop: 10,
  },
  adornment: {
    marginRight: 5,
  },
  helperText: {
    textAlign: 'center',
  },
}));

export default function LoginMenu() {
  const classes = useStyles();

  // When a user tries to access a private route, they will usually be redirected to this component.
  // useNavigate and useLocation allow us to remember the URL that they were redirted from,
  // so after succesful login we can route them back to the original location they want to visit.
  const navigate = useNavigate();
  const location = useLocation();
  const { from } = location.state || { from: { pathname: '/' } };

  const [alert, setAlert] = React.useState(null);

  const handleSubmit = async (values) => {
    setAlert(AlertState.PROGRESS);

    if (await login(values.msid, values.password)) {
      navigate(from, { replace: true })
    } else {
      setAlert(AlertState.FAILURE);
      setTimeout(() => { setAlert(AlertState.OFF); }, 2000);
    }
  };

  return (
    <>
      <img className={classes.background} src={background} alt="background" />
      <div className={classes.layout}>
        <Paper className={classes.paper} data-testid="login-formik">
          <Formik
            initialValues={{
              msid: '',
              password: '',
            }}
            onSubmit={handleSubmit}
            validationSchema={Yup.object({
              msid: Yup.string().required('Required'),
              password: Yup.string().required('Required'),
            })}
            validateOnBlur={false}
            validateOnChange={false}
          >
            {(formik) => (
              <Form data-testid="login-form">
                <Grid container spacing={1}>
                  <Grid className={classes.title} item xs={12}>
                    <img
                      className={classes.logo}
                      src={logo}
                      alt="logo"
                      height="30"
                      width="30"
                    />
                    <Typography variant="h6">Django React Boilerplate</Typography>
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      component={TextField}
                      data-testid="login-msid-field"
                      name="msid"
                      label="MSID"
                      variant="outlined"
                      fullWidth
                      color="primary"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment className={classes.adornment}>
                            <PersonIcon />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Field
                      component={TextField}
                      data-testid="login-pass-field"
                      name="password"
                      label="Password"
                      type="password"
                      variant="outlined"
                      fullWidth
                      color="primary"
                      InputProps={{
                        startAdornment: (
                          <InputAdornment className={classes.adornment}>
                            <Lock />
                          </InputAdornment>
                        ),
                      }}
                    />
                  </Grid>
                  <Grid item xs={12}>
                    <Button
                      className={classes.button}
                      data-testid="login-submit-button"
                      type="submit"
                      disabled={formik.isSubmitting}
                      fullWidth
                      variant="contained"
                      color="primary"
                    >
                      Sign in
                    </Button>
                  </Grid>
                  <Grid item xs={12}>
                    <FormHelperText className={classes.helperText}>
                      Must be a member of CnS_Config_Automation
                    </FormHelperText>
                  </Grid>
                </Grid>
              </Form>
            )}
          </Formik>
        </Paper>
        <AlertBar state={alert} progress="Logging in.." failure="Login Failed" />
      </div>
    </>
  );
}
