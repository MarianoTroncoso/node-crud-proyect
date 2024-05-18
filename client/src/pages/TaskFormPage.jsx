import { useForm } from 'react-hook-form';
import { useTasks } from '../context/useTasks';
import { useNavigate, useParams } from 'react-router-dom';
import { TASKS_ROUTE } from '../../../src/routes/constants';
import { useEffect } from 'react';

import dayjs from 'dayjs';
import utc from 'dayjs/plugin/utc';
dayjs.extend(utc);

const TaskFormPage = () => {
  const { register, handleSubmit, setValue } = useForm();

  const navigate = useNavigate();

  const { createTask, getTask, updateTask } = useTasks();

  const params = useParams();

  useEffect(() => {
    const loadTask = async () => {
      if (params.id) {
        const task = await getTask(params.id);

        const { title, description, date } = task;

        setValue('title', title);
        setValue('description', description);
        setValue('date', dayjs(date).format('DD-MM-YYYY'));
      }
    };

    loadTask();
  }, []);

  const onSubmit = handleSubmit((data) => {
    const isCreatingTask = !params.id;

    const validData = {
      ...data,
      date: data.date ? dayjs.utc(data.date).format() : dayjs.utc().format(),
    };

    if (isCreatingTask) {
      createTask(validData);
      navigate(TASKS_ROUTE);
    } else {
      updateTask(params.id, validData);
      navigate(TASKS_ROUTE);
    }
  });

  return (
    <div className="flex h-[calc(100vh-100px)] items-center justify-center">
      <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
        <form action="" onSubmit={onSubmit}>
          <label htmlFor="title" className="text-white">
            Title
          </label>
          <input
            type="text"
            placeholder="Title"
            {...register('title')}
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
            autoFocus
          />
          <label htmlFor="description" className="text-white">
            Description
          </label>
          <textarea
            placeholder="Description"
            rows={3}
            {...register('description')}
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
          ></textarea>
          <label htmlFor="date" className="text-white">
            Date
          </label>
          <input
            type="date"
            {...register('date')}
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
          />
          <button className="bg-indigo-500 px-3 py-2 rounded-md">Save</button>
        </form>
      </div>
    </div>
  );
};

export default TaskFormPage;
