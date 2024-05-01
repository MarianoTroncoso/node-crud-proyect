import { Router } from 'express';
import { register, login, logout } from '../controllers/auth.controller.js';
import { REGISTER_ROUTE, LOGIN_ROUTE, LOGOUT_ROUTE } from './constants.js';

const router = Router();

router.post(REGISTER_ROUTE, register);

router.post(LOGIN_ROUTE, login);

router.post(LOGOUT_ROUTE, logout);

export default router;
