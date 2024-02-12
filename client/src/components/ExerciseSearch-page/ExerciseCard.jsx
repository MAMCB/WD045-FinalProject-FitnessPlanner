import React from "react";
import { Button } from "flowbite-react";
import axiosInstance from "../../axiosInstance";
import { useState, useEffect } from "react";
import { AuthContext } from "../../context/Auth";
import { useContext } from "react";

const ExerciseCard = ({ exercise, user, addExercise,inPlan,remove,blocks}) => {
  const [exerciseSaved, setExerciseSaved] = useState(null);
  const [succesfullySaved, setSuccesfullySaved] = useState(false);
  const [inWorkoutPlan, setInWorkoutPlan] = useState(false);
  const context = useContext(AuthContext);
  
 

  useEffect(() => {
    
    if(!exerciseSaved)
    {
      return;
    } console.log("trying to save exercise");
    
      axiosInstance
        .post("/api/exercise", exerciseSaved)
        .then(() => setSuccesfullySaved(true))
        .catch((error) => console.log(error));
  }, [exerciseSaved]);

  useEffect(() => {
    if(!blocks)
    {
      return;
    }
    
      if (blocks.find((block) => block.exercise._id === exercise._id)) {
        setInWorkoutPlan(true);
      } else {
        setInWorkoutPlan(false);
      }

    
    
  }, [blocks]);

  const handleSave = () => {
    const newExercise = {
      userId: context.user._id,
      name: exercise.name.replace("/", "-"),
      image: exercise.gifUrl,
      muscleGroup: exercise.target,
      equipment: exercise.equipment,
      description: exercise.instructions.reduce((acc, curr) => acc + curr, ""),

    };

    setExerciseSaved((prev) => newExercise);
  };

  const handleExercise = () => {
    if (user) {
      setInWorkoutPlan(true);
      addExercise(exercise);
    }
  };

  const handleDelete = () => {
    remove();
  };
  return (
    <div className="flex h-full p-4 items-center justify-center bg-gray-400 dark:bg-gray-700 dark:text-white">
      <div
        className={
          user
            ? "max-w-4xl mt-4 flex-col bg-white rounded-xl"
            : "max-w-4xl mt-4 flex bg-white rounded-xl"
        }
      >
        <img
          src={user ? exercise.image : exercise.gifUrl}
          alt={exercise.name}
          className={user ? "w-48 h-48 rounded-xl m-auto" : "rounded-xl"}
        />
        <div className="m-5 bg-gray-100 dark:bg-black rounded-xl p-5">
          <h2 className="mt-2 text-xl font-bold">{exercise.name}</h2>
          <h4 className="mt-2">
            {user ? exercise.muscleGroup : exercise.target}
          </h4>
          <h4 className="mt-2">{exercise.equipment}</h4>
          <h4 className="mt-2">
            {user ? exercise.difficulty : exercise.bodyPart}
          </h4>
          {user ? (
            <p>{exercise.description}</p>
          ) : (
            exercise.instructions.map((instruction, index) => (
              <p className="mt-2" key={index}>
                {instruction}
              </p>
            ))
          )}
          {user ? (
            <Button
              className="w-1/2 self-center mt-4"
              onClick={inPlan ? handleDelete : handleExercise}
              disabled={inWorkoutPlan}
            >
              {inPlan ? "Delete from plan" : "Add to workout plan"}
            </Button>
          ) : (
            <Button
              className="w-1/2 self-center mt-4"
              onClick={handleSave}
              disabled={succesfullySaved}
            >
              Save to my exercises
            </Button>
          )}{" "}
          {succesfullySaved ? (
            <p className="mt-2">Exercise saved!</p>
          ) :  exerciseSaved ? (
            <div role="status">
              <svg
                aria-hidden="true"
                className="w-8 h-8 text-gray-200 animate-spin dark:text-gray-600 fill-blue-600 mt-3"
                viewBox="0 0 100 101"
                fill="none"
                xmlns="http://www.w3.org/2000/svg"
              >
                <path
                  d="M100 50.5908C100 78.2051 77.6142 100.591 50 100.591C22.3858 100.591 0 78.2051 0 50.5908C0 22.9766 22.3858 0.59082 50 0.59082C77.6142 0.59082 100 22.9766 100 50.5908ZM9.08144 50.5908C9.08144 73.1895 27.4013 91.5094 50 91.5094C72.5987 91.5094 90.9186 73.1895 90.9186 50.5908C90.9186 27.9921 72.5987 9.67226 50 9.67226C27.4013 9.67226 9.08144 27.9921 9.08144 50.5908Z"
                  fill="currentColor"
                />
                <path
                  d="M93.9676 39.0409C96.393 38.4038 97.8624 35.9116 97.0079 33.5539C95.2932 28.8227 92.871 24.3692 89.8167 20.348C85.8452 15.1192 80.8826 10.7238 75.2124 7.41289C69.5422 4.10194 63.2754 1.94025 56.7698 1.05124C51.7666 0.367541 46.6976 0.446843 41.7345 1.27873C39.2613 1.69328 37.813 4.19778 38.4501 6.62326C39.0873 9.04874 41.5694 10.4717 44.0505 10.1071C47.8511 9.54855 51.7191 9.52689 55.5402 10.0491C60.8642 10.7766 65.9928 12.5457 70.6331 15.2552C75.2735 17.9648 79.3347 21.5619 82.5849 25.841C84.9175 28.9121 86.7997 32.2913 88.1811 35.8758C89.083 38.2158 91.5421 39.6781 93.9676 39.0409Z"
                  fill="currentFill"
                />
              </svg>
              <span className="sr-only">Loading...</span>
            </div>
          ) : <></>}
        </div>
      </div>
    </div>
  );
};

export default ExerciseCard;
