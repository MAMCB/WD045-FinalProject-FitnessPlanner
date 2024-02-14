import bodyBuilding from "../../assets/gym-2.jpeg";
import timeIcon from "../../assets/time-svgrepo-com.svg";
import workoutIcon from "../../assets/workout.svg";
import {motion} from "framer-motion";



const PresentationSection = () => {

  const fadeInText= {
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

  const fadeInImage = {
    initial:{
      opacity:0,
     
    },

    animate:{
      opacity:1,
     
     delay: 3
    }
  }





  return (
    <section className="relative bg-white shadow dark:bg-gray-900 py-[100px]">
      <div className="flex container mx-auto">
        <div className="flex flex-col mx-auto md:flex-row">
        <motion.div 
         variants={fadeInText}
         initial='initial'
         whileInView='animate'
         transition={{ duration:.8, delay: .8 }}
         viewport={{
           once:true
         }}
        
        
        className="w-full my-10 pr-[0px] md:w-3/5 lg:pr-[50px] md:pr-[15px]">
          <h2 className="text-gray-500 sm:mb-0 dark:text-gray-400 mb-[50px] uppercase text-xl  font-bold lg:text-6xl">
            Start
            <span className="rounded-xl bottom-[0px] m-2 py-0 px-2 relative border-2   border-box-shadow inline-block sm:text-xl lg:text-2xl lg:m-3 lg:py-1 lg:px-6 lg:bottom-[15px]">
              transforming
            </span>
            your fitness journey today
          </h2>
          <p className="text-gray-500 sm:mb-0 dark:text-gray-400 text-xl">
            The ultimate app for accessing top-notch personal trainers who will
            help you reach your fitness goals. Whether you're a beginner or an
            experienced fitness enthusiast, our team of certified coaches is
            here to provide personalized training programs tailored to your
            needs. From strength training and weight loss to muscle building and
            flexibility, we've got you covered. Get ready to transform your body
            and enhance your overall well-being with the guidance of our
            dedicated personal trainers.
          </p>
          <div className="flex flex-col flex-nowrap mt-[10px] md:flex-row md:mt-[50px] md:flex-wrap lg:flex-nowrap">
          <div className="flex mb-2 min-w-full flex-wrap flex-col justify-center content-center max-w-sm min-h-72 p-6 m-0.5  bg-pale-sky border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 md:w-[49%] md:min-w-0 lg:w-1/3">
              <div className="h-24 w-24 mr-auto ml-auto mb-4">
              <img className="h-full w-full text-center" src={timeIcon} alt=" "/>
              </div>
              <p className="font-normal text-gray-500 sm:mb-0 dark:text-gray-400 text-center">
                Track Your Achievement.
              </p>
            </div>
            <div className="flex mb-2 min-w-full flex-wrap flex-col justify-center content-center max-w-sm min-h-72 p-6 m-0.5  bg-pale-sky border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 md:w-[49%] md:min-w-0 lg:w-1/3">
            <div className="h-24 w-24 mr-auto ml-auto mb-4">
            <img className="h-full w-full" src={workoutIcon} alt="" />
            </div>
              <p className="font-normal text-gray-500 sm:mb-0 dark:text-gray-400 text-center">
                Improve your body.
              </p>
            </div>
            <div className="flex mb-2 min-w-full flex-wrap flex-col justify-center content-center max-w-sm min-h-72 p-6 m-0.5  bg-pale-sky border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700 md:w-[49%] md:min-w-0 lg:w-1/3">
              <div className="h-24 w-24 mr-auto ml-auto mb-4">
            <img className="h-full w-full" src={timeIcon} alt="" />
            </div>
              <p className="font-normal text-gray-500 sm:mb-0 dark:text-gray-400 text-center">
                Schedule your workouts.
              </p>
            </div>
          </div>
        </motion.div>
        <div className="w-full md:w-2/5">
          <motion.div
          variants={fadeInImage}
          initial='initial'
          whileInView='animate'
          transition={{ duration:.8, delay: .9 }}
          viewport={{
            once:true
          }}
          
          
          className="h-[800px] border-2 rounded-lg border-box-shadow  delay-[300ms] duration-[600ms] taos:[transform:translate3d(200px,200px,0)] taos:opacity-0" data-taos-offset="300">
            <img
              className="h-[100%] width-[100%] object-cover rounded-lg"
              src={bodyBuilding}
              alt="Bodybuilding Image"
            />
          </motion.div>
        </div>
        </div>
      </div>
    </section>
  );
};

export default PresentationSection;
