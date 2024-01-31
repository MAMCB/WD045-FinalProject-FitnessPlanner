import React from "react";
import { useState, useEffect } from "react";
import axiosInstance from "../axiosInstance";
import StopButton from "../assets/stop-button.png";
import PauseButton from "../assets/pause-button.png";

const WorkoutPlayer = () => {
  const [workoutData, setWorkoutData] = useState({});
  const [currentExerciseIndex, setCurrentExerciseIndex] = useState(0);
  const [remainingTime, setRemainingTime] = useState(0);

  const workoutPlanId = "60f9b4b3c9b9a40015f3b3b2";

  useEffect(() => {
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
  }, []);

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
        bodyPart: "waist",
        equipment: "body weight",
        gifUrl: "https://v2.exercisedb.io/image/q7jU65ylp1U00N",
        id: "0002",
        name: "45° side bend",
        target: "abs",
        secondaryMuscles: ["obliques"],
        instructions: [
          "Stand with your feet shoulder-width apart and your arms extended straight down by your sides.",
          "Keeping your back straight and your core engaged, slowly bend your torso to one side, lowering your hand towards your knee.",
          "Pause for a moment at the bottom, then slowly return to the starting position.",
          "Repeat on the other side.",
          "Continue alternating sides for the desired number of repetitions.",
        ],
      },
      {
        bodyPart: "waist",
        equipment: "body weight",
        gifUrl: "https://v2.exercisedb.io/image/O7Wt-wHdMcZLmf",
        id: "0001",
        name: "3/4 sit-up",
        target: "abs",
        secondaryMuscles: ["hip flexors", "lower back"],
        instructions: [
          "Lie flat on your back with your knees bent and feet flat on the ground.",
          "Place your hands behind your head with your elbows pointing outwards.",
          "Engaging your abs, slowly lift your upper body off the ground, curling forward until your torso is at a 45-degree angle.",
          "Pause for a moment at the top, then slowly lower your upper body back down to the starting position.",
          "Repeat for the desired number of repetitions.",
        ],
      },
    ],
    exerciseDuration: 30,
    restDuration: 10,
    createdDay: new Date(),
  };

useEffect(() => {
  setRemainingTime(workoutDataExample.exerciseDuration);
  const timerId = setInterval(() => {
    setRemainingTime((prevTime) => {
      if (prevTime === 1) {
        setCurrentExerciseIndex((prevIndex) => prevIndex + 1);
        return workoutDataExample.exerciseDuration; // Reset the timer for the next exercise
      }
      return prevTime - 1;
    });
  }, 1000);

  return () => clearInterval(timerId);
}, [currentExerciseIndex]);

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
      <section className="p-5 mx-auto body-font">
        <div className="container mx-auto flex">
          <div className="flex flex-col gap-2">
            <div className="buttons flex h-8 w-8 gap-3">
              <img src={PauseButton} alt="pause" />
              <img src={StopButton} alt="stop" />
            </div>
            <div>
              <p
                className={
                  workoutDataExample.exercises[currentExerciseIndex].name
                }
              ></p>
            </div>
            <div className="img">
              <img
                alt="exercise"
                className="lg:w-1/2 w-full lg:h-auto h-64 object-cover object-center rounded"
                src="https://dummyimage.com/400x400"
              ></img>

              <div>Remain time : {remainingTime}</div>
            </div>
            <div className="side panel">
              <p>Next:</p>
            </div>
          </div>
          <div className="bottom panel"></div>
        </div>
      </section>
    </>
  );
};

export default WorkoutPlayer;
