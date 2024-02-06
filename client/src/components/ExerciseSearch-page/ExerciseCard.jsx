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
        <div className="ml-5 bg-gray-100 dark:bg-black rounded-xl p-5">
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
              onClick={inPlan?handleDelete:handleExercise}
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
          )}
          {succesfullySaved && <p className="mt-2">Exercise saved!</p>}
        </div>
      </div>
    </div>
  );
};

export default ExerciseCard;
