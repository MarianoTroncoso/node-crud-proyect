import { createContext, useState } from 'react';
import {
  createTaskRequest,
  getTasksRequest,
  getTaskRequest,
  deleteTaskRequest,
  updateTaskRequest,
} from '../api/tasks';
import { NO_CONTENT_STATUS_CODE } from '../../../src/controllers/constants';

export const TaskContext = createContext();

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);

  const getTasks = async () => {
    try {
      const res = await getTasksRequest();
      setTasks(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const createTask = async (task) => {
    const res = await createTaskRequest(task);
    console.log(res);
  };

  const updateTask = async (id, task) => {
    try {
      await updateTaskRequest(id, task);
    } catch (error) {
      console.log(error);
    }
  };

  const deleteTask = async (id) => {
    try {
      const res = await deleteTaskRequest(id);
      if (res.status === NO_CONTENT_STATUS_CODE) {
        setTasks((prevTasks) => prevTasks.filter((task) => task._id !== id));
      }
    } catch (error) {
      console.log(error);
    }
  };

  const getTask = async (id) => {
    try {
      const res = await getTaskRequest(id);
      return res.data;
    } catch (error) {
      console.log(error);
    }
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        setTasks,
        createTask,
        updateTask,
        getTasks,
        getTask,
        deleteTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
