import React from 'react';
import { useTasks } from '../context/useTasks';
import { Link } from 'react-router-dom';

import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);

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
            className="bg-red-500 text-white hover:bg-red-600 px-4 py-2 rounded-md"
          >
            Delete
          </button>
          <Link
            to={`/tasks/${_id}`}
            className="bg-blue-500 text-white hover:bg-blue-600 px-4 py-2 rounded-md"
          >
            Edit
          </Link>
        </div>
      </header>
      <p className="text-slate-300">{description}</p>
      <p>{dayjs.utc(date).format('DD/MM/YYYY')}</p>
    </div>
  );
}

export default TaskCard;
