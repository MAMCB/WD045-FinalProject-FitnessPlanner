import React from 'react'
import { Button } from 'flowbite-react'
import axiosInstance from '../axiosInstance'
import { useState, useEffect } from 'react'
import { AuthContext } from "../context/Auth";
import { useContext } from "react";

const ExerciseCard = ({exercise}) => {
  const [exerciseSaved, setExerciseSaved] = useState(null);
   const context = useContext(AuthContext);

  useEffect(() => {exerciseSaved && axiosInstance.post('/api/exercise', exercise)}, [exerciseSaved]);

  const handleSave = () => {
    console.log(context.user._id);
    console.log(exercise);
    //setExerciseSaved({ ...exercise, userId: context.user._id });
  }
  return (
    <div className="flex h-full p-4 items-center justify-center bg-gray-400 dark:bg-gray-700 dark:text-white">
      <div className="max-w-4xl mt-4 flex bg-white rounded-xl">
        <img src={exercise.gifUrl} alt={exercise.name} className="rounded-xl" />
        <div className="ml-5 bg-gray-100 rounded-xl p-5">
          <h2 className="mt-2 text-xl font-bold">{exercise.name}</h2>
          <h4 className="mt-2">{exercise.target}</h4>
          <h4 className="mt-2">{exercise.equipment}</h4>
          <h4 className="mt-2">{exercise.bodyPart}</h4>
          {exercise.instructions.map((instruction, index) => (
            <p className="mt-2" key={index}>
              {instruction}
            </p>
          ))}
          <Button className="w-1/2 self-center mt-4" onClick={handleSave}>Save to my exercises</Button>
        </div>
      </div>
    </div>
  );
}

export default ExerciseCard