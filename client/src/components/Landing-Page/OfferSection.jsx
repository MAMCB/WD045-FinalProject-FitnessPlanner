import fitnessGirl from "../../assets/fitness-girl.jpg";
import { motion } from "framer-motion";


const OfferSection = () => {

  const fadeInAnimationsVariable = {
    initial:{
      opacity:0,
      y:100
    },
    animate:{
      opacity:1,
      y:0,
      delay:0.25
    }
  }


  const fadeInAnimationsImage = {
    initial:{
      opacity:0,
      translateY:450,
      translateX:0,
    },
    animate:{
      opacity:1,
      translateY:0,
      translateX:0,
      delay:0.25
    }
  }
  return (
    <section className="relative bg-white shadow dark:bg-gray-900 py-[100px]">
       <div className="flex flex-col container mx-auto w-100 md:flex-row">
      <div className="w-full md:w-2/5">
        <motion.div
         variants={fadeInAnimationsImage}
         initial='initial'
         whileInView='animate'
         transition={{ duration:.5,  }}
         viewport={{
           once:true
         }}
        
        className="h-[800px] border-2 rounded-lg  border-black-color">
          <img
            className="h-[100%] width-[100%] object-cover rounded-lg"
            src={fitnessGirl}
            alt="Bodybuilding Image"
          />
        </motion.div>
      </div>
      <div className="flex w-100 mt-8 max-w-7xl mx-auto md:w-2/5">
        <ul className="flex w-100 flex-col flex-wrap justify-center align-center">
          <motion.li 
          variants={fadeInAnimationsVariable}
          initial='initial'
          whileInView='animate'
          transition={{ duration:.5, delay: .6 }}
          viewport={{
            once:true
          }}
          className="text-lg lg:text-4xl text-center p-5 text-gray-500 sm:mb-3 dark:text-gray-400 mb-6 bg-black-color rounded-3xl">Personalized Workout</motion.li>
          <motion.li
             variants={fadeInAnimationsVariable}
             initial='initial'
             whileInView='animate'
             transition={{ duration:.5, delay: .7 }}
             viewport={{
               once:true
             }}
          className="text-lg lg:text-4xl text-center p-5 text-gray-500 sm:mb-3 dark:text-gray-400 mb-6 bg-black-color rounded-3xl">Visualize Your Progress</motion.li>
          <motion.li
             variants={fadeInAnimationsVariable}
             initial='initial'
             whileInView='animate'
             transition={{ duration:.5, delay: .8 }}
             viewport={{
               once:true
             }}
          className="text-lg lg:text-4xl text-center p-5 text-gray-500 sm:mb-3 dark:text-gray-400 mb-6 bg-black-color rounded-3xl">Smart Scheduling</motion.li>
          <motion.li 
             variants={fadeInAnimationsVariable}
             initial='initial'
             whileInView='animate'
             transition={{ duration:.5, delay: .9 }}
             viewport={{
               once:true
             }}
          className="text-lg lg:text-4xl text-center p-5 text-gray-500 sm:mb-3 dark:text-gray-400 mb-6 bg-black-color rounded-3xl">Real-Time Workouts</motion.li>
        </ul>
      </div>
      </div>
    </section>
  );
};

export default OfferSection;
