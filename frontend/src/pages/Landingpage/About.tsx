import { motion } from 'framer-motion'; // Importing motion from Framer Motion
import Carousel from '../../components/ui/Carousel';

const About = () => {
  return (
    <section className="bg-[#F58E26] py-12 text-white md:mt-4 p-10">
      <div className="container mx-auto flex flex-col md:flex-row justify-center items-center gap-4">
        {/* Carousel */}
        <div className="w-full md:w-1/2 sm:w-2/3 lg:w-1/3 mb-6 md:mb-0 flex justify-center flex-1">
          <Carousel />
        </div>

        {/* Text and Stats */}
        <div className="w-full md:w-1/2 text-center md:text-left flex flex-col justify-center items-center md:items-start flex-1">
          {/* Animated Heading */}
          <motion.h2
            className="text-[3em] uppercase font-bold text-[#3a3a3a] "
            initial={{ opacity: 0, y: 20 }} // Start slightly lower and hidden
            whileInView={{ opacity: 1, y: 0 }} // Fade in and move to the original position when in view
            viewport={{ once: true }} // Animation triggers only once when it enters the viewport
            transition={{ duration: 1 }} // Animation duration
          >
            We are Kangina.
          </motion.h2>

          {/* Animated Paragraph */}
          <motion.p
            className="max-w-[53ch] font-light text-lg mb-6"
            initial={{ opacity: 0, y: 20 }} // Start slightly lower and hidden
            whileInView={{ opacity: 1, y: 0 }} // Fade in and move to the original position when in view
            viewport={{ once: true }} // Animation triggers only once when it enters the viewport
            transition={{ delay: 0.3, duration: 1 }} // Animation delay and duration
          >
            Our adventure began in a humble kitchen where we discovered that the true secret ingredient wasn’t in the pantry—it was in the playful spirit of every “tarantado” who dared to break the rules. We take pride in transforming everyday ingredients into masterpieces that carry the soul of Filipino cooking, spiced up with a hint of rebellious wit.
          </motion.p>

          {/* Animated Statistics Section */}
          <motion.div
            className="flex justify-center md:justify-start gap-8 mb-8"
            initial={{ opacity: 0, y: 20 }} // Start slightly lower and hidden
            whileInView={{ opacity: 1, y: 0 }} // Fade in and move to the original position when in view
            viewport={{ once: true }} // Animation triggers only once when it enters the viewport
            transition={{ delay: 0.6, duration: 1 }} // Animation delay and duration
          >
            {/* Individual Stats */}
            <motion.div
              className="flex flex-col"
              initial={{ opacity: 0, scale: 0.8 }} // Start smaller and hidden
              whileInView={{ opacity: 1, scale: 1 }} // Fade in and scale to normal size when in view
              viewport={{ once: true }} // Animation triggers only once when it enters the viewport
              transition={{ delay: 0.8, duration: 0.5 }}
            >
              <span className="text-3xl font-bold">5k+</span>
              <span className="block text-sm font-light">active customers</span>
            </motion.div>

            <motion.div
              className="flex flex-col"
              initial={{ opacity: 0, scale: 0.8 }} // Start smaller and hidden
              whileInView={{ opacity: 1, scale: 1 }} // Fade in and scale to normal size when in view
              viewport={{ once: true }} // Animation triggers only once when it enters the viewport
              transition={{ delay: 1, duration: 0.5 }}
            >
              <span className="text-3xl font-bold">9k+</span>
              <span className="block text-sm font-light">satisfied diners</span>
            </motion.div>

            <motion.div
              className="flex flex-col"
              initial={{ opacity: 0, scale: 0.8 }} // Start smaller and hidden
              whileInView={{ opacity: 1, scale: 1 }} // Fade in and scale to normal size when in view
              viewport={{ once: true }} // Animation triggers only once when it enters the viewport
              transition={{ delay: 1.2, duration: 0.5 }}
            >
              <span className="text-3xl font-bold">10+</span>
              <span className="block text-sm font-light">award winning</span>
            </motion.div>
          </motion.div>
        </div>
      </div>
    </section>
  );
};

export default About;
