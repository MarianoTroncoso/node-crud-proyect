import { useForm } from 'react-hook-form';
import { useAuth } from '../context/useAuth';
import { useEffect } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { TASKS_ROUTE } from '../../../src/routes/constants';

const RegisterPage = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm();

  const { signup, isAuthenticated, errors: registerErrors } = useAuth();

  const navigate = useNavigate();

  useEffect(() => {
    if (isAuthenticated) navigate(TASKS_ROUTE);
  }, [isAuthenticated, navigate]);

  const onSubmit = handleSubmit(async (values) => {
    signup(values);
  });

  return (
    <div className="flex h-[calc(100vh-100px)] items-center justify-center">
      <div className="bg-zinc-800 max-w-md p-10 rounded-md">
        {(registerErrors || [])?.map((error) => (
          <p key={error} className="bg-red-500 p-2 text-white">
            {error}
          </p>
        ))}
        <h1 className="text-2xl text-white font-bold mb-4">Register</h1>
        <form onSubmit={onSubmit}>
          <input
            type="text"
            {...register('username', { required: true })}
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
            placeholder="Username"
          />
          {errors.username && (
            <p className="text-red-500">Username is required</p>
          )}
          <input
            type="email"
            {...register('email', { required: true })}
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
            placeholder="Email"
          />
          {errors.email && <p className="text-red-500">Email is required</p>}
          <input
            type="password"
            {...register('password', { required: true })}
            className="w-full bg-zinc-700 text-white px-4 py-2 rounded-md my-2"
            placeholder="Password"
          />
          {errors.password && (
            <p className="text-red-500">Password is required</p>
          )}
          <button
            className="bg-sky-500 text-white px-4 py-2 rounded-md my-2"
            type="submit"
          >
            Register
          </button>
        </form>

        <p className="flex gap-x-2 mt-5 justify-between ">
          Already have an account?{' '}
          <Link className="text-sky-500" to="/login">
            Login
          </Link>
        </p>
      </div>
    </div>
  );
};

export default RegisterPage;
