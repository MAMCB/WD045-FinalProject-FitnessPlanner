("use client");
import React from "react";
import axios from "../axiosInstance";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/Auth";
import { Accordion } from "flowbite-react";
import { Link, useParams, useNavigate } from "react-router-dom";
import { Select,Button } from "flowbite-react";
import SessionCalendar from "./SessionCalendar";
import axiosInstance from "../axiosInstance";

const WorkoutPlan = () => {
  const [workout, setWorkout] = useState([]);
  const [workoutVersion, setWorkoutVersion] = useState([]);
  const [workoutSessions, setWorkoutSessions] = useState([]);
  const [userExercise, setUserExercise] = useState([]);
  const [testing, setTesting] = useState(false);

  const context = useContext(AuthContext);
  const navigate = useNavigate();
  
  console.log(workout)
  useEffect(() => {
    console.log(workoutVersion)},[workoutVersion])

    useEffect(() => {
      axios
      .get("/api/workoutSession")
      .then((res) => setWorkoutSessions(res.data))
      .catch((e) => console.error(e));
  }, []);

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

  useEffect(() => {
    setWorkoutVersion([...Array(workout.length).fill(0)])
  }, [workout])

  const deleteWorkoutTask = (id) =>{
    setWorkout((state)=>(state.filter(x=> x._id !== id)))
  }

  const deleteExerciseTask = (id) =>{
    setUserExercise((state)=>(state.filter(x=>x._id !== id)))
  }

  const deleteHandler = (id) =>{
    if(!confirm("Are you sure you want to delete this workout plan?") ) return;
    axios.delete(`/api/workoutPlan/${id}`)
    .then(res=> navigate(`/workoutPlan`))
    .catch(e=>console.error(e))
    deleteWorkoutTask(id)
}

console.log(workout)

const deleteHandlerExercises = (id) =>{
  if(!confirm("Are you sure you want to delete this exercise?") ) return;
  axios.delete(`/api/exercise/${id}`)
  .then(res=> navigate(`/workoutPlan`))
  .catch(e=>console.error(e))
  deleteExerciseTask(id)
 
}

const handleVersionChange = (index) => (e) => {
  console.log(e.target.value)
  console.log(index)
  const newVersion = [...workoutVersion]
  newVersion[index] = Number(e.target.value)
  setWorkoutVersion(newVersion)
  ;}

  const createNewVersion = (index) => ()=>{
    console.log("creating new version")
    console.log(workout[index])
    const newVersion = {
      ...workout[index],
      exercises: workout[index].planVersions[
        workout[index].planVersions.length - 1
      ].exercises.map((x) => {
        const newWeights = prompt(`Set weights for ${x.exercise.name}`);
        const weights = newWeights !== null ? newWeights : x.weights;
        return { ...x, weights };
      }),
    };
   
    console.log(newVersion)
    axios
      .put(`/api/workoutPlan/${workout[index]._id}/version`, newVersion)
      .then((res) => {console.log(res)
      alert("New version created")
    window.location.reload()})
      .catch((e) => console.error(e));
  }

  const sessionTester = (id,year,monthIndex,day) => {
    const newSession = {
      workoutId: id,
      name:"TestSession",
      finishedDate: new Date(year,monthIndex,day+1),
      completed: false,
      version:0
    }
    axiosInstance
.post("/api/workoutSession", newSession).then((res) => {console.log(res);
alert("New workout session created:" +
 `Date: ${newSession.finishedDate},Workout:${newSession.name},Version:${newSession.version},Completed:${newSession.completed}`)})
 .catch((err) => console.log(err));
  }

 

  return (
    <div className="w-[100%] bg-white shadow dark:bg-gray-900 py-[100px]">
      <div className="flex px-[20px] flex-wrap justify-between">
        <div className='w-[100%] lg:w-[49%] m-[5px]'>
          <h2 className="text-xl mb-3  text-gray-500 dark:text-gray-400">Your Workout plans</h2>
          {workout.map((workout,index) => {
            return (
              <div key={workout._id}>
                <div className="mb-[20px] bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700">
                  <div className="flex flex-col md:flex-row">
                    <div className="w-[96%] md:w-2/4 bg-white border border-gray-200 rounded-lg dark:bg-gray-800 p-10 dark:border-gray-700 m-[10px]">
                      <img
                        className="rounded-lg object-contain"
                        src={workout.image}
                        alt="workout img"
                      />
                    </div>
                    <div className="w-[96%] md:w-2/4 bg-white border border-gray-200 rounded-lg dark:bg-gray-800 p-10 dark:border-gray-700 m-[10px]">
                      <p className=" text-gray-500 dark:text-gray-400">
                        Workout Name: {workout.name}
                      </p>
                      <p className=" text-gray-500 dark:text-gray-400">
                        Goal: {workout.goal}
                      </p>
                      <p className=" text-gray-500 dark:text-gray-400">
                        Difficulty: {workout.difficulty}
                      </p>
                      <p className=" text-gray-500 dark:text-gray-400">
                        Rating: {workout.rating}
                      </p>
                      <div className="mt-4">
                        <Link
                          to={`/workoutPlayer/${workout._id}/${workoutVersion[index]}`}
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
                          onClick={() => deleteHandler(`${workout._id}`)}
                          type="button"
                          className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none dark:focus:ring-red-800"
                        >
                          Delete
                        </Link>
                        <Select
                          className="mb-2"
                          onChange={handleVersionChange(index)}
                          value={workoutVersion[index]}
                        >
                          <option>Choose a plan</option>
                          {workout.planVersions.map((x, i) => (
                            <option key={Math.random() * 100} value={Number(i)}>
                              {x.name}
                            </option>
                          ))}
                        </Select>
                        <Button
                          onClick={createNewVersion(index)}
                          className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800"
                        >
                          Create new Version
                        </Button>
                      </div>
                    </div>
                  </div>
                  {workout.exercises.map((x) => {
                    return (
                      <div key={x.exercise._id}>
                        <Accordion collapseAll className="m-[10px]">
                          <Accordion.Panel className="m-[10px]">
                            <Accordion.Title>
                              <span className="font-bold  text-gray-500 dark:text-gray-400">
                                Exercise name:
                              </span>{" "}
                              {x.exercise.name}
                            </Accordion.Title>
                            <Accordion.Content>
                              <div className="flex">
                                <div className="w-[60%] bg-white border border-gray-200 rounded-lg dark:bg-gray-800 p-2 dark:border-gray-700 m-[10px]">
                                  <img
                                    className="rounded-lg object-fill"
                                    src={x.exercise.image}
                                    alt="exercise-image"
                                  />
                                </div>
                                <ul className="w-[40%] bg-white border border-gray-200 rounded-lg dark:bg-gray-800 p-3 dark:border-gray-700 m-[10px]">
                                  <li className=" text-gray-500 dark:text-gray-400">
                                    <span className="font-bold">
                                      Equipment:
                                    </span>{" "}
                                    {x.exercise.equipment}
                                  </li>
                                  <li className=" text-gray-500 dark:text-gray-400">
                                    <span className="font-bold">
                                      Difficulty:
                                    </span>{" "}
                                    {x.exercise.difficulty}
                                  </li>
                                  <li className=" text-gray-500 dark:text-gray-400">
                                    <span className="font-bold">
                                      Muscle Group:
                                    </span>{" "}
                                    {x.exercise.muscleGroup}
                                  </li>
                                  <li className=" text-gray-500 dark:text-gray-400">
                                    <span className="font-bold">Rating:</span>{" "}
                                    {x.exercise.rating}
                                  </li>
                                  <li className=" text-gray-500 dark:text-gray-400">
                                    <span className="font-bold">Sets:</span>{" "}
                                    {x.sets}
                                  </li>
                                  <li className=" text-gray-500 dark:text-gray-400">
                                    <span className="font-bold">Duration:</span>{" "}
                                    {x.duration}
                                  </li>
                                  <li className=" text-gray-500 dark:text-gray-400">
                                    <span className="font-bold">Weights:</span>{" "}
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
                {testing && (
                  <Button
                    onClick={() => sessionTester(workout._id, 2024, 1, 1)}
                  >
                    Create Session
                  </Button>
                )}
                <SessionCalendar
                  workoutSessions={workoutSessions.filter(
                    (session) => session.workoutId === workout._id && session
                  )}
                />
              </div>
            );
          })}
        </div>
        <div className="w-[100%] lg:w-[49%] m-[5px]">
          <h2 className=" mb-3 text-xl text-gray-500 dark:text-gray-400">Your exercises</h2>
          {userExercise.map((x) => {
            return (
              <div
                key={x._id}
                className="p-[10px] mb-[15px] bg-white border border-gray-200 rounded-lg dark:bg-gray-800 dark:border-gray-700"
              >
                <div className="flex flex-col md:flex-row">
                  <div className="w-[96%] md:w-2/4 h-[300px] mr-[10px] bg-white border border-gray-200 p-4 rounded-lg dark:bg-gray-800 dark:border-gray-700">
                    <img
                      className="w-full h-full rounded-lg object-fill"
                      src={x.image}
                      alt="exercise image"
                    />
                  </div>
                  <div className="w-[96%] md:w-2/4 bg-white border border-gray-200 p-4 rounded-lg dark:bg-gray-800 dark:border-gray-700">
                    <p className=" text-gray-500 dark:text-gray-400">
                      <span className="font-bold  text-gray-500 dark:text-gray-400">
                        Exercises Name:{" "}
                      </span>
                      {x.name}
                    </p>
                    <p className="text-gray-500 dark:text-gray-400">
                      <span className="font-bold  text-gray-500 dark:text-gray-400">
                        Equipment:{" "}
                      </span>
                      {x.equipment}
                    </p>
                    <p className="text-gray-500 dark:text-gray-400">
                      <span className="font-bold  text-gray-500 dark:text-gray-400">
                        Difficulty:{" "}
                      </span>
                      {x.difficulty}
                    </p>
                    <p className="text-gray-500 dark:text-gray-400">
                      <span className="font-bold  text-gray-500 dark:text-gray-400">
                        Muscle Group:{" "}
                      </span>
                      {x.muscleGroup}
                    </p>
                    <p className="text-gray-500 dark:text-gray-400">
                      <span className="font-bold  text-gray-500 dark:text-gray-400">
                        Rating:{" "}
                      </span>
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
                        onClick={() => deleteHandlerExercises(`${x._id}`)}
                        type="button"
                        className="text-white bg-red-700 hover:bg-red-800 focus:ring-4 focus:ring-red-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-red-600 dark:hover:bg-red-700 focus:outline-none dark:focus:ring-red-800"
                      >
                        Delete
                      </Link>
                    </div>
                  </div>
                </div>
                <p className="mt-[15px] text-gray-500 dark:text-gray-400">
                  {x.description}
                </p>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};

export default WorkoutPlan;

