import { createContext, useContext, useState } from 'react';
import { createTaskRequest } from '../api/tasks';

const TaskContext = createContext();

// eslint-disable-next-line react-refresh/only-export-components
export const useTask = () => {
  const context = useContext(TaskContext);

  if (!context) {
    throw new Error('useTask must be used within a TaskProvider');
  }

  return context;
};

export const TaskProvider = ({ children }) => {
  const [tasks, setTasks] = useState([]);

  const createTask = async (task) => {
    const res = await createTaskRequest(task);

    console.log('res');
    console.log(res);
  };

  return (
    <TaskContext.Provider
      value={{
        tasks,
        setTasks,
        createTask,
      }}
    >
      {children}
    </TaskContext.Provider>
  );
};
