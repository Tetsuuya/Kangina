import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useProfile } from '../../hooks/useProfile';
import { useFavoriteStore } from '../../store/storeFavorites';
import { useOrderStore } from '../../store/storeorders'; // New import
import { ProfileEditModal } from './profile_edit';

const UserProfilePage = () => {
    const navigate = useNavigate();
    const { user, isLoading: profileLoading, fetchProfile } = useProfile();
    
    // Integrate favorite store
    const { favorites, fetchFavorites, isLoading: favoritesLoading } = useFavoriteStore();
    
    // Integrate order store
    const { orders, fetchOrders, isLoading: ordersLoading } = useOrderStore();

    const [isEditModalOpen, setIsEditModalOpen] = useState(false);

    useEffect(() => {
        // Fetch profile, favorites, and orders when component mounts
        fetchProfile().catch(err => {
            console.error('Failed to load profile:', err);
        });
        fetchFavorites().catch(err => {
            console.error('Failed to load favorites:', err);
        });
        fetchOrders().catch(err => {
            console.error('Failed to load orders:', err);
        });
    }, []);

    // Get array of active dietary preferences
    const getActiveDietaryPreferences = () => {
        if (!user) return [];
        
        const preferences = [
            user.is_vegetarian && 'Vegetarian',
            user.is_vegan && 'Vegan',
            user.is_pescatarian && 'Pescatarian',
            user.is_flexitarian && 'Flexitarian',
            user.is_paleo && 'Paleolithic',
            user.is_ketogenic && 'Ketogenic',
            user.is_halal && 'Halal',
            user.is_kosher && 'Kosher',
            user.is_fruitarian && 'Fruitarian',
            user.is_gluten_free && 'Gluten-Free',
            user.is_dairy_free && 'Dairy-free',
            user.is_organic && 'Organic'
        ].filter(Boolean);
        
        return preferences;
    };

    // Calculate active dietary preferences
    const activeDietary = getActiveDietaryPreferences();

    // Show loading state while profile is loading
    if (profileLoading && !user) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="text-xl">Loading profile...</div>
            </div>
        );
    }

    // Redirect if no user data is available
    if (!user && !profileLoading) {
        return (
            <div className="flex flex-col items-center justify-center h-screen">
                <h1 className="text-2xl font-bold mb-4">Please log in to view your profile</h1>
                <button 
                    className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
                    onClick={() => navigate('/login')}
                >
                    Go to Login
                </button>
            </div>
        );
    }

    return (
        <>
            <div className="max-w-4xl mx-auto p-6 ">
                {/* User Profile Card */}
                <div className="bg-white rounded-lg shadow-md overflow-hidden mb-6 relative">
                    {/* Edit button in top right corner */}
                    <button 
                        onClick={() => setIsEditModalOpen(true)}
                        className="absolute top-4 right-4 text-gray-600 hover:text-blue-600"
                    >
                        <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
                            <path d="M13.586 3.586a2 2 0 112.828 2.828l-.793.793-2.828-2.828.793-.793zM11.379 5.793L3 14.172V17h2.828l8.38-8.379-2.83-2.828z" />
                        </svg>
                    </button>

                    {/* Profile Info */}
                    <div className="p-6 flex flex-col md:flex-row items-center md:items-start gap-6">
                        {/* Profile Image */}
                        <div className="h-24 w-24 rounded-full bg-gray-200 flex items-center justify-center text-3xl text-gray-500">
                            {user?.full_name ? user.full_name.charAt(0).toUpperCase() : (user?.username?.charAt(0).toUpperCase() || '?')}
                        </div>

                        {/* Profile Details */}
                        <div className="text-center md:text-left w-full">
                            <h2 className="text-2xl font-bold text-indigo-900">{user?.full_name || user?.username || 'No name set'}</h2>
                            <div className="mt-2 text-gray-600">
                                <p>Email address: {user?.email || 'No email set'}</p>
                                <p>Phone number: {user?.phone_number || 'No phone number set'}</p>
                            </div>

                            {/* Dietary Preferences Pills */}
                            <div className="mt-4">
                                <h3 className="font-semibold mb-2">Dietary Preferences:</h3>
                                <div className="flex flex-wrap gap-2">
                                    {activeDietary.length > 0 ? (
                                        activeDietary.map((preference, index) => (
                                            <span 
                                                key={index} 
                                                className="px-3 py-1 bg-blue-100 text-blue-800 rounded-full text-sm"
                                            >
                                                {preference}
                                            </span>
                                        ))
                                    ) : (
                                        <p className="text-gray-500">No dietary preferences set</p>
                                    )}
                                </div>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="border-b-2 border-gray-400 my-10"></div>

                {/* Favorites and Recently Purchased Side-by-Side */}
                <div className="grid md:grid-cols-2 gap-6">
                    {/* Favorites Section */}
                    <div>
                        <div className="flex justify-between items-center mb-4">
                            <h2 className="text-xl font-bold">Your favorite meals:</h2>
                        </div>
                        
                        {favoritesLoading ? (
                            <div className="text-center text-gray-500">Loading favorites...</div>
                        ) : favorites.length === 0 ? (
                            <div className="text-center text-gray-500">
                                No favorite meals yet. Start adding your favorites!
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 gap-4">
                                {favorites.map((meal) => (
                                    <div 
                                        key={meal.id} 
                                        className="bg-white rounded-lg shadow overflow-hidden flex cursor-pointer"
                                        onClick={() => navigate(`/product/${meal.id}`)}
                                    >
                                        <div className="w-full h-full md:w-20 md:h-20 flex-shrink-0 rounded-md overflow-hidden bg-gray-50">
                                            {meal.image_url ? (
                                                <img 
                                                    src={meal.image_url} 
                                                    alt={meal.name} 
                                                    className="h-full w-full object-cover"
                                                />
                                            ) : (
                                                <div className="h-full w-full bg-gray-300 flex items-center justify-center text-gray-500">
                                                    No Image
                                                </div>
                                            )}
                                        </div>
                                        <div className="w-2/3 p-3">
                                            <h3 className="font-medium text-sm">{meal.name}</h3>
                                            <p className="text-xs text-gray-500 mt-1 truncate">{meal.description}</p>
                                            <p className="text-sm font-semibold text-blue-600 mt-1">
                                                ${Number(meal.price || 0).toFixed(2)}
                                            </p>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>

                    {/* Recently Purchased Section */}
                    <div>
                        <h2 className="text-xl font-bold mb-4">Recently purchased:</h2>
                        
                        {ordersLoading ? (
                            <div className="text-center text-gray-500">Loading orders...</div>
                        ) : orders.length === 0 ? (
                            <div className="text-center text-gray-500">
                                No recent orders yet. Start shopping!
                            </div>
                        ) : (
                            <div className="grid grid-cols-1 gap-4">
                                {orders.map((order) => (
                                    <div 
                                        key={order.id} 
                                        className="bg-white rounded-lg shadow overflow-hidden cursor-pointer"
                                        onClick={() => navigate(`/orders/${order.id}`)}
                                    >
                                        <div className="p-4">
                                            <div className="flex justify-between items-center mb-2">
                                                <h3 className="font-medium">Order #{order.id}</h3>
                                                <span className={`px-2 py-1 rounded text-xs ${
                                                    order.status === 'Completed' ? 'bg-green-100 text-green-800' :
                                                    order.status === 'Pending' ? 'bg-yellow-100 text-yellow-800' :
                                                    'bg-gray-100 text-gray-800'
                                                }`}>
                                                    {order.status}
                                                </span>
                                            </div>
                                            
                                            <p className="text-sm text-gray-500">
                                                Ordered on {new Date(order.created_at).toLocaleDateString()}
                                            </p>
                                            
                                            <div className="mt-2">
                                                <p className="text-sm font-semibold">
                                                    ${Number(order.total_amount).toFixed(2)}
                                                </p>
                                                <p className="text-xs text-gray-600 mt-1">
                                                    {order.items.length} item{order.items.length !== 1 ? 's' : ''}
                                                </p>
                                            </div>
                                            
                                            {/* Show first item as preview */}
                                            {order.items.length > 0 && (
                                                <div className="mt-3 pt-3 border-t border-gray-100">
                                                    <p className="text-sm font-medium">{order.items[0].product_name}</p>
                                                    {order.items.length > 1 && (
                                                        <p className="text-xs text-gray-500">
                                                            +{order.items.length - 1} more item{order.items.length > 2 ? 's' : ''}
                                                        </p>
                                                    )}
                                                </div>
                                            )}
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
            </div>

            {/* Profile Edit Modal */}
            {user && (
                <ProfileEditModal 
                    isOpen={isEditModalOpen}
                    onClose={() => setIsEditModalOpen(false)}
                    initialData={{
                        full_name: user.full_name || '',
                        email: user.email || '',
                        phone_number: user.phone_number || '',
                        dietaryPreferences: {
                            is_vegetarian: user.is_vegetarian || false,
                            is_vegan: user.is_vegan || false,
                            is_pescatarian: user.is_pescatarian || false,
                            is_flexitarian: user.is_flexitarian || false,
                            is_paleo: user.is_paleo || false,
                            is_ketogenic: user.is_ketogenic || false,
                            is_halal: user.is_halal || false,
                            is_kosher: user.is_kosher || false,
                            is_fruitarian: user.is_fruitarian || false,
                            is_gluten_free: user.is_gluten_free || false,
                            is_dairy_free: user.is_dairy_free || false,
                            is_organic: user.is_organic || false
                        }
                    }}
                />
            )}
        </>
    );
};

export default UserProfilePage;