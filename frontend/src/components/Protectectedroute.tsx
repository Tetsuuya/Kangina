// import { Navigate, Outlet } from 'react-router-dom';
// import { useAuthStore } from '../store/authStore';

// interface ProtectedRouteProps {
//   children?: React.ReactNode;
// }

// export const ProtectedRoute = ({ children }: ProtectedRouteProps) => {
//     const { token } = useAuthStore();
    
//     if (!token) {
//         return <Navigate to="/login" replace />;
//     }
    
//     return children ? <>{children}</> : <Outlet />;
// };

// export default ProtectedRoute;