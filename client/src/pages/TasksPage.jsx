import { useTasks } from '../context/useTasks';
import { useEffect } from 'react';

const TasksPage = () => {
  const { getTasks, tasks } = useTasks();

  useEffect(() => {
    getTasks();
  }, []);

  if (tasks.length === 0) {
    return (
      <div>
        <h1 className="text-2xl">No tasks</h1>
      </div>
    );
  }

  return (
    <div>
      {tasks.map((task) => (
        <div key={task._id} className="bg-zinc-800 p-4 my-2 rounded-md">
          <h1 className="text-xl">{task.title}</h1>
          <p>{task.description}</p>
        </div>
      ))}
    </div>
  );
};

export default TasksPage;
