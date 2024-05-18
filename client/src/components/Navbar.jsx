import { Link } from 'react-router-dom';
import { LOGIN_ROUTE, REGISTER_ROUTE } from '../../../src/routes/constants';
import { useAuth } from '../context/useAuth';

function Navbar() {
  const { isAuthenticated, logout, user } = useAuth();

  return (
    <nav className="bg-zinc-700 my-3 flex justify-between py-5 px-10 rounded-lg">
      <Link to="/" className="text-white">
        <h1 className="text-2xl font-bold">Tasks Manager</h1>
      </Link>
      <ul className="flex gap-x-2">
        {isAuthenticated ? (
          <>
            <li>Welcome {user.username}</li>
            <li>
              <Link to="/add-task" className="text-white">
                Add task
              </Link>
            </li>
            <li>
              <Link
                to="/"
                onClick={() => logout()}
                className="text-white bg-indigo-500 px-4 py-1 rounded-md"
              >
                Logout
              </Link>
            </li>
          </>
        ) : (
          <>
            <li>
              <Link
                to={LOGIN_ROUTE}
                className="text-white bg-indigo-500 px-4 py-1 rounded-md"
              >
                Login
              </Link>
            </li>
            <li>
              <Link
                to={REGISTER_ROUTE}
                className="text-white bg-indigo-500 px-4 py-1 rounded-md"
              >
                Register
              </Link>
            </li>
          </>
        )}
      </ul>
    </nav>
  );
}

export default Navbar;
