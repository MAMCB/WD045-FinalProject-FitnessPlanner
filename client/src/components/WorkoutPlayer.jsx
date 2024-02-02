import React from "react";
import { useState, useEffect, useRef } from "react";
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
import { useParams } from "react-router-dom";

const WorkoutPlayer = () => {
  const id = useParams();
  const [workoutData, setWorkoutData] = useState({});
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [remainingTime, setRemainingTime] = useState(0);
  const [remainingTimeInRest, setRemainingTimeInRest] = useState(0);
  const [isWorkoutStarted, setIsWorkoutStarted] = useState(false);
  const [isWorkoutPaused, setIsWorkoutPaused] = useState(false);
  const [isWorkoutFinished, setIsWorkoutFinished] = useState(false);
  const [isExerciseFinished, setIsExerciseFinished] = useState(false);
  const [animationData, setAnimationData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    axiosInstance
      .get(`/api/workoutPlan/${id.id}`)
      .then((res) => {
        setWorkoutData(res.data);
        console.log(res.data);
      })
      .catch((err) => console.log("Error:", err));
  }, []);

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
      preserveAspectRatio: "xMidYMid slice",
    },
  };

  useEffect(() => {
    let restTimerId;
    if (
      isExerciseFinished &&
      currentExerciseIndex < workoutData?.exercises?.length &&
      !isWorkoutPaused &&
      isWorkoutStarted
    ) {
      console.log("Relax time");
      setRemainingTimeInRest(workoutData.restDuration);
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
    console.log(`currentExerciseIndex is : ${currentExerciseIndex}`);
    console.log(`isExerciseFinished is : ${isExerciseFinished}`);
    console.log(`isWorkoutPaused is : ${isWorkoutPaused}`);
    console.log(`isWorkoutStarted is : ${isWorkoutStarted}`);
    console.log(`1. remainingTime is : ${remainingTime}`);
    let timerId;
    if (
      currentExerciseIndex < workoutData?.exercises?.length &&
      !isExerciseFinished &&
      !isWorkoutPaused &&
      isWorkoutStarted
    ) {
      setRemainingTime(workoutData.exercises[currentExerciseIndex].duration);
      console.log(`after setRemainingTime, Time is : ${remainingTime}`);
      timerId = setInterval(() => {
        setRemainingTime((prevTime) => {
          console.log(`2. remainingTime is : ${remainingTime}`);
          if (prevTime === 1) {
            setIsExerciseFinished(true);
            console.log("Exercise finished");
            setCurrentExerciseIndex((prevIndex) => {
              const newIndex = prevIndex + 1;
              console.log(`3. remainingTime is : ${remainingTime}`);
              if (newIndex < workoutData.exercises.length) {
                setRemainingTime(workoutData.exercises[newIndex].duration); // Reset the timer
              }
              return newIndex;
            });
          }
          return prevTime - 1;
        });
      }, 1000);
    } else if (
      isExerciseFinished &&
      currentExerciseIndex >= workoutData.exercises.length 
    ) {
      setRemainingTime(0);
      setIsWorkoutFinished(true);
      console.log("exercise finished");
    }
    return () => clearInterval(timerId);
  }, [
    currentExerciseIndex,
    isExerciseFinished,
    isWorkoutPaused,
    isWorkoutStarted,
  ]);

  const handlePauseButton = () => {
    setIsModalOpen(true);
    console.log("Pause button clicked");
    console.log(isWorkoutPaused);
    setIsWorkoutPaused(true);
  };

  // next button
  // music button to play music
  // sound button to mute the sound
  // timer
  // how much repids required

  return (
    <>
      {!isWorkoutStarted ? (
        <>
          <section className="bg-gray-50 dark:bg-gray-900">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
              <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                <div className="flex flex-col items-center justify-center p-6 space-y-4 md:space-y-6 sm:p-8">
                  <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                    Are you ready to start?
                  </h1>
                  <div className="flex items-center p-4 gap-3 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                    <Link
                      to="/"
                      className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      Return to Home Page
                    </Link>
                    <button
                      onClick={() => {
                        setIsWorkoutStarted(true);
                      }}
                      type="button"
                      className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                    >
                      Start the Workout
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </>
      ) : !isWorkoutFinished && isWorkoutStarted ? (
        <section className="p-5 mx-auto body-font dark:bg-gray-900 min-h-100">
          <div className="container mx-auto flex flex-col gap-3 h-full">
            <div className="flex  mb-4 gap-2">
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

              <StaticModal
                modal_id="pause-modal"
                modal_title="Pause workout"
                modal_description="Your workout is paused"
                nameBtnOne="Return to workout"
                nameBtnTwo="End workout"
                setIsWorkoutPaus={setIsWorkoutPaused}
                setIsWorkoutFin={setIsWorkoutFinished}
                setIsModalOp={setIsModalOpen}
                isModalOpen={isModalOpen}
                setIsWorkoutStarted={setIsWorkoutStarted}
              />

              <StaticModal
                modal_id="stop-modal"
                modal_title="Stop workout"
                modal_description="Your workout is stopped"
                nameBtnOne="Return to workout"
                nameBtnTwo="End workout"
                setIsWorkoutPaus={setIsWorkoutPaused}
                setIsWorkoutFin={setIsWorkoutFinished}
                setIsModalOp={setIsModalOpen}
                isModalOpen={isModalOpen}
                setIsWorkoutStarted={setIsWorkoutStarted}
              />
            </div>

            <div className="mb-2">
              <p>
                {!isExerciseFinished
                  ? workoutData.exercises[currentExerciseIndex].exercise.name
                  : "Rest time"}
              </p>
            </div>
            <div className="img max-w-[500px] max-h-[500px] m-auto">
              {!isExerciseFinished ? (
                <img
                  alt="exercise"
                  className="lg:w-1/2 w-full sm:h-100 lg:h-auto h-100 object-cover object-center rounded"
                  src={
                    workoutData.exercises[currentExerciseIndex].exercise.image
                  }
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
                  ? `Description : ${workoutData.exercises[currentExerciseIndex].exercise.description}`
                  : ""}
              </div>
              <div className="side panel">
                <p>
                  {currentExerciseIndex + 1 < workoutData.exercises.length &&
                  !isExerciseFinished
                    ? `Next exercise: ${
                        workoutData.exercises[currentExerciseIndex + 1].exercise
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
