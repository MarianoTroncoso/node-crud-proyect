import React from 'react';
import { useTasks } from '../context/useTasks';
import { Link } from 'react-router-dom';

function TaskCard({ task }) {
  const { deleteTask } = useTasks();

  const { _id, title, description, date } = task;

  return (
    <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
      <header className="flex justify-between">
        <h1 className="text-2xl font-bold">{title}</h1>
        <div className="flex gap-x-2 items-center">
          <button
            onClick={() => {
              deleteTask(_id);
            }}
          >
            Delete
          </button>
          <Link to={`/tasks/${_id}`}>Edit</Link>
        </div>
      </header>
      <p className="text-slate-300">{description}</p>
      <p>{new Date(date).toLocaleDateString()}</p>
    </div>
  );
}

export default TaskCard;
