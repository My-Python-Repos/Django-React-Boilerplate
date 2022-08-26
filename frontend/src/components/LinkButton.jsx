import Button from '@mui/material/Button';
import { makeStyles } from '@mui/material/styles';
import PropTypes from 'prop-types';
import React from 'react';
import { Link } from 'react-router-dom';

const useStyles = makeStyles({
  link: {
    textDecoration: 'none',
  },
});

export default function LinkButton({
  className, text, link, color, variant, ...rest
}) {
  const classes = useStyles();

  return (
    <Link className={classes.link} to={link}>
      <Button className={className} variant={variant} color={color} {...rest}>
        {text}
      </Button>
    </Link>
  );
}

LinkButton.propTypes = {
  className: PropTypes.string,
  text: PropTypes.string.isRequired,
  link: PropTypes.string.isRequired,
  color: PropTypes.string,
  variant: PropTypes.string,
};

LinkButton.defaultProps = {
  className: null,
  color: 'default',
  variant: 'contained',
};
