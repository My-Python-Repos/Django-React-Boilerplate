import Typography from '@mui/material/Typography';
import React from 'react';
import { Link } from 'react-router-dom';

export default function NotFoundPage() {
  return (
    <div>
      <Typography style={{ margin: 15 }} variant="h4" align="center">
        404 Not Found
      </Typography>
      <Link to="/">
        <Typography variant="h6" align="center">
          Go to Home
        </Typography>
      </Link>
    </div>
  );
}
