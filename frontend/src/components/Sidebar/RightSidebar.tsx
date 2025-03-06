import { useEffect, useState } from 'react';
import { useCartStore } from '../../store/cartStore';
import { useAuthStore } from '../../store/authStore';
import { useOrderStore } from '../../store/storeorders';

// Define interface for cart item
interface CartItem {
  id: number;
  product: number;
  product_name: string;
  product_price: number;
  product_image?: string;
  quantity: number;
}

const RightSidebar = () => {
    // State to manage sidebar visibility on mobile
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);
    
    // State to manage selected payment method
    const [selectedPaymentMethod, setSelectedPaymentMethod] = useState<string | null>(null);

    // Get the user from authStore
    const { user } = useAuthStore();
    
    // Using Zustand stores
    const { items, isLoading, error, fetchCart, removeItem, updateQuantity, getTotalPrice, } = useCartStore();
    const { createOrder, isLoading: isOrderLoading } = useOrderStore();
    
    useEffect(() => {
        fetchCart();  
    }, [fetchCart]);

    const handleQuantityChange = (productId: number, newQuantity: number): void => {
        if (newQuantity > 0) {
            updateQuantity(productId, newQuantity);
        }
    };

    const taxRate = 0.05; // 5% tax
    const taxAmount = getTotalPrice() * taxRate;
    const totalAmount = getTotalPrice() + taxAmount;

    // Toggle sidebar for mobile
    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    // Handle order placement
    const handlePlaceOrder = async () => {
      try {
          // Create order
          await createOrder();
          
          // Refresh the cart after placing the order
          await fetchCart();
  
          // Optional: Show success message or redirect
          alert('Order placed successfully!');
      } catch (error) {
          console.error('Failed to place order', error);
          alert('Failed to place order. Please try again.');
      }
  };

    return (
        <>
            {/* Mobile Cart Toggle Button */}
            <button 
                onClick={toggleSidebar} 
                className="fixed bottom-4 right-4 z-50 bg-indigo-800 text-white p-3 rounded-full shadow-lg block md:hidden"
            >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 3h2l.4 2M7 13h10l4-8H5.4M7 13L5.4 5M7 13l-2.293 2.293c-.63.63-.184 1.707.707 1.707H17m0 0a2 2 0 100 4 2 2 0 000-4zm-8 2a2 2 0 11-4 0 2 2 0 014 0z" />
                </svg>
                <span className="absolute -top-1 -right-1 bg-red-500 text-white text-xs rounded-full h-4 w-4 flex items-center justify-center">
                    {items.length}
                </span>
            </button>

            {/* Sidebar - Desktop and Mobile */}
            <div className={`
                fixed inset-y-0 right-0 w-full md:w-[300px] bg-white h-full overflow-y-auto p-4 md:p-6 flex flex-col shadow-lg 
                transform transition-transform duration-300 ease-in-out
                ${isSidebarOpen ? 'translate-x-0' : 'translate-x-full'}
                md:translate-x-0 md:relative
                z-50
            `}>
                {/* Close button for mobile */}
                <button 
                    onClick={toggleSidebar} 
                    className="absolute top-4 left-4 text-gray-600 hover:text-gray-900 block md:hidden"
                >
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
                    </svg>
                </button>

                <h2 className="text-2xl md:text-3xl font-bold text-indigo-900 mb-6 mt-10 md:mt-6">
                    Kain na, {user?.username || 'User'}!
                </h2>
                
                {/* Cart items section */}
                <div className="mb-4 flex-grow overflow-hidden flex flex-col">
                    <h3 className="text-indigo-700 mb-2">Here's what's on your cart:</h3>
                    
                    {/* Scrollable cart container */}
                    <div className="overflow-y-auto flex-grow">
                        {isLoading ? (
                            <p className="text-gray-500">Loading your cart...</p>
                        ) : error ? (
                            <p className="text-red-500">Error loading cart: {error}</p>
                        ) : items.length === 0 ? (
                            <p className="text-gray-500">Your cart is empty</p>
                        ) : (
                            <div className="flex flex-col gap-2 pr-1">
                                {items.map((item: CartItem) => (
                                    <div key={item.id} className="bg-white rounded-lg p-2 mb-2 shadow-sm border border-gray-100 flex items-center">
                                        {/* Product image */}
                                        <div className="w-10 h-10 md:w-12 md:h-12 flex-shrink-0 rounded-md overflow-hidden bg-gray-50">
                                            {item.product_image ? (
                                                <img 
                                                    src={item.product_image} 
                                                    alt={item.product_name} 
                                                    className="w-full h-full object-cover"
                                                />
                                            ) : (
                                                <div className="w-full h-full bg-gray-100 flex items-center justify-center">
                                                    <span className="text-xs text-gray-400">No img</span>
                                                </div>
                                            )}
                                        </div>
                                        
                                        {/* Product details */}
                                        <div className="flex flex-col ml-2 flex-grow min-w-0">
                                            <h4 className="font-medium text-sm text-gray-800 truncate">{item.product_name}</h4>
                                            
                                            {/* Price and quantity controls */}
                                            <div className="flex items-center justify-between mt-1">
                                                <div className="flex items-center gap-1">
                                                    <span className="font-medium text-xs">Php {item.product_price.toFixed(2)}</span>
                                                    
                                                    {/* Quantity indicator */}
                                                    <div className="inline-flex items-center border border-gray-200 rounded-full text-xs overflow-hidden ml-15">
                                                        <button 
                                                            className="bg-gray-100 hover:bg-gray-200 text-gray-600 w-4 h-4 flex items-center justify-center"
                                                            onClick={() => handleQuantityChange(item.product, item.quantity - 1)}
                                                        >
                                                            -
                                                        </button>
                                                        <span className="px-1 text-xs font-medium text-gray-700">{item.quantity}</span>
                                                        <button 
                                                            className="bg-gray-100 hover:bg-gray-200 text-gray-600 w-4 h-4 flex items-center justify-center"
                                                            onClick={() => handleQuantityChange(item.product, item.quantity + 1)}
                                                        >
                                                            +
                                                        </button>
                                                    </div>
                                                </div>
                                                
                                                {/* Delete button */}
                                                <button 
                                                    className="text-gray-400 hover:text-red-500 pl-3 bg-gray-50 rounded-full h-5 w-5 flex items-center justify-center"
                                                    onClick={() => removeItem(item.product)}
                                                >
                                                   🗑️
                                                </button>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        )}
                    </div>
                </div>
                
                {/* Order summary and payment */}
                <div className="mt-auto flex-shrink-0">
                    <div className="bg-gray-100 rounded-lg p-4 mb-4">
                        <div className="flex justify-between mb-2">
                            <span className="text-gray-600">Sub Total</span>
                            <span className="font-medium">Php {getTotalPrice().toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between mb-2">
                            <span className="text-gray-600">Tax 5%</span>
                            <span className="font-medium">Php {taxAmount.toFixed(2)}</span>
                        </div>
                        <div className="flex justify-between font-semibold text-lg border-t border-dashed border-gray-300 pt-2">
                            <span>Total Amount</span>
                            <span>Php {totalAmount.toFixed(2)}</span>
                        </div>
                    </div>

                    {/* Payment Options */}
                    <div className="grid grid-cols-3 gap-2 mb-4">
                        <button 
                            className={`flex flex-col items-center justify-center p-4 rounded ${
                                selectedPaymentMethod === 'cash' 
                                    ? 'bg-indigo-200 border-2 border-indigo-700' 
                                    : 'bg-white border border-gray-300'
                            }`}
                            onClick={() => setSelectedPaymentMethod('cash')}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 9V7a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2m2 4h10a2 2 0 002-2v-6a2 2 0 00-2-2H9a2 2 0 00-2 2v6a2 2 0 002 2zm7-5a2 2 0 11-4 0 2 2 0 014 0z" />
                            </svg>
                            <span className="text-sm mt-1">Cash</span>
                        </button>
                        <button 
                            className={`flex flex-col items-center justify-center p-4 rounded ${
                                selectedPaymentMethod === 'card' 
                                    ? 'bg-indigo-200 border-2 border-indigo-700' 
                                    : 'bg-white border border-gray-300'
                            }`}
                            onClick={() => setSelectedPaymentMethod('card')}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M3 10h18M7 15h1m4 0h1m-7 4h12a3 3 0 003-3V8a3 3 0 00-3-3H6a3 3 0 00-3 3v8a3 3 0 003 3z" />
                            </svg>
                            <span className="text-sm mt-1">Credit/Debit</span>
                        </button>
                        <button 
                            className={`flex flex-col items-center justify-center p-4 rounded ${
                                selectedPaymentMethod === 'qr' 
                                    ? 'bg-indigo-200 border-2 border-indigo-700' 
                                    : 'bg-white border border-gray-300'
                            }`}
                            onClick={() => setSelectedPaymentMethod('qr')}
                        >
                            <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6 text-gray-700" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 4v1m6 11h2m-6 0h-2v4m0-11v3m0 0h.01M12 12h4.01M16 20h4M4 12h4m12 0h.01M5 8h2a1 1 0 001-1V5a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1zm12 0h2a1 1 0 001-1V5a1 1 0 00-1-1h-2a1 1 0 00-1 1v2a1 1 0 001 1zM5 20h2a1 1 0 001-1v-2a1 1 0 00-1-1H5a1 1 0 00-1 1v2a1 1 0 001 1z" />
                            </svg>
                            <span className="text-sm mt-1">QR Code</span>
                        </button>
                    </div>
                    
                    <button 
                        className="w-full bg-indigo-800 text-white py-3 rounded-lg font-semibold hover:bg-indigo-700 transition"
                        onClick={handlePlaceOrder}
                        disabled={items.length === 0 || isOrderLoading}
                    >
                        {isOrderLoading ? 'Placing Order...' : 'Place Order'}
                    </button>
                </div>
            </div>

            {/* Overlay for mobile to close sidebar when open */}
            {isSidebarOpen && (
                <div 
                    onClick={toggleSidebar} 
                    className="fixed inset-0 bg-black opacity-50 z-40 block md:hidden"
                ></div>
            )}
        </>
    );
};

export default RightSidebar;