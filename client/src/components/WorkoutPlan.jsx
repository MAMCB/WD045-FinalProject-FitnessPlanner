("use client");
import React from "react";
import axios from "../axiosInstance";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/Auth";
import { Accordion } from "flowbite-react";
import { Link, useParams, useNavigate } from "react-router-dom";

const WorkoutPlan = () => {
  const [workout, setWorkout] = useState([]);
  const [userExercise, setUserExercise] = useState([]);


  const context = useContext(AuthContext);
  const navigate = useNavigate();
  
  console.log(workout)

  useEffect(() => {
    axios
      .get("/api/workoutPlan")
      .then((res) => setWorkout(res.data))
      .catch((e) => console.error(e));
  }, []);

useEffect(() => {
    axios
      .get(`/api/user/${context.user._id}`)
      .then((res) => setUserExercise(res.data?.exercises))
      .catch((e) => console.error(e));
  }, []); 

  const deleteWorkoutTask = (id) =>{
    setWorkout((state)=>(state.filter(x=> x._id !== id)))
  }

  const deleteExerciseTask = (id) =>{
    setUserExercise((state)=>(state.filter(x=>x._id !== id)))
  }

  const deleteHandler = (id) =>{
    axios.delete(`/api/workoutPlan/${id}`)
    .then(res=> navigate(`/workoutPlan`))
    .catch(e=>console.error(e))
    deleteWorkoutTask(id)
}


const deleteExercisesHandler = (id) =>{
  axios.delete(`/api/exercise/${id}`)
  .then(res=> navigate(`/workoutPlan`))
  .catch(e=>console.error(e))
  deleteExerciseTask(id)
 
}
 

  return (
    <div className="w-[100%] bg-white shadow dark:bg-gray-900 py-[100px]">
      <div className="flex flex-wrap justify-between">
        <div className='w-[100%] lg:w-[49%] "bg-white shadow dark:bg-gray-800 m-[5px]'>
          {workout.map((workout) => {
            return (
              <div key={workout._id}>
                <div className="my-[20px] bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                  <div className="flex">
                    <div className="w-2/4 bg-white border border-gray-200 rounded-lg dark:bg-gray-800 p-10 dark:border-gray-700 m-[10px]">
                      <img
                        className="rounded-lg object-contein"
                        src={workout.image}
                        alt="workout img"
                      />
                    </div>
                    <div className="w-2/4 bg-white border border-gray-200 rounded-lg dark:bg-gray-800 p-10 dark:border-gray-700 m-[10px]">
                      <p>Workout Name: {workout.name}</p>
                      <p>Goal: {workout.goal}</p>
                      <p>Difficulty: {workout.difficulty}</p>
                      <p>Rating: {workout.rating}</p>
                      <div className="mt-4">
                      <Link
                        to={`/workoutPlayer/${workout._id}`}
                          type="button"
                          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                        >
                          Play
                        </Link>
                        <Link
                        to={`/workoutPlan/${workout._id}`}
                          type="button"
                          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                        >
                          Edit
                        </Link>
                        <Link
                        onClick={()=>deleteHandler(`${workout._id}`)}
                          type="button"
                          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                        >
                          Delete
                        </Link>
                      </div>
                    </div>
                  </div>
                  {workout.exercises.map((x) => {
                    return (
                      <div key={x.exercise._id}>
                        <Accordion collapseAll className="m-[10px]">
                          <Accordion.Panel className="m-[10px]">
                            <Accordion.Title>
                              <span className="font-bold">Exercise name:</span>{" "}
                              {x.exercise.name}
                            </Accordion.Title>
                            <Accordion.Content>
                              <div className="flex">
                                <div className="w-[60%] bg-white border border-gray-200 rounded-lg dark:bg-gray-800 p-2 dark:border-gray-700 m-[10px]">
                                  <img
                                    className="rounded-lg object-contein"
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
                                  <li>
                                    <span className="font-bold">
                                      Sets:
                                    </span>{" "}
                                    {x.sets}
                                  </li>
                                  <li>
                                    <span className="font-bold">
                                      Duration:
                                    </span>{" "}
                                    {x.duration}
                                  </li>
                                  <li>
                                    <span className="font-bold">
                                      Weights:
                                    </span>{" "}
                                    {x.weights}
                                  </li>
                                </ul>
                              </div>
                              <p className="mb-2 text-gray-500 dark:text-gray-400">
                                {x.exercise.description}
                              </p>
                            </Accordion.Content>
                          </Accordion.Panel>
                        </Accordion>
                      </div>
                    );
                  })}
                </div>
              </div>
            );
          })}
        </div>
        <div className="w-[100%] lg:w-[49%] m-[5px]">
          {userExercise.map((x) => {
            return (
              <div
                key={x._id}
                className="p-[10px] mb-[15px] bg-white border border-gray-200 rounded-lg dark:bg-gray-800 dark:border-gray-700"
              >
                <div className="flex">
                  <div className="w-[60%] h-[300px] mr-[10px] bg-white border border-gray-200 p-4 rounded-lg dark:bg-gray-800 dark:border-gray-700">
                    <img
                      className="w-full h-full rounded-lg object-contein"
                      src={x.image}
                      alt="exercise image"
                    />
                  </div>
                  <div className="w-[40%]  bg-white border border-gray-200 p-4 rounded-lg dark:bg-gray-800 dark:border-gray-700">
                    <p>
                      <span className="font-bold">Exercises Name: </span>
                      {x.name}
                    </p>
                    <p>
                      <span className="font-bold">Equipment: </span>
                      {x.equipment}
                    </p>
                    <p>
                      <span className="font-bold">Difficulty: </span>
                      {x.difficulty}
                    </p>
                    <p>
                      <span className="font-bold">Muscle Group: </span>
                      {x.muscleGroup}
                    </p>
                    <p>
                      <span className="font-bold">Rating: </span>
                      {x.rating}
                    </p>
                    <div className="mt-4">
                        <Link
                        to={`/editExercise/${x._id}`}
                          type="button"
                          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                        >
                          Edit
                        </Link>
                        <Link
                        onClick={()=>deleteExercisesHandler(`${x._id}`)}
                          type="button"
                          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                        >
                          Delete
                        </Link>
                      </div>
                  </div>
                </div>
                <p className="mt-[15px]">{x.description}</p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default WorkoutPlan;

