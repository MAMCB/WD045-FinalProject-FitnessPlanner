import React from 'react'
import { Label, TextInput,Button } from 'flowbite-react'
import ExerciseCard from '../ExerciseSearch-page/ExerciseCard';
import { useState,useEffect } from 'react';

const Block = ({ exerciseBlock,handleExerciseBlock,index  }) => {
  const [exerciseB, setExerciseB] = useState(exerciseBlock)
  const handleExerciseB = (e) => {
    setExerciseB((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };
  useEffect(() => {
    handleExerciseBlock(exerciseB,index)
  }, [exerciseB])

  return (
    <div>
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
        <ExerciseCard exercise={exerciseB.exercise} user={true} />
      )}
    </div>
  );
};

export default Block