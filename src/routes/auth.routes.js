import { Router } from 'express';
import {
  register,
  login,
  logout,
  profile,
} from '../controllers/auth.controller.js';
import {
  REGISTER_ROUTE,
  LOGIN_ROUTE,
  LOGOUT_ROUTE,
  PROFILE_ROUTE,
} from './constants.js';
import { authRequired } from '../middlewares/validateToken.js';
import { validateSchema } from '../middlewares/validator.middleware.js';
import { registerSchema, loginSchema } from '../schemas/auth.schema.js';

const router = Router();

router.post(REGISTER_ROUTE, validateSchema(registerSchema), register);

router.post(LOGIN_ROUTE, validateSchema(loginSchema), login);

router.post(LOGOUT_ROUTE, logout);

router.get(PROFILE_ROUTE, authRequired, profile);

export default router;
