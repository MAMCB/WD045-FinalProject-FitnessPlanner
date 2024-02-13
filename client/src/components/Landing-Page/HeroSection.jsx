import React from "react";
import { Link } from "react-router-dom";
import {motion} from "framer-motion";

const HeroSection = () => {

  const fadeInTitle = {
    initial:{
      opacity:0,
      translateY:-50,
      translateX:-50,
    
    },
    animate:{
      opacity:1,
      translateX:-140,
      translateY:-100,
     delay: 1
    }
  }

  const fadeInRegister = {
    initial:{
      opacity:0,
      translateY:-50,
      translateX:-200,
    },

    animate:{
      opacity:1,
      translateY:-100,
      translateX:0,
     delay: 3
    }
  }



  return (
    <section className="border-b-2 border-black bg-[url('/src/assets/bodybilder.jpg')] relative bg-no-repeat bg-left bg-cover h-screen">
      <div className="overlay">
        <div className="clip-path-triangle z-10 absolute right-0 top-0 bottom-0 left-2/4 bg-white shadow dark:bg-gray-900">
          <div className="flex absolute right-9  bottom-5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={100}
              height={100}
              viewBox="0 0 24 24"
              fill="#9EB9D6"
            >
              <path d="M10.477 0h-8.977l12.024 12-12.024 12h8.977l12.023-12z" />
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={100}
              height={100}
              viewBox="0 0 24 24"
              fill="#9EB9D6"
            >
              <path d="M10.477 0h-8.977l12.024 12-12.024 12h8.977l12.023-12z" />
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={100}
              height={100}
              viewBox="0 0 24 24"
              fill="#9EB9D6"
            >
              <path d="M10.477 0h-8.977l12.024 12-12.024 12h8.977l12.023-12z" />
            </svg>
          </div>
        </div>
        <div className="max-w-7xl mx-auto h-screen relative">
          <div>
            <motion.div
             variants={fadeInTitle}
             initial='initial'
             whileInView='animate'
             transition={{duration:0.5}}
             viewport={{
               once:true
             }}
            
            className="position-text-in-center z-10">
              <h1 className="text-gray-500 sm:mb-0 dark:text-gray-400 text-8xl font-bold">FitLife</h1>
              <p className="text-gray-500 sm:mb-0 dark:text-gray-400 text-3xl text-center">
                Fitness -Planner
              </p>
            </motion.div>

            <motion.div 
             variants={fadeInRegister}
             initial='initial'
             whileInView='animate'
             transition={{duration:0.5, delay:0.8}}
             viewport={{
               once:true
              }}
            
            className="flex flex-col absolute z-10 left-0 bottom-10 items-baseline justify-end">
              <p className="text-gray-500  dark:text-gray-400 font-bold mb-5">
                Start planning your new healthy lifestile!
              </p>
              <button
                className="text-gray-500  dark:text-gray-400 button border-2 mb-5 px-5 py-2.5  me-2  text-sm font-medium  focus:outline-none bg-white rounded-lg border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark: dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                type="button"
              >
                <Link to={"/register"}>Register</Link>
              </button>
              <p className="text-gray-500  dark:text-gray-400 mb-2">
                Already have an account?
              </p>
              <button
               className="text-gray-500  dark:text-gray-400 button border-2 mb-5 px-5 py-2.5  me-2  text-sm font-medium  focus:outline-none bg-white rounded-lg border-gray-200 hover:bg-gray-100 hover:text-blue-700 focus:z-10 focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-700 dark:bg-gray-800 dark: dark:border-gray-600 dark:hover:text-white dark:hover:bg-gray-700"
                type="button"
              >
                <Link to={"/login"}>Login</Link>
              </button>
            </motion.div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;