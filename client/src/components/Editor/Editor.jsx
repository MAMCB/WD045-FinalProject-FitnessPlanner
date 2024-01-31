import React from "react";
import {
  Tabs,
  Button,
  TextInput,
  Label,
  Carousel,
  Select,
} from "flowbite-react";
import ExerciseCard from "../ExerciseSearch-page/ExerciseCard";
import { useState, useEffect } from "react";
import axiosInstance from "../../axiosInstance";
import { AuthContext } from "../../context/Auth";
import { useContext } from "react";
import { useNavigate } from "react-router-dom";
import Block from "./Block";
import { set } from "react-hook-form";


const Editor = () => {
  const [exercises, setExercises] = useState([]);
  const [blocks, setBlocks] = useState([]);
  const context = useContext(AuthContext);
  const navigate = useNavigate();
  const [workoutPlan, setWorkoutPlan] = useState({
    name: "",
    goal: "",
    restDuration: 0,
    exerciseDuration: 0,
    exercises: [],
  });
  const [exerciseBlock, setExerciseBlock] = useState({
    sets: 1,
    weights: 0,
    duration: 0,
    
    
  });

  useEffect(() => {
    axiosInstance
      .get("/api/exercise")
      .then((res) => setExercises(res.data))
      .catch((err) => console.log(err));
  }, []);

  useEffect(() => {
    setWorkoutPlan((prev) => ({ ...prev, exercises: blocks }));
  }, [blocks]);

  const handlePlan = (e) => {
    setWorkoutPlan((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };



  const handleExerciseBlock = (newBlock,index) => {
    setBlocks((prev) => {prev[index] = newBlock; return [...prev]})
  };

  // const addExercise = (exercise) => {
  //   setExerciseBlock((prev) => ({ ...prev, exercise: exercise}));
  //   const newExercise = {...exercise,...exerciseBlock}
  //   setWorkoutPlan((prev) => ({ ...prev, exercises: [...prev.exercises, newExercise] }));
  // };
  const addExercise = (exercise) => {
    setExerciseBlock((prev) => ({ ...prev, exercise: exercise }));
    const newExercise = { ...exerciseBlock, exercise: exercise };
    setBlocks((prev) => [...prev, newExercise]);
  };


  const saveWorkout = () => {
    workoutPlan.exercises.length>0 &&
    console.log(workoutPlan);
    workoutPlan.userId = context.user._id;
    workoutPlan.exercises.forEach((exercise) => {exercise.duration ===0? exercise.duration = workoutPlan.exerciseDuration: exercise.duration = exercise.duration})
    console.log(workoutPlan);
    axiosInstance
      .post("/api/workoutPlan", workoutPlan)
      .then((res) => console.log(res))
      .then(navigate("/workoutPlan"))
      .catch((err) => console.log(err));
  };
  return (
    <>
      <h1 className="m-10 text-xl font-bold">Workout Plan Editor</h1>
      <Button type="button" onClick={saveWorkout}>
        Save workout
      </Button>
      <div className="flex justify-evenly dark:bg-black">
        <section className="w-1/3">
          <h2>Your plan</h2>
          <div className="m-4 ">
            <Label htmlFor="name" value="Plan name" />
            <TextInput id="name" type="text" onChange={handlePlan} />
          </div>
          <div className="m-4 ">
            <Label htmlFor="goal" value="Goal" />
            <TextInput id="goal" type="text" onChange={handlePlan} />
          </div>
          <div className="m-4 ">
            <Label htmlFor="restDuration" value="Rest duration" />
            <TextInput id="restDuration" type="number" onChange={handlePlan} />
          </div>
          <div className="m-4 ">
            <Label
              htmlFor="exerciseDuration"
              value="Duration for each exercise"
            />
            <TextInput
              id="exerciseDuration"
              type="number"
              onChange={handlePlan}
            />
          </div>
         
          <div>
            {blocks.length > 0 &&
              blocks.map((block, index) => (
                <Block
                  key={index}
                  exerciseBlock={block}
                  handleExerciseBlock={handleExerciseBlock}
                  index={index}
                />
              ))}
          </div>
        </section>
        <section className="w-1/3">
          <Tabs aria-label="Default tabs" style="default">
            <Tabs.Item active title="Look for exercises">
              <div className="m-4 ">
                <Label
                  htmlFor="exercise-search"
                  value="Search your exercises"
                />
                <TextInput
                  id="exercise-search"
                  type="text"
                  onChange={handlePlan}
                />
              </div>
              <div>
                {exercises.length > 0 &&
                  exercises.map((exercise) => (
                    <ExerciseCard
                      key={exercise._id}
                      exercise={exercise}
                      user={true}
                      addExercise={addExercise}
                    />
                  ))}
              </div>
            </Tabs.Item>
            <Tabs.Item title="New exercise"></Tabs.Item>
          </Tabs>
        </section>
      </div>
    </>
  );
};

export default Editor;
