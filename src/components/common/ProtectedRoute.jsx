import { useSelector } from 'react-redux'
import { Navigate, Outlet } from 'react-router-dom'

const ProtectedRoute = () => {
  const localToken = localStorage.getItem('token');
  const reduxToken = useSelector((state) => state.auth.token);
  const token = localToken || reduxToken;

  return token ? <Outlet /> : <Navigate to="/login" replace />
}

export default ProtectedRoute