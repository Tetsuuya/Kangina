import { Link } from "react-router-dom";
import { useState } from 'react';
import Button from "./ui/Button"
import LogoRed from "./ui/LogoRed"
import Navbar from "../components/Sidebar/Navbar"


const Header = () => {
  const [isOpen, setIsOpen] = useState(false);

  return (
    <header>
      <div className="flex justify-between items-center w-screen  px-10 py-4 md:py-2 max-w-[1500px] shadow-lg">
        <div>
          <Link to="/">
            <LogoRed/>
          </Link>
        </div>
        <Navbar />
        <Link to="/login">
          <Button text={'Get Started'} className="px-6 py-1 bg-white text-[#ed3f25] rounded-full border-2 border-red-500 hover:bg-red-500 hover:text-white transition-all duration-300 hidden md:block"></Button>
        </Link>

        <div className="md:hidden">
          <button onClick={() => setIsOpen(true)} className="text-gray-700 text-2xl focus:outline-none">
              ☰
          </button>
        </div>
      </div>

        {/* Backdrop Overlay (Closes menu when clicked) */}
        {isOpen && (
    <div 
        className="fixed inset-0 bg-black opacity-30 transition-opacity duration-300 z-10" 
        onClick={() => setIsOpen(false)}></div>
)}

<div 
    className={`fixed top-0 right-0 h-full w-64 bg-white shadow-lg transform transition-transform duration-300 ${
        isOpen ? "translate-x-0" : "translate-x-full"
    } md:hidden z-20`}
    onClick={(e) => e.stopPropagation()} // Prevent backdrop click from closing menu when clicking inside
>
    <div className="flex flex-col items-center py-6 space-y-6">
        {["Home", "About", "Features", "Team"].map((item) => (
            <Link 
                key={item} 
                to={`/${item.toLowerCase()}`} 
                className="text-base font-[600] text-[#ed3f25]" 
                onClick={() => setIsOpen(false)}>
                {item}
            </Link>
        ))}

        <Link to="/login" className="px-6 py-2 bg-[#ed3f25] text-white rounded-full" onClick={() => setIsOpen(false)}>
            Get Started
        </Link>
        
    </div>
</div>
    </header>
  )
}

export default Header