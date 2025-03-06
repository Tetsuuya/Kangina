const BASE_URL = import.meta.env.VITE_BACKEND_URL; // Make sure this matches your .env

export const registerUser = async (username: string, fullName: string, email: string, password: string) => {
    const response = await fetch(`${BASE_URL}/register/`, { 
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ 
            username, 
            full_name: fullName, // Make sure the key matches what Django expects
            email, 
            password
        }),
    });
    
    const data = await response.json();
    
    if (!response.ok) {
        // Improved error handling to show specific error messages from backend
        const errorMessage = data.error || 
                            (data.email && `Email: ${data.email}`) || 
                            (data.username && `Username: ${data.username}`) ||
                            (data.full_name && `Full name: ${data.full_name}`) ||
                            'Registration failed';
        throw new Error(errorMessage);
    }
    
    return data;
};

export const loginUser = async (email: string, password: string) => {
    try {
        console.log('Attempting login to:', `${BASE_URL}/login/`);
        
        const response = await fetch(`${BASE_URL}/login/`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ email, password }),
        });
        
        const data = await response.json();
        
        if (!response.ok) {
            console.error('Login failed with status:', response.status);
            throw new Error(data.error || 'Invalid credentials');
        }
        
        return data;
    } catch (error) {
        console.error('Login error details:', error);
        throw error;
    }
};

export const logoutUser = async () => {
    const refreshToken = localStorage.getItem('refreshToken');
    const accessToken = localStorage.getItem('accessToken');

    if (!refreshToken || !accessToken) return;

    const response = await fetch(`${BASE_URL}/logout/`, {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${accessToken}`
        },
        body: JSON.stringify({ refresh: refreshToken }),
    });

    // Clear local storage even if response fails
    localStorage.removeItem('accessToken');
    localStorage.removeItem('refreshToken');
    localStorage.removeItem('user');

    if (!response.ok) throw new Error('Logout failed');
};

export const refreshToken = async () => {
    const refreshToken = localStorage.getItem('refreshToken');
    if (!refreshToken) throw new Error('No refresh token available');
    
    const response = await fetch(`${BASE_URL}/token/refresh/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ refresh: refreshToken }),
    });
    
    if (!response.ok) {
        // Clear storage and redirect to login if refresh fails
        localStorage.removeItem('accessToken');
        localStorage.removeItem('refreshToken');
        localStorage.removeItem('user');
        throw new Error('Session expired');
    }
    
    const data = await response.json();
    localStorage.setItem('accessToken', data.access);
    return data.access;
};

// Utility function to fetch with auto token refresh
export const fetchWithAuth = async (url: string, options: RequestInit = {}) => {
    let accessToken = localStorage.getItem('accessToken');
    
    // Set up headers with authorization
    const headers = {
        ...options.headers,
        'Authorization': `Bearer ${accessToken}`,
        'Content-Type': 'application/json',
    };
    
    // Make initial request
    let response = await fetch(url, { ...options, headers });
    
    // If unauthorized, try refreshing token
    if (response.status === 401) {
        try {
            accessToken = await refreshToken();
            headers['Authorization'] = `Bearer ${accessToken}`;
            response = await fetch(url, { ...options, headers });
        } catch (error) {
            // Redirect to login page if refresh fails
            window.location.href = '/login';
            throw error;
        }
    }
    
    return response;
    
};

// Add these profile-related functions to your api/auth.ts file

export const getUserProfile = async () => {
    try {
        const response = await fetchWithAuth(`${BASE_URL}/user/`, {
            method: 'GET'
        });
        
        if (!response.ok) {
            throw new Error('Failed to fetch profile');
        }
        
        const data = await response.json();
        return data;
    } catch (error) {
        console.error('Error fetching user profile:', error);
        throw error;
    }
};

export const updateUserProfile = async (profileData: { 
    full_name?: string, 
    email?: string, 
    phone_number?: string,
    // Add any other fields you want to update
}) => {
    try {
        const response = await fetchWithAuth(`${BASE_URL}/profile/update/`, {
            method: 'PUT',
            body: JSON.stringify(profileData)
        });
        
        if (!response.ok) {
            throw new Error('Failed to update profile');
        }
        
        const data = await response.json();
        
        // Update the local user data if profile update is successful
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        localStorage.setItem('user', JSON.stringify({...user, ...data}));
        
        return data;
    } catch (error) {
        console.error('Error updating user profile:', error);
        throw error;
    }
};

export const updateDietaryPreferences = async (
    dietaryPreferences: {
        is_vegetarian?: boolean,
        is_vegan?: boolean,
        is_pescatarian?: boolean,
        is_flexitarian?: boolean,
        is_paleo?: boolean,
        is_ketogenic?: boolean,
        is_halal?: boolean,
        is_kosher?: boolean,
        is_fruitarian?: boolean,
        is_gluten_free?: boolean,
        is_dairy_free?: boolean,
        is_organic?: boolean
    }
) => {
    try {
        const response = await fetchWithAuth(`${BASE_URL}/profile/dietary-preferences/`, {
            method: 'PUT',
            body: JSON.stringify(dietaryPreferences)
        });
        
        if (!response.ok) {
            throw new Error('Failed to update dietary preferences');
        }
        
        const data = await response.json();
        
        // Update local user data
        const user = JSON.parse(localStorage.getItem('user') || '{}');
        localStorage.setItem('user', JSON.stringify({...user, ...data}));
        
        return data;
    } catch (error) {
        console.error('Error updating dietary preferences:', error);
        throw error;
    }
};


