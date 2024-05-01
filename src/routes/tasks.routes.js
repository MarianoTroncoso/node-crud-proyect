import { Router } from 'express';
import { TASKS_ROUTE } from './constants.js';
import { authRequired } from '../middlewares/validateToken.js';

const router = Router();

router.get(TASKS_ROUTE, authRequired, (req, res) => {
  res.send('Tasks list');
});

export default router;
