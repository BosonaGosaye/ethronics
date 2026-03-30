import { Navigate, useLocation } from 'react-router-dom';
import { useLibraryUser } from '../contexts/LibraryUserContext';

export default function ProtectedLibraryRoute({ children }) {
  const { isAuthenticated, loading } = useLibraryUser();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-purple-600"></div>
      </div>
    );
  }

  if (!isAuthenticated) {
    return <Navigate to="/library/login" state={{ from: location }} replace />;
  }

  return children;
}
