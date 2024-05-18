import { useTasks } from '../context/useTasks';
import { useEffect } from 'react';
import TaskCard from '../components/TaskCard';

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
    <div className="grid sm:grid-cols-2 md:grid-cols-3 gap-2">
      {tasks.map((task) => (
        <TaskCard key={task._id} task={task} />
      ))}
    </div>
  );
};

export default TasksPage;
