import React from 'react'
import { Label, TextInput,Button } from 'flowbite-react'
import ExerciseCard from '../ExerciseSearch-page/ExerciseCard';
import { useState,useEffect } from 'react';

const Block = ({ exerciseBlock,handleExerciseBlock,blockIndex,removeExercise  }) => {
  const [exerciseB, setExerciseB] = useState(exerciseBlock)
  const handleExerciseB = (e) => {
    setExerciseB((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };
  useEffect(() => {
    handleExerciseBlock(exerciseB,blockIndex)
  }, [exerciseB])

 const remove = () => {
 {
    console.log(blockIndex);
    removeExercise(blockIndex);
 }
}

  return (
    <div className="flex-col h-full p-4 items-center justify-center bg-gray-400 dark:bg-gray-700 dark:text-white">
      <div className="m-4 ">
        <Label htmlFor="sets" value="How many sets" />
        <TextInput
          
          id="sets"
          type="number"
          onChange={handleExerciseB}
          placeholder={exerciseB.sets}
        />
      </div>
      <div className="m-4 ">
        <Label htmlFor="duration" value="Exercise duration" />
        <TextInput
          id="duration"
          type="text"
          onChange={handleExerciseB}
          placeholder={exerciseB.duration}
        />
      </div>
      <div className="m-4 ">
        <Label htmlFor="weights" value="Set weights" />
        <TextInput
          id="weights"
          type="text"
          onChange={handleExerciseB}
          placeholder={exerciseB.weights}
        />
      </div>

      {exerciseB.exercise && (
        <ExerciseCard
          exercise={exerciseB.exercise}
          user={true}
          inPlan={true}
          addExercise={null}
          remove={remove}
        />
      )}
    </div>
  );
};

export default Block;