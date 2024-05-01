import { Router } from 'express';
import { TASKS_ROUTE } from './constants.js';
import { authRequired } from '../middlewares/validateToken.js';
import {
  getTasks,
  getTask,
  createTask,
  deleteTask,
  updateTask,
} from '../controllers/tasks.controller.js';

const router = Router();

router.get(TASKS_ROUTE, authRequired, getTasks);

router.get(`${TASKS_ROUTE}/:id`, authRequired, getTask);

router.post(TASKS_ROUTE, authRequired, createTask);

router.delete(`${TASKS_ROUTE}/:id`, authRequired, deleteTask);

router.put(`${TASKS_ROUTE}/:id`, authRequired, updateTask);

export default router;
