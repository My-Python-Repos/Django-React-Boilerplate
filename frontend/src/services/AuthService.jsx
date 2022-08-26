import axios from 'axios';
import { useMemo } from 'react';

export const getAccessToken = () => localStorage.getItem('accessToken');

export const getRefreshToken = () => localStorage.getItem('refreshToken');

export const setAccessToken = (accessToken) => {
  localStorage.setItem('accessToken', accessToken);
};

export const setRefreshToken = (refreshToken) => {
  localStorage.setItem('refreshToken', refreshToken);
};

const getJWT = () => (getAccessToken() ? JSON.parse(atob(getAccessToken().split('.')[1])) : {});

export const getCurrentUserName = () => getJWT().user_name;

export const userIsAdmin = () => getJWT().is_admin;

export const login = async (msid, password) => {
  try {
    const response = await axios.post('/api/auth/login/', {
      msid,
      password,
    });
    setAccessToken(response.data.access);
    setRefreshToken(response.data.refresh);
    return true;
  } catch (error) {
    return false;
  }
};

export const logout = () => {
  localStorage.removeItem('accessToken');
  localStorage.removeItem('refreshToken');
};

export const refreshAccessToken = async () => {
  const refreshToken = getRefreshToken();
  if (refreshToken) {
    try {
      const response = await axios.post('/api/auth/token/refresh/', {
        refresh: refreshToken,
      });

      if (response.status === 200) {
        const accessToken = response.data.access;
        setAccessToken(accessToken);
        return accessToken;
      }
    } catch (error) {
      // If refresh fails due to 401 Unauthorized, it means the refresh token has expired
      // The user needs to login again to receive fresh tokens
      if (error.response.status === 401) {
        logout();
        window.location.replace('/login');
      }
    }
  }
  return false;
};

export const isLoggedIn = () => getRefreshToken() && getAccessToken();

export function useCurrentUser() {
  const userDetails = useMemo(() => getJWT(), [getJWT]);
  return {
    username: userDetails.user_name,
    isAdmin: userDetails.is_admin,
  };
}
