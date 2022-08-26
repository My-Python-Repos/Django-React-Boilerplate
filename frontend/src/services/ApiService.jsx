import axios from 'axios';
import Cookies from 'js-cookie';

import { getAccessToken, refreshAccessToken } from './AuthService';

const api = axios.create({
  /*
  Default axios behaviour is to throw errors if response status < 200 || > 400
  In our components, we find it cleaner to simply check the response code instead of catching errors
  Therefore, we disable this check
  */
  validateStatus: false,
});

// Development logging interceptors
export const responseLoggingInterceptor = async (response) => {
  console.log(response);
  return response;
};
export const requestLoggingInterceptor = (request) => {
  console.log(request);
  return request;
};

// Automatically add bearer and CSRF tokens
export const addHeadersInterceptor = (request) => {
  const accessToken = getAccessToken();
  request.headers.authorization = `Bearer ${accessToken}`;
  request.headers['X-CSRFToken'] = Cookies.get('csrftoken');

  return request;
};

// If token is expired, automatically refresh it and retry the call
export const refreshTokensInterceptor = async (response) => {
  if (response.status === 401) {
    const accessToken = await refreshAccessToken();
    const request = response.config;
    request.headers.authorization = `Bearer ${accessToken}`;

    return axios.request(request);
  }

  return response;
};

// Register Interceptors
if (process.env.NODE_ENV !== 'production') {
  api.interceptors.request.use(requestLoggingInterceptor);
  api.interceptors.response.use(responseLoggingInterceptor);
}

api.interceptors.request.use(addHeadersInterceptor);
api.interceptors.response.use(refreshTokensInterceptor);

export default api;
