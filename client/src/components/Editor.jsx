import React from 'react'
import {
  Tabs,
  Button,
  TextInput,
  Label,
  Carousel,
  Select,
} from "flowbite-react";
import ExerciseCard from "./ExerciseCard";
import { useState, useEffect } from "react";
import axiosInstance from '../axiosInstance';
import { AuthContext } from "../context/Auth";
import { useContext } from "react";

const Editor = () => {
  const [exercises, setExercises] = useState([]);
  const context = useContext(AuthContext);
  const [workoutPlan, setWorkoutPlan] = useState({
    name: "",
    goal: "",
    restTimes: 0,
    exerciseTimes: 0,
    blocks: [],
  });
  const [exerciseBlock, setExerciseBlock] = useState({
    sets: 1,
    weights: 0,
    duration: 0,
    exercise: {},
  });

  useEffect(() => {
    axiosInstance
      .get("/api/exercise")
      .then((res) => setExercises(res.data))
      .catch((err) => console.log(err));
  }, []);

  const handlePlan = (e) => {
  }

  const handleBlock = (e) => {
  }

  const addExercise = (exercise) => {
  }
  return (
    <>
      <h1 className="m-10 text-xl font-bold">Workout Plan Editor</h1>
      <div className="flex justify-evenly">
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
            <Label htmlFor="rest-times" value="Rest times" />
            <TextInput id="rest-times" type="number" onChange={handlePlan} />
          </div>
          <div className="m-4 ">
            <Label
              htmlFor="exercise-times"
              value="Duration for each exercise"
            />
            <TextInput
              id="exercise-times"
              type="number"
              onChange={handlePlan}
            />
          </div>
          <div className="m-4 ">
            <Label htmlFor="add-button" value="Add Exercise Block" />
            <Button id="add-button" type="button" onClick={handleBlock}>
              +
            </Button>
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
                    <ExerciseCard exercise={exercise} user={true} addExercise={addExercise} />
                  ))}
              </div>
            </Tabs.Item>
            <Tabs.Item title="New exercise"></Tabs.Item>
          </Tabs>
        </section>
      </div>
    </>
  );
}

export default Editor;