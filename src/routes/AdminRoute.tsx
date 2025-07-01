import { Navigate } from 'react-router-dom';
import { useAuth } from '../hooks/useAuth';

const  AdminRoute=({ children }: { children: JSX.Element })=> {
  const { isAuthenticated, isAdmin, loading } = useAuth();

  if (loading) return null;
  return isAuthenticated && isAdmin ? children : <Navigate to="/" />;
}
export default AdminRoute
