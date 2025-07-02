import { Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth.js'

export default function AuthRoute({children}) {
    const { user } = useAuth();
    const location = useLocation();
    return user ? (children) : (<Navigate to={`/login?returnUrl=${location.pathname}`} replace />)
}
