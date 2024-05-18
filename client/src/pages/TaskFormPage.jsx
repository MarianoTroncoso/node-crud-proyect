import { useForm } from 'react-hook-form';
import { useTasks } from '../context/useTasks';
import { useNavigate } from 'react-router-dom';
import { TASKS_ROUTE } from '../../../src/routes/constants';

const TaskFormPage = () => {
  const { register, handleSubmit } = useForm();

  const navigate = useNavigate();

  const { createTask } = useTasks();

  const onSubmit = handleSubmit((data) => {
    createTask(data);
    navigate(TASKS_ROUTE);
  });

  return (
    <div className="bg-zinc-800 max-w-md w-full p-10 rounded-md">
      <form action="" onSubmit={onSubmit}>
        <input
          type="text"
          placeholder="Title"
          {...register('title')}
          className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
          autoFocus
        />
        <textarea
          placeholder="Description"
          rows={3}
          {...register('description')}
          className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
        ></textarea>
        <button>Save</button>
      </form>
    </div>
  );
};

export default TaskFormPage;
