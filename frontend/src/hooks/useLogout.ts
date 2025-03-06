import { useMutation } from '@tanstack/react-query';
import { logoutUser } from '../api/auth';
import { useNavigate } from 'react-router-dom';
import { useAuthStore } from '../store/authStore';

const useLogout = () => {
    const navigate = useNavigate();
    const { logout } = useAuthStore(); // Use the existing logout function
    
    const mutation = useMutation({
        mutationFn: logoutUser,
        onSuccess: () => {
            // Use the store's built-in logout function
            logout();
            
            // Redirect user after logout
            navigate('/');
        },
        onError: (error: any) => {
            console.error('Logout failed:', error);
            // Still logout and redirect even if the API call fails
            logout();
            navigate('/login');
        },
    });

    return mutation;
};

export default useLogout;