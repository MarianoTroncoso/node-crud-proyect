import {
  LOGIN_ROUTE,
  LOGOUT_ROUTE,
  REGISTER_ROUTE,
} from '../../../src/routes/constants';
import axios from './axios';

export const registerRequest = (user) => axios.post(REGISTER_ROUTE, user);

export const loginRequest = (user) => axios.post(LOGIN_ROUTE, user);

export const verifyTokenRequest = () => axios.get(`/verify`);

export const logoutRequest = () => axios.post(LOGOUT_ROUTE);
