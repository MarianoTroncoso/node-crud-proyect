import { Router } from 'express';
import { register, login } from '../controllers/auth.controller.js';
import { REGISTER_ROUTE, LOGIN_ROUTE } from './constants.js';

const router = Router();

router.post(REGISTER_ROUTE, register);

router.post(LOGIN_ROUTE, login);

export default router;
