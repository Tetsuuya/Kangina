import useLogin from '../hooks/useLogin';
import { Link } from 'react-router-dom';
import { useState } from 'react';
import { EyeIcon, EyeOffIcon } from 'lucide-react';
import FoodRed from "../assets/FoodRed.png";
import LogoRed from '../components/ui/LogoRed';

const Login = () => {
  const { 
      email, 
      setEmail, 
      password, 
      setPassword, 
      handleLogin, 
      error,
      isLoading: loginLoading 
  } = useLogin();
  
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
      e.preventDefault();
      await handleLogin(); // The hook already handles navigation, errors, and loading state
  };

  const Footer = () => {
      return (
        <footer className="w-full text-left py-4 text-sm text-gray-600 border-t mt-12">
            <p>&copy; 2025 — 2026</p>
            <p>
            <a href="#" className="text-gray-600 hover:underline">
              Privacy and Terms
            </a>
          </p>
        </footer>
      );
  };

  return (
      <div className="h-screen justify-start items-center flex p-10 md:p-32 max-w-[1600px] mx-auto">
        <div className="w-[460px]">
          <Link to="/">
              <LogoRed className="cursor-pointer w-8"/>
          </Link>
          <h2 className="text-5xl font-extrabold text-[#ed3f25] mb-4 mt-4">Log in.</h2>
          <p className="text-lg text-gray-600 mb-6">Welcome back! Please log in to your account.</p>
          <form className="space-y-4" onSubmit={handleSubmit}>
            <div>
              <label htmlFor="email" className="block text-base font-medium mb-0.5">Email</label>
              <input 
                type="email" 
                id="email" 
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required 
              />
            </div>
            <div className="relative">
              <label htmlFor="password" className="block text-base font-medium mb-0.5">Password</label>
              <input 
                type={showPassword ? "text" : "password"} 
                id="password" 
                className="w-full px-4 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-red-400 pr-10" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required 
              />
  
              <button 
                type="button" 
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-5 top-12 transform -translate-y-1/2 text-gray-500 hover:text-gray-700"
              >
                {showPassword ? <EyeOffIcon size={20} /> : <EyeIcon size={20} />}
              </button>
            </div>
  
            <button 
              type="submit" 
              className="w-full py-3 bg-red-500 text-white rounded-lg hover:bg-red-600 transition"
              disabled={loginLoading}
            >
              {loginLoading ? 'Loading...' : 'Log in'}
            </button>
          </form>
          
          {error && (
            <p className="mt-2 text-red-500">{error}</p>
          )}
  
          <p className="mt-4 text-base">
            New User? <Link to="/register" className="text-[#ed3f25]">Sign Up</Link>
          </p>
          <Footer />
        </div>
        
        <div className="absolute right-0 top-0 bottom-0 hidden md:block">
          <img src={FoodRed} alt="Food illustration" className="w-full h-full object-cover" />
        </div>
      </div>
  );
};

export default Login;