import React from "react";
import { useState, useEffect } from "react";
import axiosInstance from "../axiosInstance";
import Lottie from "react-lottie";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faCirclePause } from "@fortawesome/free-solid-svg-icons";
import { faCircleStop } from "@fortawesome/free-solid-svg-icons";
import StaticModal from "./StaticModal";
import { Link } from "react-router-dom";
import { useParams } from "react-router-dom";
import useSound from "use-sound";
import countSound from "../assets/sounds/finalSound.mp3";
import { Button } from "flowbite-react";

const WorkoutPlayer = () => {
  const id = useParams();
  const version = useParams();
  const [workoutData, setWorkoutData] = useState(null);
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [remainingTime, setRemainingTime] = useState(0);
  const [remainingTimeInRest, setRemainingTimeInRest] = useState(0);
  const [isWorkoutStarted, setIsWorkoutStarted] = useState(false);
  const [isWorkoutPaused, setIsWorkoutPaused] = useState(false);
  const [isWorkoutFinished, setIsWorkoutFinished] = useState(false);
  const [isExerciseFinished, setIsExerciseFinished] = useState(false);
  const [animationData, setAnimationData] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [arrayEx, setArrayEx] = useState([]);
  const [planVersion, setPlanVersion] = useState(0);
  const [radioOpen,setRadioOpen] = useState(false);
  // new code
  useEffect(() => {
    console.log(version.version);
    if (version.version) {
      console.log(version.version);
      console.log("version found");
      setPlanVersion(version.version);
    }
  }, []);

  useEffect(() => {
    if (!workoutData) {
      return;
    }
    console.log(workoutData.planVersions[planVersion]);
    const ArrayofExer = workoutData.planVersions[planVersion].exercises;
    let newArrayEx = [];
    ArrayofExer.forEach((exer) => {
      if (exer.sets > 1) {
        for (let i = 0; i < exer.sets; i++) {
          newArrayEx.push(exer);
        }
      } else {
        newArrayEx.push(exer);
      }
    });
    setArrayEx(newArrayEx);
  }, [workoutData]);

  useEffect(() => {
    console.log(arrayEx);
  }, [arrayEx]);

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
    if (!workoutData && !arrayEx.length > 0) {
      return;
    }

    let restTimerId;
    console.log(arrayEx.length);
    if (
      isExerciseFinished &&
      currentExerciseIndex < arrayEx.length &&
      !isWorkoutPaused &&
      isWorkoutStarted
    ) {
      console.log("Relax time");
      if (remainingTimeInRest === 0) {
        setRemainingTimeInRest(
          workoutData.planVersions[planVersion].restDuration
        );
      }

      restTimerId = setInterval(() => {
        setRemainingTimeInRest((prevTime) => {
          if (prevTime === 3) {
            play();
          }
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
    if (!workoutData) {
      return;
    }
    let timerId;
    let exercisesLength = arrayEx.length;
    if (
      currentExerciseIndex < arrayEx.length &&
      !isExerciseFinished &&
      !isWorkoutPaused &&
      isWorkoutStarted
    ) {
      console.log(isWorkoutPaused);
      if (
        currentExerciseIndex < arrayEx.length &&
        !isExerciseFinished &&
        !isWorkoutPaused
      ) {
        if (remainingTime === 0 || isExerciseFinished) {
          setRemainingTime(arrayEx[currentExerciseIndex].duration);
        }
      }

      console.log(`after setRemainingTime, Time is : ${remainingTime}`);
      timerId = setInterval(() => {
        setRemainingTime((prevTime) => {
          console.log(`2. remainingTime is : ${remainingTime}`);
          if (prevTime === 3) {
            play();
          }
          if (prevTime === 1) {
            setIsExerciseFinished(true);
            setCurrentExerciseIndex((prevIndex) => prevIndex + 1);
            return arrayEx[currentExerciseIndex].duration; // Reset the timer
          }
          return prevTime - 1;
        });
      }, 1000);
    } else if (isExerciseFinished && currentExerciseIndex >= arrayEx.length) {
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

  const [play] = useSound(countSound);

  useEffect(() => {
    if(isWorkoutFinished){
      console.log('workout finished');
      console.log(isWorkoutFinished);
      const workoutSession = {
        finishedDate: new Date(),
        workoutId: id.id,
        version: planVersion,
        completed: currentExerciseIndex >= arrayEx.length,
        comments: [prompt("Please leave a comment")],
    };
  axiosInstance
.post("/api/workoutSession", workoutSession).then((res) => {console.log(res);
alert("New workout session created:" +
 `Date: ${workoutSession.finishedDate},Workout:${workoutData.name},Version:${workoutSession.version},Completed:${workoutSession.completed},Comments:${workoutSession.comments.join(",")}`)})
 .catch((err) => console.log(err));}
  }, [isWorkoutFinished]);

  const handleIFrameVisibility = ()=>{
    setRadioOpen((prev)=>!prev);
  }

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
                      className="group mb-5 flex items-center justify-center p-0.5 text-center font-medium relative focus:z-10 focus:outline-none text-white bg-cyan-700 border border-transparent enabled:hover:bg-cyan-800 focus:ring-cyan-300 dark:bg-cyan-600 dark:enabled:hover:bg-cyan-700 dark:focus:ring-cyan-800 rounded-lg focus:ring-2"
                    >
                      <span className="flex items-center transition-all duration-200 rounded-md text-sm px-4 py-2">
                        Return to Home Page
                      </span>
                    </Link>
                    <button
                      onClick={() => {
                        setIsWorkoutStarted(true);
                      }}
                      type="button"
                      className="group mb-5 flex items-center justify-center p-0.5 text-center font-medium relative focus:z-10 focus:outline-none text-white bg-cyan-700 border border-transparent enabled:hover:bg-cyan-800 focus:ring-cyan-300 dark:bg-cyan-600 dark:enabled:hover:bg-cyan-700 dark:focus:ring-cyan-800 rounded-lg focus:ring-2"
                    >
                      <span className="flex items-center transition-all duration-200 rounded-md text-sm px-4 py-2">
                        Start the Workout
                      </span>
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </section>
        </>
      ) : !isWorkoutFinished &&
        isWorkoutStarted &&
        workoutData.planVersions[planVersion] !== undefined ? (
        <section className="p-5 body-font dark:bg-gray-900 w-full">
          <Button onClick={handleIFrameVisibility}>
            {radioOpen ? "Close " : "Open "} radio
          </Button>
          <div className="iframe-container">
            
            <iframe
              className={`m-auto ${radioOpen ? "block" : "hidden"}`}
              width="853"
              height="480"
              src="https://www.youtube.com/embed/jwvd0sHj0w4"
              title="WORKOUT MUSIC 2023 🔥 POWERFUL HIPHOP TRAP &amp; BASS 🔥 GYM MOTIVATION MUSIC 2023 #44"
              frameBorder="0"
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture; web-share"
              allowFullScreen
            ></iframe>
          </div>

          <div
            className={
              isExerciseFinished
                ? "container gap-3 "
                : "container lg:flex gap-3"
            }
          >
            <div className="right_side flex gap-4 flex-col content-center justify-center mb-4  w-full h-full">
              <div className="mb-2 text-xl self-center">
                <p className=" text-gray-500 dark:text-gray-400">
                  {!isExerciseFinished
                    ? arrayEx[currentExerciseIndex].exercise.name
                    : "Rest time"}
                </p>
              </div>
              <div className="img m-0 flex-col self-center">
                {!isExerciseFinished ? (
                  <img
                    alt="exercise"
                    className=" sm:h-100 lg:h-auto h-100 object-cover object-center rounded"
                    src={arrayEx[currentExerciseIndex].exercise.image}
                  ></img>
                ) : animationData ? (
                  <Lottie options={defaultOptions} />
                ) : null}
              </div>
              <div className="flex justify-center text-gray-500 dark:text-gray-400">
                {!isExerciseFinished
                  ? `Weight: ${arrayEx[currentExerciseIndex].weights}`
                  : ""}
              </div>
            </div>
            <div className="left_side bottom panel flex flex-col justify-center w-full h-full gap-4 content-center items-center self-center">
              <div className="flex gap-6 justify-center">
                <button
                  onClick={handlePauseButton}
                  data-modal-target="default-modal"
                  data-modal-toggle="pause-modal"
                >
                  <FontAwesomeIcon
                    icon={faCirclePause}
                    className="h-10 text-gray-500 dark:text-gray-400"
                  />
                </button>
                <button
                  onClick={handlePauseButton}
                  data-modal-target="default-modal"
                  data-modal-toggle="pause-modal"
                  type="button"
                >
                  <FontAwesomeIcon
                    icon={faCircleStop}
                    className="h-10 text-gray-500 dark:text-gray-400"
                  />
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
                  className="text-gray-500 dark:text-gray-400"
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
              <div className="flex justify-center">
                <p className="text-gray-500 dark:text-gray-400">
                  Remaining time
                </p>
              </div>
              <div className="flex flex-col  justify-center self-center">
                <span className="countdown font-mono text-6xl ">
                  <span
                    className="text-gray-500 dark:text-gray-400 flex justify-center"
                    style={{
                      "--value": !isExerciseFinished
                        ? remainingTime
                        : remainingTimeInRest,
                    }}
                  ></span>
                </span>
              </div>
              <div className="side_panel">
                <div className="text-gray-500 dark:text-gray-400">
                  {!isExerciseFinished
                    ? `Description : ${arrayEx[currentExerciseIndex].exercise.description}`
                    : ""}
                </div>
                <div className="text-gray-500 dark:text-gray-400">
                  {currentExerciseIndex + 1 < arrayEx.length &&
                  !isExerciseFinished
                    ? `Next exercise: ${
                        arrayEx[currentExerciseIndex + 1].exercise.name
                      }`
                    : ""}
                </div>
              </div>
            </div>
          </div>
        </section>
      ) : (
        <>
          <section className="bg-gray-50 dark:bg-gray-900">
            <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
              <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
                <div className="flex flex-col items-center justify-center p-6 space-y-4 md:space-y-6 sm:p-8">
                  <h1 className="text-xl font-bold leading-tight tracking-tight md:text-2xl text-gray-500 dark:text-gray-400">
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
