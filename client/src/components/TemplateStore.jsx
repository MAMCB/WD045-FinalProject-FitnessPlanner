("use client");
import React from "react";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/Auth";
import axios from "../axiosInstance";

const TemplateStore = () => {
  const [workoutPlans, setWorkoutPlans] = useState([]);
  const [workoutOwners, setWorkoutOwners] = useState([]);
  
  const context = useContext(AuthContext);

  useEffect(() => {
    axios
      .get("/api/workoutPlan/public")
      .then((res) => setWorkoutPlans(res.data))
      .catch((e) => console.error(e));
  }, []);

  useEffect(() => {
    if (workoutPlans.length === 0) {
      return;
    }
    const promises = workoutPlans.map((workout) =>
      axios.get(`/api/user/${workout.userId}`)
    );
    Promise.all(promises)
      .then((results) => {
        const owners = results.map((res) => res.data.username);
        setWorkoutOwners(owners);
      })
      .catch((e) => console.error(e));
  }, [workoutPlans]);


  useEffect(() => {
    console.log(workoutPlans);
    console.log(workoutOwners);
  }, [workoutPlans, workoutOwners]);

  return workoutPlans.length === 0 ? (
    <h1>Loading...</h1>
  ) : (
    <section className="text-gray-600 body-font px-[40px]">
      <div className="container px-1 py-12 mx-auto ">
        <div className="flex flex-wrap -m-2 gap-4 justify-center">
          {workoutPlans.map((workout, index) => (
            <div
              key={index}
              className=" bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 lg:w-1/5 md:w-1/3 p-2 w-full flex flex-col justify-between"
            >
              <a
                href="#"
                className="block relative h-48 rounded overflow-hidden"
              >
                <img
                  className="rounded-t-lg object-cover object-center w-full h-full block"
                  src={workout.image}
                  alt=""
                />
              </a>
              <div className="p-5 flex-grow">
                <a href="#">
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    {workout.name}
                  </h5>
                </a>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                  Goal : {workout.goal}
                </p>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                  Difficulty : {workout.difficulty}
                </p>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                  Equipment : {workout.equipment ? "Yes" : "None"}
                </p>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                  Was created by : {workoutOwners[index]}
                </p>
                <a
                  href="#"
                  className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Read more
                  <svg
                    className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 10"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M1 5h12m0 0L9 1m4 4L9 9"
                    />
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TemplateStore;
