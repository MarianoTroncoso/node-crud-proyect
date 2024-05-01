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
import { validateSchema } from '../middlewares/validator.middleware.js';
import { createTaskSchema } from '../schemas/task.schema.js';

const router = Router();

router.get(TASKS_ROUTE, authRequired, getTasks);

router.get(`${TASKS_ROUTE}/:id`, authRequired, getTask);

router.post(
  TASKS_ROUTE,
  authRequired,
  validateSchema(createTaskSchema),
  createTask
);

router.delete(`${TASKS_ROUTE}/:id`, authRequired, deleteTask);

router.put(`${TASKS_ROUTE}/:id`, authRequired, updateTask);

export default router;
