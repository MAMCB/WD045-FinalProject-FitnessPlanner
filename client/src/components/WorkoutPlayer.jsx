import React from "react";
import { useState, useEffect } from "react";
import axiosInstance from "../axiosInstance";
import StopButton from "../assets/stop-button.png";
import PauseButton from "../assets/pause-button.png";
import { set } from "react-hook-form";

const WorkoutPlayer = () => {
  const [workoutData, setWorkoutData] = useState({});
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [remainingTime, setRemainingTime] = useState(0);
  const [remainingTimeInRest, setRemainingTimeInRest] = useState(0);
  const [isWorkoutStarted, setIsWorkoutStarted] = useState(false);
  const [isWorkoutPaused, setIsWorkoutPaused] = useState(false);
  const [isWorkoutFinished, setIsWorkoutFinished] = useState(false);
  const [isExerciseFinished, setIsExerciseFinished] = useState(false);

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
    if (
      isExerciseFinished &&
      currentExerciseIndex < workoutDataExample.exercises.length
    ) {
      setRemainingTimeInRest(workoutDataExample.restDuration);
      const restTimerId = setInterval(() => {
        setRemainingTimeInRest((prevTime) => {
          if (prevTime === 1) {
            setIsExerciseFinished(false);
            return () => clearInterval(restTimerId);
          }
          return prevTime - 1;
        });
      }, 1000); // 1000 ms = 1s
      return () => clearInterval(restTimerId);
    } else {
      setRemainingTimeInRest(0);
      console.log("Rest time finished");
    }
  }, [isExerciseFinished]);

  useEffect(() => {
    if (
      currentExerciseIndex < workoutDataExample.exercises.length &&
      !isExerciseFinished
    ) {
      setRemainingTime(workoutDataExample.exerciseDuration);
      const timerId = setInterval(() => {
        setRemainingTime((prevTime) => {
          if (prevTime === 1) {
            setIsExerciseFinished(true);
            setCurrentExerciseIndex((prevIndex) => prevIndex + 1);

            return workoutDataExample.exerciseDuration; // Reset the timer for the next exercise
          }
          console.log(prevTime);
          console.log(currentExerciseIndex);
          return prevTime - 1;
        });
      }, 1000);
      return () => clearInterval(timerId);
    } else if (
      isExerciseFinished &&
      currentExerciseIndex >= workoutDataExample.exercises.length
    ) {
      setRemainingTime(0);
      setIsWorkoutFinished(true);
      console.log("Workout finished");
    }
  }, [currentExerciseIndex, isExerciseFinished]);

  console.log(currentExerciseIndex > workoutDataExample.exercises.length);

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
        <section className="p-5 mx-auto body-font">
          <div className="container mx-auto flex">
            <div className="flex flex-col gap-2">
              <div className="buttons flex h-8 w-8 gap-3">
                <img src={PauseButton} alt="pause" />
                <img src={StopButton} alt="stop" />
              </div>
              <div>
                <p>
                  {!isExerciseFinished
                    ? workoutDataExample.exercises[currentExerciseIndex].name
                    : "Rest time"}
                </p>
              </div>
              <div className="img">
                <img
                  alt="exercise"
                  className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded"
                  /* src={workoutDataExample.exercises[currentExerciseIndex].image} */
                  src={
                    !isExerciseFinished
                      ? workoutDataExample.exercises[currentExerciseIndex].image
                      : "#"
                  }
                ></img>

                <div>
                  Remain time :
                  {!isExerciseFinished ? remainingTime : remainingTimeInRest}
                </div>
              </div>
              <div>
                Description :
                {!isExerciseFinished
                  ? workoutDataExample.exercises[currentExerciseIndex].description
                  : "Relax"}
              </div>
              <div className="side panel">
                <p>Next:</p>
              </div>
            </div>
            <div className="bottom panel"></div>
          </div>
        </section>
      ) : (
        <div>Workout Finished!</div>
      )}
    </>
  );
};

export default WorkoutPlayer;
