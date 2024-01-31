import React from "react";
import { useState, useEffect } from "react";
import axiosInstance from "../axiosInstance";
import StopButton from "../assets/stop-button.png";
import PauseButton from "../assets/pause-button.png";
import Lottie from "react-lottie";
import { set } from "react-hook-form";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePause } from "@fortawesome/free-solid-svg-icons";
import { faCircleStop } from "@fortawesome/free-solid-svg-icons";
import StaticModal from "./StaticModal";
import { Link } from "react-router-dom";

const WorkoutPlayer = () => {
  const [workoutData, setWorkoutData] = useState({});
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [remainingTime, setRemainingTime] = useState(0);
  const [remainingTimeInRest, setRemainingTimeInRest] = useState(0);
  const [isWorkoutStarted, setIsWorkoutStarted] = useState(false);
  const [isWorkoutPaused, setIsWorkoutPaused] = useState(false);
  const [isWorkoutFinished, setIsWorkoutFinished] = useState(false);
  const [isExerciseFinished, setIsExerciseFinished] = useState(false);
  const [animationData, setAnimationData] = useState(null);

  const workoutPlanId = "60f9b4b3c9b9a40015f3b3b2";

  /*   useEffect(() => {
    axiosInstance
      .get(
        import.meta.env.VITE_SERVER_BASE_URL +
          `/api/workoutPlan/${workoutPlanId}`
      )
      .then((res) => {
        const workoutData = res.data;
        console.log(workoutData);
        setWorkoutData(workoutData);
      })
      .catch((err) => console.log("Error:", err));
  }, []); */

  useEffect(() => {
    fetch(
      "https://lottie.host/edf49211-6085-401c-9540-ac81a70fc343/kjQThkC4yK.json"
    )
      .then((response) => response.json())
      .then((data) => setAnimationData(data));
  }, []);

  const defaultOptions = {
    loop: true,
    autoplay: true,
    animationData: animationData,
    rendererSettings: {
      preserveAspectRatio: "xMidYMid",
    },
  };

  // example of workout data :

  const workoutDataExample = {
    userId: "60d6c7e160b3f2c8c7e35d7a",
    name: "Workout Plan 1",
    goal: "Muscle Gain",
    difficulty: 5,
    image:
      "https://freepngimg.com/thumb/hand/76374-fitness-logo-vector-creative-download-hd-png.png",
    equipment: true,
    type: "Cardio",
    visibility: true,
    rating: 4.5,
    exercises: [
      {
        equipment: "leverage machine",
        image: "https://v2.exercisedb.io/image/ocPU7YLtlQTGXe",
        id: "0002",
        name: "lever seated hip adduction",
        muscleGroup: "adductors",
        description:
          "Adjust the seat height and position yourself on the machine with your back against the backrest.Place your feet on the footrests and grasp the handles for stability.Engage your adductor muscles and slowly bring your legs together, squeezing your inner thighs.Pause for a moment at the peak contraction, then slowly return to the starting position.Repeat for the desired number of repetitions.",
      },
      {
        equipment: "body weight",
        image: "https://v2.exercisedb.io/image/iF0rL7-HK5vaK5",
        id: "0001",
        name: "butterfly yoga pose",
        muscleGroup: "adductors",
        secondaryMuscles: ["hip flexors", "lower back"],
        description:
          "Sit on the floor with your legs extended in front of you.Bend your knees and bring the soles of your feet together, allowing your knees to fall out to the sides.Hold onto your ankles or feet with your hands.Sit up tall and lengthen your spine.Gently press your knees down towards the floor, feeling a stretch in your inner thighs.Hold this position for a few breaths.To release, slowly bring your knees back up and extend your legs.",
      },
    ],
    exerciseDuration: 10,
    restDuration: 5,
    createdDay: new Date(),
  };

  useEffect(() => {
    let restTimerId;
    if (
      isExerciseFinished &&
      currentExerciseIndex < workoutDataExample.exercises.length &&
      !isWorkoutPaused
    ) {
      console.log("Relax time");
      setRemainingTimeInRest(workoutDataExample.restDuration);
      restTimerId = setInterval(() => {
        setRemainingTimeInRest((prevTime) => {
          if (prevTime === 1) {
            setIsExerciseFinished(false);
            clearInterval(restTimerId);
          }
          return prevTime - 1;
        });
      }, 1000);
    } else if (!isExerciseFinished) {
      setRemainingTimeInRest(0);
      console.log("Rest time finished");
    }
    return () => clearInterval(restTimerId);
  }, [isExerciseFinished, isWorkoutPaused]);

  useEffect(() => {
    let timerId;
    if (
      currentExerciseIndex < workoutDataExample.exercises.length &&
      !isExerciseFinished &&
      !isWorkoutPaused
    ) {
      setRemainingTime(workoutDataExample.exerciseDuration);
      timerId = setInterval(() => {
        setRemainingTime((prevTime) => {
          if (prevTime === 1) {
            setIsExerciseFinished(true);
            setCurrentExerciseIndex((prevIndex) => prevIndex + 1);

            return workoutDataExample.exerciseDuration; // Reset the timer
          }
          return prevTime - 1;
        });
      }, 1000);
    } else if (
      isExerciseFinished &&
      currentExerciseIndex >= workoutDataExample.exercises.length
    ) {
      setRemainingTime(0);
      setIsWorkoutFinished(true);
      console.log("Workout finished");
    }
    return () => clearInterval(timerId);
  }, [currentExerciseIndex, isExerciseFinished, isWorkoutPaused]);

  const dataForPauseModel = {
    modal_id: "pause-modal",
    modal_title: "Pause workout",
    modal_description: "Your workout is paused",
    isButtonOne: true,
    isButtonTwo: true,
    nameBtnOne: "Return to workout",
    nameBtnTwo: "End workout",
    setIsButtonOneClicked: setIsWorkoutPaused,
    setIsButtonTwoClicked: setIsWorkoutFinished,
    setIsModalClosed: setIsWorkoutPaused,
  };

  const dataForStopModel = {
    modal_id: "stop-modal",
    modal_title: "Stop workout",
    modal_description: "Your workout is stopped",
    isButtonOne: true,
    isButtonTwo: true,
    nameBtnOne: "Return to workout",
    nameBtnTwo: "End workout",
    setIsButtonOneClicked: setIsWorkoutPaused,
    setIsButtonTwoClicked: setIsWorkoutFinished,
    setIsModalClosed: setIsWorkoutPaused,
  };

  const handlePauseButton = () => {
    console.log("Pause button clicked");
    console.log(isWorkoutPaused);
    setIsWorkoutPaused(!isWorkoutPaused);
  };

  // function to start the timer
  // function to pause the timer
  // function to stop the timer
  // function to skip to the next exersice
  // function to go back to the previous exersice
  // function to restart the workout
  // function to end the workout
  // next button
  // previous button exersice
  // music button to play music
  // sound button to mute the sound
  // timer
  // how much repids required

  return (
    <>
      {!isWorkoutFinished ? (
        <section className="p-5 mx-auto body-font  dark:bg-gray-900">
          <div className="container mx-auto flex flex-col ">
            <div className="flex space-x-3 mb-4">
              <button
                onClick={handlePauseButton}
                data-modal-target="default-modal"
                data-modal-toggle="pause-modal"
              >
                <FontAwesomeIcon icon={faCirclePause} className="h-10" />
              </button>
              <button
                onClick={handlePauseButton}
                data-modal-target="default-modal"
                data-modal-toggle="pause-modal"
                type="button"
              >
                <FontAwesomeIcon icon={faCircleStop} className="h-10" />
              </button>

              {/*               <StaticModal
                modal_id="pause-modal"
                modal_title="Pause workout"
                modal_description="Your workout is paused"
                nameBtnOne="Return to workout"
                nameBtnTwo="End workout"
                setIsWorkoutPaused={setIsWorkoutPaused}
                setIsWorkoutFinished={setIsWorkoutFinished}
              /> */}

              <div
                id={dataForPauseModel.modal_id}
                data-modal-backdrop="static"
                tabIndex="-1"
                aria-hidden="true"
                className="hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
              >
                <div className="relative p-4 w-full max-w-2xl max-h-full">
                  <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
                    <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600">
                      <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                        {dataForPauseModel.modal_title}
                      </h3>
                      <button
                        type="button"
                        data-modal-hide={dataForPauseModel.modal_id}
                        className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
                      >
                        <svg
                          className="w-3 h-3"
                          aria-hidden="true"
                          xmlns="http://www.w3.org/2000/svg"
                          fill="none"
                          viewBox="0 0 14 14"
                        >
                          <path
                            stroke="currentColor"
                            strokeLinecap="round"
                            strokeLinejoin="round"
                            strokeWidth="2"
                            d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                          />
                        </svg>
                        <span className="sr-only">Close modal</span>
                      </button>
                    </div>

                    <div className="p-4 md:p-5 space-y-4">
                      {dataForPauseModel.modal_description}
                    </div>

                    <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                      <button
                        onClick={dataForPauseModel.handleButtonOne}
                        data-modal-hide="static-modal"
                        type="button"
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      >
                        {dataForPauseModel.nameBtnOne}
                      </button>
                      <button
                        data-modal-hide="static-modal"
                        type="button"
                        className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                      >
                        {dataForPauseModel.nameBtnTwo}
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="mb-2">
              <p>
                {!isExerciseFinished
                  ? workoutDataExample.exercises[currentExerciseIndex].name
                  : "Rest time"}
              </p>
            </div>
            <div className="img">
              {!isExerciseFinished ? (
                <img
                  alt="exercise"
                  className="lg:w-1/2 w-full sm:h-100 lg:h-auto h-100 object-cover object-center rounded"
                  src={workoutDataExample.exercises[currentExerciseIndex].image}
                ></img>
              ) : animationData ? (
                <Lottie options={defaultOptions} />
              ) : null}
              <div>
                Remain time :
                {!isExerciseFinished ? remainingTime : remainingTimeInRest}
              </div>
            </div>
            <div className="flex flex-col">
              <div>
                {!isExerciseFinished
                  ? `Description : ${workoutDataExample.exercises[currentExerciseIndex].description}`
                  : ""}
              </div>
              <div className="side panel">
                <p>
                  {currentExerciseIndex + 1 <
                    workoutDataExample.exercises.length && !isExerciseFinished
                    ? `Next exercise: ${
                        workoutDataExample.exercises[currentExerciseIndex + 1]
                          .name
                      }`
                    : ""}
                </p>
              </div>
            </div>

            <div className="bottom panel"></div>
          </div>
        </section>
      ) : (
        <>
          <section className="bg-gray-50 dark:bg-gray-900">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
              <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                <div className="flex flex-col items-center justify-center p-6 space-y-4 md:space-y-6 sm:p-8">
                  <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                    Workout is finished
                  </h1>
                  <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                    <Link
                      to="/"
                      className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      Return to Home Page
                    </Link>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </>
      )}
    </>
  );
};

export default WorkoutPlayer;
