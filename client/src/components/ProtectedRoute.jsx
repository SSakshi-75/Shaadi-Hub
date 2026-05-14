import { useContext } from 'react';
import { Navigate, Outlet } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';
import Loader from './Loader';

const ProtectedRoute = ({ allowedRoles }) => {
  const { user, loading } = useContext(AuthContext);

  if (loading) return <Loader fullPage={true} />;

  if (!user) {
    const redirectPath = allowedRoles.includes('admin') ? '/login?role=admin' : '/login';
    return <Navigate to={redirectPath} replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    // If it's the admin dashboard, let the component handle the restricted view
    // so the user knows WHY they can't access it.
    if (allowedRoles.includes('admin')) {
      return <Outlet />;
    }
    return <Navigate to="/" replace />;
  }

  return <Outlet />;
};

export default ProtectedRoute;
