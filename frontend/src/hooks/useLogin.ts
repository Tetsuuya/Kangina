import { useState } from 'react';
import { useAuthStore } from '../store/authStore';
import { loginUser } from '../api/auth';
import { useNavigate } from 'react-router-dom';

const useLogin = () => {
    const { setUser, setToken } = useAuthStore();
    const navigate = useNavigate();
    
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [isLoading, setIsLoading] = useState(false);

    const handleLogin = async () => {
        try {
            setIsLoading(true);
            setError('');
            
            const data = await loginUser(email, password);
            
            // Update store
            setUser(data.user);
            setToken(data.access);

            // Store tokens in localStorage
            localStorage.setItem('user', JSON.stringify(data.user));
            localStorage.setItem('accessToken', data.access);
            localStorage.setItem('refreshToken', data.refresh);

            navigate('/home');
        } catch (error: any) {
            setError(error.message || 'Login failed');
        } finally {
            setIsLoading(false);
        }
    };

    return {
        email, 
        setEmail,
        password, 
        setPassword,
        handleLogin,
        error,
        isLoading
    };
};

export default useLogin;