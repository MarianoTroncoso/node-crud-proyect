import { useAuth } from './context/useAuth';
import { Navigate, Outlet } from 'react-router-dom';
import { LOGIN_ROUTE } from '../../src/routes/constants';

function ProtectedRoute() {
  const { isAuthenticated, isLoading } = useAuth();

  if (isLoading) {
    return <h1>Loading...</h1>;
  }

  if (!isAuthenticated) {
    return <Navigate to={LOGIN_ROUTE} replace />;
  }

  return <Outlet />;
}

export default ProtectedRoute;
