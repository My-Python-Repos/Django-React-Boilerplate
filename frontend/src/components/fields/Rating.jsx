import FormHelperText from '@mui/material/FormHelperText';
import MuiRating from '@mui/lab/Rating';
import { useField } from 'formik';
import PropTypes from 'prop-types';
import React from 'react';

export default function Rating({ name, max }) {
  const [field, meta, { setValue, setTouched }] = useField({ name });

  const handleChange = (_, value) => {
    setTouched(true);
    if (value) {
      setValue(value);
    }
  };

  return (
    <>
      <MuiRating
        max={max}
        defaultValue={0}
        value={field.value}
        onChange={handleChange}
      />
      {meta.error
        ? (
          <FormHelperText error>
            {meta.error}
          </FormHelperText>
        )
        : null}
    </>
  );
}

Rating.propTypes = {
  name: PropTypes.string.isRequired,
  max: PropTypes.number,
};

Rating.defaultProps = {
  max: 10,
};
