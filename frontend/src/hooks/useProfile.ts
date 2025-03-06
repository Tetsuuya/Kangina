// useProfile.ts with dietary preferences support
import { useState } from 'react';
import { useAuthStore } from '../store/authStore';
import { getUserProfile, updateUserProfile, updateDietaryPreferences } from '../api/auth';

export const useProfile = () => {
    const { user, setUser } = useAuthStore();
    const [isLoading, setIsLoading] = useState(false);
    const [error, setError] = useState<string | null>(null);

    const fetchProfile = async () => {
        setIsLoading(true);
        setError(null);
        
        try {
            const profileData = await getUserProfile();
            setUser(profileData);
            return profileData;
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Failed to fetch profile';
            setError(errorMessage);
            throw err;
        } finally {
            setIsLoading(false);
        }
    };

    const updateProfile = async (profileData: { 
        full_name?: string, 
        email?: string, 
        phone_number?: string,
        // Add other fields as needed
    }) => {
        setIsLoading(true);
        setError(null);

        try {
            const updatedUserData = await updateUserProfile(profileData);
            setUser(updatedUserData);
            return updatedUserData;
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Failed to update profile';
            setError(errorMessage);
            throw err;
        } finally {
            setIsLoading(false);
        }
    };

    const updateDietary = async (dietaryData: {
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
    }) => {
        setIsLoading(true);
        setError(null);

        try {
            const updatedUserData = await updateDietaryPreferences(dietaryData);
            setUser(updatedUserData);
            return updatedUserData;
        } catch (err) {
            const errorMessage = err instanceof Error ? err.message : 'Failed to update dietary preferences';
            setError(errorMessage);
            throw err;
        } finally {
            setIsLoading(false);
        }
    };

    return {
        user,
        isLoading,
        error,
        fetchProfile,
        updateProfile,
        updateDietary
    };
};