import { useRegister } from '../hooks/useRegister';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import FoodBlue from '../assets/FoodBlue.png';
import LogoBlue from '../components/ui/LogoBlue';

const Register = () => {
    const {
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
    } = useRegister();
    
    const [showPassword, setShowPassword] = useState(false);
    
    // Check if mutation is loading based on the mutation status
    // Using 'pending' instead of 'loading' to match React Query types
    const isLoading = mutation.status === 'pending';

    return (
        <div className="md:h-screen justify-start items-center flex p-10 md:p-32 max-w-[1600px] mx-auto">
            <div className="w-[500px]">
                <Link to="/">
                    <LogoBlue className="cursor-pointer w-8"/>
                </Link>
                <h2 className="text-5xl font-extrabold text-[#32347c] mb-4 mt-4">Create Account.</h2>
                <p className="text-lg text-gray-600 mb-10">Welcome, please provide your account information</p>
                
                <form className="space-y-4" onSubmit={handleSubmit}>
                    <div>
                        <input
                            type="text"
                            placeholder="Full Name"
                            value={fullName}
                            onChange={(e) => setFullName(e.target.value)}
                            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400 placeholder-gray-500"
                            required
                        />
                    </div>
                    
                    <div>
                        <input
                            type="text"
                            placeholder="Username"
                            value={username}
                            onChange={(e) => setUsername(e.target.value)}
                            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400 placeholder-gray-500"
                            required
                        />
                    </div>

                    <div>
                        <input 
                            type="email" 
                            placeholder="Email"
                            value={email}
                            onChange={(e) => setEmail(e.target.value)}
                            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400 placeholder-gray-500" 
                            required 
                        />
                    </div>

                    <div className="relative">
                        <input 
                            type={showPassword ? "text" : "password"} 
                            placeholder="Password"
                            value={password}
                            onChange={(e) => setPassword(e.target.value)}
                            className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400 pr-10 placeholder-gray-500" 
                            required 
                        />

                        <button 
                            type="button" 
                            onClick={() => setShowPassword(!showPassword)}
                            className="absolute right-5 top-6 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
                        >
                            {showPassword ? <EyeOffIcon size={20} /> : <EyeIcon size={20} />}
                        </button>
                    </div>

                    {error && <p className="text-red-500">{error}</p>}

                    <button 
                        type="submit" 
                        className="w-full py-3 bg-blue-800 text-white rounded-lg hover:bg-blue-800 transition"
                        disabled={isLoading}
                    >
                        {isLoading ? 'Signing Up...' : 'Sign Up'}
                    </button>
                </form>

                <p className="mt-4 text-base">
                    Already have an account? <Link to="/login" className="text-blue-800">Login</Link>
                </p>
            </div>
          
            <div className="absolute right-0 top-0 bottom-0 hidden md:block">
                <img src={FoodBlue} alt="Food Blue" className="w-full h-full object-cover" />
            </div>
        </div>
    );
};

export default Register;