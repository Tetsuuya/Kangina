import { useState } from 'react';
import { useMutation } from '@tanstack/react-query';
import { registerUser } from '../api/auth';

export function useRegister() {
    const [username, setUsername] = useState('');
    const [fullName, setFullName] = useState('');
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');

    const mutation = useMutation({
        mutationFn: () => registerUser(username, fullName, email, password),
        onSuccess: () => {
            window.location.href = '/login';
        },
        onError: (error: any) => {
            setError(error.message || 'Registration failed');
        }
    });

    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault();
        mutation.mutate();
    };

    return {
        username,
        setUsername,
        fullName,
        setFullName,
        email,
        setEmail,
        password,
        setPassword,
        handleSubmit,
        mutation,
        error
    };
}