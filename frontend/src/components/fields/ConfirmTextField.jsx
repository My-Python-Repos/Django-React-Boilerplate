import TextField from '@mui/material/TextField';
import React from 'react';

export default function ConfirmTextField({ ...props }) {
  return (
    <TextField
      {...props}
      fullWidth
      color="primary"
      variant="outlined"
      inputProps={{
        readOnly: true,
      }}
    />
  );
}
