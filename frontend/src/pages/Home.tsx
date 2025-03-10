import React, { useEffect } from 'react';
import LeftSidebar from '../components/Sidebar/LeftSidebar';
import RightSidebar from '../components/Sidebar/RightSidebar';
import useAppStore from '../store/homeuserstore';
import useAuthStore from '../store/authstore';
import { useProducts } from '../hooks/useProducts';
import { CategorySelector, ProductGrid } from '../components/products';
import SearchBar from '../components/Searchbar';
import UserProfile from '../components/userprofile/UserProfile';

const Home: React.FC = () => {
    const { activeSection } = useAppStore();
    const { user, checkAuthStatus } = useAuthStore();
    
    useEffect(() => {
        // Ensure user data is loaded
        if (!user) {
            checkAuthStatus();
        }
    }, [user, checkAuthStatus]);

    const { 
        categoriesQuery,
        productsQuery,
        selectedCategory,
        handleCategorySelect
    } = useProducts();
    
    const { 
        data: categories = [], 
        isLoading: categoriesLoading, 
        isError: categoriesError 
    } = categoriesQuery;
    
    const { 
        data: products = [], 
        isLoading: productsLoading, 
        isError: productsError,
        error: productsErrorDetails
    } = productsQuery;

    return (
        <div className="flex h-screen overflow-hidden">
            {/* Left Sidebar (responsive) */}
            <LeftSidebar />

            {/* Main Content Area (scrollable) */}
            <div className="flex-1 overflow-y-auto relative">
                <div className="bg-gray-200 p-4 sm:p-6 min-h-full">
                    {activeSection === 'home' ? (
                        <>
                            <SearchBar className="mb-4 sm:mb-6" />
                            <CategorySelector 
                                categories={categories} 
                                selectedCategory={selectedCategory}
                                onCategorySelect={handleCategorySelect}
                                isLoading={categoriesLoading}
                                isError={categoriesError}
                            />
                            <div className="border-b-2 border-gray-400 my-6"></div>
                            <ProductGrid 
                                products={products}
                                isLoading={productsLoading}
                                isError={productsError}
                                error={productsErrorDetails}
                            />
                        </>
                    ) : activeSection === 'profile' ? (
                        <UserProfile />
                    ) : (
                        // Default fallback, should not happen with current store
                        <div className="p-4">Content not available</div>
                    )}
                </div>
            </div>

            {/* Right Sidebar (responsive) */}
            <RightSidebar />
        </div>
    );
};

export default Home;