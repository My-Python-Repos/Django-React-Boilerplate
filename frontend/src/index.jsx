import React from 'react';
import StyledEngineProvider from '@mui/material/StyledEngineProvider';

import App from './App';
import * as serviceWorker from './serviceWorker';
import { createRoot } from 'react-dom/client';
import { StrictMode } from 'react';

// Monkey patch console.log in production
if (process.env.NODE_ENV === 'production') {
  const console = {};
  console.log = () => null;
}

const rootElement = document.getElementById('root');
const root = createRoot(rootElement);

root.render(
  <StyledEngineProvider injectFirst>
    <StrictMode>
      <App />
    </StrictMode>
  </StyledEngineProvider>,
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
