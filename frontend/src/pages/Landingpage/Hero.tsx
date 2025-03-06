import { motion } from "framer-motion";
import { Link } from "react-router-dom";
import FoodHp from "../../assets/FoodRed.png";
import Button from "../../components/ui/Button";
import Wordmark from '../../assets/Wordmark.png'

export const Hero = () => {
  return (
    <div className="flex flex-col md:flex-row w-full h-auto md:h-screen mt-5 md:m-0">
      {/* Left Side - Animated Text and Buttons */}
      <motion.div 
        className="w-full md:w-1/2 self-center px-5 mx-10 text-center md:text-left md:mt-10"
        initial={{ opacity: 0, x: -50 }} // Start hidden and slightly left
        animate={{ opacity: 1, x: 0 }} // Fade in and move to position
        transition={{ duration: 1, ease: "easeOut" }} // Smooth transition
      >
        
      <div>
        <img src={Wordmark} className="w-[85vh] md:m-0"/>
      </div>

        <motion.p 
          className="text-[1.2rem] text-[#6C6C6C] my-4"
          initial={{ opacity: 0, y: 20 }} 
          animate={{ opacity: 1, y: 0 }} 
          transition={{ delay: 0.3, duration: 1 }}
        >
          The wildest culinary adventure crafted by the one and only Cooking ng ina mo! Be ready as you’re about to embark on a flavor trip that’ll have you shouting “Kangina, kain na!”
        </motion.p>

        {/* Animated Buttons */}
        <motion.div 
          className="my-5 flex justify-center md:justify-start"
          initial={{ opacity: 0, scale: 0.8 }} 
          animate={{ opacity: 1, scale: 1 }} 
          transition={{ delay: 0.6, duration: 0.5 }}
        >
          <Link to="/register">
            <Button text="Sign Up" className="mr-5 rounded-full px-8 font-light bg-[#32347c] text-white hover:opacity-70 ease-in duration-100" />
          </Link>
          <Link to="/login">
            <Button text="Log In" className="rounded-full px-8 border border-[#32347c] text-[#32347c] hover:bg-[#32347c] hover:text-white ease-in duration-100" />
          </Link>
        </motion.div>
      </motion.div>

      {/* Right Side - Animated Image */}
      <motion.img 
        src={FoodHp} 
        alt="Food" 
        className="w-full md:w-1/2 object-cover max-h-[500px] md:max-h-screen md:block hidden"
        initial={{ opacity: 0, y: 50 }} // Start hidden and slightly lower
        animate={{ opacity: 1, y: 0 }} // Fade in and move up
        transition={{ duration: 1, ease: "easeOut" }} // Smooth animation
      />
    </div>
  );
};
