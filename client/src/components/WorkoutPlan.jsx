import React from "react";
import axios from "../axiosInstance";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/Auth";
("use client");

import { Accordion } from "flowbite-react";

const WorkoutPlan = () => {
  const [workout, setWorkout] = useState([]);
  const [userExercise, setUserExercise] = useState([]);
  const context = useContext(AuthContext);

  useEffect(() => {
    axios
      .get("/api/workoutPlan")
      .then((res) => setWorkout(res.data))
      .catch((e) => console.error(e));
  }, []);

  useEffect(() => {
    axios
      .get(`/api/user/${context.user._id}`)
      .then((res) => setUserExercise(res.data))
      .catch((e) => console.error(e));
  }, []);

  return (
    <div className="py-[100px] bg-white border border-gray-200 rounded-lg dark:bg-gray-800 w-[100%] dark:border-gray-700 m-[10px]">
        <div className="flex">
          <div className='w-[50%] "bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 m-[5px] '>
            {workout.map((workout) => {
              return (
                <>
                  <div>
                    <div className="flex">
                      <div className="w-2/4 bg-white border border-gray-200 rounded-lg dark:bg-gray-800 p-10 dark:border-gray-700 m-[10px]">
                        <img
                          className="rounded-lg"
                          src={workout.image}
                          alt="workout img"
                        />
                      </div>
                      <div className="w-2/4 bg-white border border-gray-200 rounded-lg dark:bg-gray-800 p-10 dark:border-gray-700 m-[10px]">
                        <p>Workout Name: {workout.name}</p>
                        <p>Goal: {workout.goal}</p>
                        <p>Difficulty: {workout.difficulty}</p>
                        <p>Rating: {workout.rating}</p>
                      </div>
                    </div>
                    {workout.exercises.map((x) => {
                      return (
                        <>
                          <Accordion className="m-[10px]">
                            <Accordion.Panel className="m-[10px]">
                              <Accordion.Title>
                                <span className="font-bold">
                                  Exercise name:
                                </span>{" "}
                                {x.exercise.name}
                              </Accordion.Title>
                              <Accordion.Content>
                                <div className="flex">
                                  <div className="w-[60%] bg-white border border-gray-200 rounded-lg dark:bg-gray-800 p-2 dark:border-gray-700 m-[10px]">
                                    <img
                                      className="rounded-lg"
                                      src={x.exercise.image}
                                      alt="exercise-image"
                                    />
                                  </div>
                                  <ul className="w-[40%] bg-white border border-gray-200 rounded-lg dark:bg-gray-800 p-3 dark:border-gray-700 m-[10px]">
                                    <li>
                                      <span className="font-bold">
                                        Equipment:
                                      </span>{" "}
                                      {x.exercise.equipment}
                                    </li>
                                    <li>
                                      <span className="font-bold">
                                        Difficulty:
                                      </span>{" "}
                                      {x.exercise.difficulty}
                                    </li>
                                    <li>
                                      <span className="font-bold">
                                        Muscle Group:
                                      </span>{" "}
                                      {x.exercise.muscleGroup}
                                    </li>
                                    <li>
                                      <span className="font-bold">Rating:</span>{" "}
                                      {x.exercise.rating}
                                    </li>
                                  </ul>
                                </div>
                                <p className="mb-2 text-gray-500 dark:text-gray-400">
                                  {x.exercise.description}
                                </p>
                              </Accordion.Content>
                            </Accordion.Panel>
                          </Accordion>
                        </>
                      );
                    })}
                  </div>
                </>
              );
            })}
          </div>
          <div className="w-[50%] m-[5px]">
            {userExercise.exercises?.map((x) => {
              return (
                <div key={x._id} className="p-2 mb-[15px] bg-white border border-gray-200 rounded-lg dark:bg-gray-800 dark:border-gray-700">
     <div className="flex">
      <div className="w-[300px] h-[300px] mr-[10px] mb-[10px] bg-white border border-gray-200 p-2 rounded-lg dark:bg-gray-800 dark:border-gray-700">
                   <img className="w-full h-full rounded-lg"  src={x.image} alt="exercise image" />
                   </div>
                   <div>
                   <p><span className="font-bold">Exercises Name: </span>{x.name}</p>
                    <p><span className="font-bold">Equipment: </span>{x.equipent}</p>
                    <p><span className="font-bold">Difficulty: </span>{x.difficulty}</p>
                    <p><span className="font-bold">Muscle Group: </span>{x.muscleGroup}</p>
                    <p><span className="font-bold">Rating: </span>{x.rating}</p>
                   </div>
                  </div>
                  <p>{x.description}</p>
                </div>
              );
            })}
          </div>
        </div>
      </div>
  );
};

export default WorkoutPlan;
