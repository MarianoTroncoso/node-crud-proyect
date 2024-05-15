import { TASKS_ROUTE } from '../../../src/routes/constants';
import axios from './axios';

export const getTasksRequest = () => axios.get(TASKS_ROUTE);
export const getTaskRequest = (id) => axios.get(`${TASKS_ROUTE}/${id}`);

export const createTaskRequest = (task) => axios.post(TASKS_ROUTE, task);

export const updateTaskRequest = (task) =>
  axios.put(`${TASKS_ROUTE}/${task._id}`, task);

export const deleteTaskRequest = (id) => axios.delete(`${TASKS_ROUTE}/${id}`);
