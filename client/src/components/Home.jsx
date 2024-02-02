import React from "react";

import {Link} from 'react-router-dom'

import workoutPlan from '../assets/workoutPlan.webp'
import exerciseImg from '../assets/exercise.jpeg' 
import writePlanImg from '../assets/writing-plan.jpg' 
import { useContext} from 'react'
import { AuthContext } from "../context/Auth";
const Home = () => {
  const context = useContext(AuthContext);

  return (
    <div className="bg-white shadow dark:bg-gray-900 py-[100px]">
      <div className="container mx-auto mb-10">
        <div className="mb-12">
          <h3 className="text-4xl text-center text-gray-500 sm:mb-0 dark:text-gray-400">Welcome Back {context.user.username}!</h3>
        </div>
        <div className="flex justify-center flex-wrap xl:center">
        <div className="h-[300px] w-[300px] mt-[50px] flex flex-col m-4 xl:m-8">
            <Link className="block h-full w-full" to={'/workoutPlan'}>
            <div className="h-full w-full">
              <img className="h-full w-full object-cover" src={workoutPlan} alt="workout-img" />
            </div>
            <p className="text-gray-500 sm:mb-0 dark:text-gray-400 text-lg text-center my-5">Your workouts</p>
            </Link>
          </div>
          <div className="h-[300px] w-[300px] mt-[50px] flex flex-col m-4 xl:m-8">
            <Link className="block h-full w-full" to={'/Exercise'}>
            <div className="h-full w-full">
              <img className="h-full w-full object-cover" src={exerciseImg} alt="" />
            </div>
            <p className="text-gray-500 sm:mb-0 dark:text-gray-400 text-lg text-center my-5">Look for exercises</p>
            </Link>
          </div>
          <div className="h-[300px] w-[300px] mt-[50px] flex flex-col m-4 xl:m-8">
            <Link className="block h-full w-full" to={'/editor'}>
            <div className="h-full w-full">
              <img className="h-full w-full object-cover" src={writePlanImg} alt="" />
            </div>
            <p className="text-gray-500 sm:mb-0 dark:text-gray-400 text-lg text-center my-5" >Create new plan</p>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
