("use client");
import React from "react";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/Auth";
import axios from "../axiosInstance";
import axiosInstance from "../axiosInstance";
import ExercisesModel from "./ExercisesModel";
import { useNavigate } from "react-router-dom";
import Loading from "./Loading";
import { Button } from "flowbite-react";

const TemplateStore = () => {
  const [workoutPlans, setWorkoutPlans] = useState([]);
  const [workoutOwners, setWorkoutOwners] = useState([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [ExersiseImModal, setExersiseImModal] = useState(null);
  const [animationLoading, setAnimationLoading] = useState(true);
  const navigate = useNavigate();

  const context = useContext(AuthContext);

    useEffect(() => {
      setTimeout(function () {
        setAnimationLoading(false);
      }, 2500);
    }, []);

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

  const handleViewExercises = (id) => {
    const workout = workoutPlans.find((workout) => workout._id === id);
    setExersiseImModal(workout);
    setIsModalOpen(true);
  };

  const handleAddWorkout = (id) => {
    const workoutToAdd = workoutPlans.find((workout) => workout._id === id);

    const newWorkoutPlan = {
      name: workoutToAdd.name,
      goal: workoutToAdd.goal,
      restDuration: workoutToAdd.restDuration,
      exerciseDuration: workoutToAdd.exerciseDuration,
      visibility: false,
      exercises: workoutToAdd.exercises,
    };

    axiosInstance.post("/api/workoutPlan", newWorkoutPlan).then((res) => {
      alert("Workout plan saved successfully");
      navigate("/workoutPlan");
    });

    console.log("Add workout");
  };

  return animationLoading ? (
    <div className="flex items-center h-screen justify-center justify-self-center content-center self-center place-content-center place-items-center place-self-center">
      <Loading width="250px" />
    </div>
  ) : (
    <section className="text-gray-600 body-font px-[40px]">
      <div className="container px-1 py-12 mx-auto ">
        <div className="flex flex-wrap -m-2 gap-4 justify-center justify-items-center ">
          {workoutPlans.map((workout, index) => (
            <div
              key={index}
              className=" bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 lg:w-1/5 md:w-1/3 p-2 w-full flex flex-col justify-between"
            >
              <div className="block relative h-48 rounded overflow-hidden cursor-pointer">
                <img
                  className="rounded-t-lg object-cover object-center w-full h-full block"
                  src={workout.image}
                  alt=""
                />
              </div>
              <div className="p-5 flex-col justify-self-center">
                <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white cursor-pointer">
                  {workout.name}
                </h5>

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
              </div>
              <div className="flex flex-row justify-center gap-2 align-middle justify-self-center justify-start md:justify-center">
                <Button onClick={() => handleViewExercises(workout._id)}>
                  View exercises
                </Button>
                <Button onClick={() => handleAddWorkout(workout._id)}>
                  Add workout
                </Button>
              </div>
            </div>
          ))}
        </div>

        {isModalOpen && (
          <ExercisesModel
            setIsModalOpn={setIsModalOpen}
            workoutExer={ExersiseImModal}
          />
        )}
      </div>
    </section>
  );
};

export default TemplateStore;
