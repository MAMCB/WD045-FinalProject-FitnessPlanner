/* eslint-disable no-self-assign */
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
import { v4 as uuidv4 } from "uuid";





const Editor = () => {
  const [exercises, setExercises] = useState([]);
  const [exerciseSearch, setExerciseSearch] = useState("");
  const [exercisesToShow, setExercisesToShow] = useState([]);
  const [blocks, setBlocks] = useState([]);
  const context = useContext(AuthContext);
  const navigate = useNavigate();
  const [newExercise, setNewExercise] = useState(null);
  const [exerciseCreated, setExerciseCreated] = useState([]);
  const [planIsValid, setPlanIsValid] = useState(false);
  const [workoutPlan, setWorkoutPlan] = useState({
    name: "",
    goal: "",
    restDuration: 0,
    exerciseDuration: 0,
    visibility: false,
    exercises: [],
  });
  const [exerciseBlock, setExerciseBlock] = useState({
    sets: 1,
    weights: 0,
    duration: 0,
    id:Math.random()*10
    
  });

  useEffect(() => {
    const storedName = localStorage.getItem("workoutPlanName");
    const storedGoal = localStorage.getItem("workoutPlanGoal");
    const visibility = localStorage.getItem("workoutPlanVisibility");
    const storedRestDuration = localStorage.getItem("workoutPlanRestDuration");
    const storedExerciseDuration = localStorage.getItem("workoutPlanExerciseDuration");
    const storedExercises = localStorage.getItem("workoutPlanExercises");
    if (storedName || storedGoal || visibility || storedRestDuration || storedExerciseDuration || storedExercises) {
      const initialExercises = JSON.parse(storedExercises);
      const initialName =JSON.parse(storedName);
      const initialGoal = JSON.parse(storedGoal);
      const initialVisibility = JSON.parse(visibility);
      const initialRestDuration =JSON.parse(storedRestDuration);
      const initialExerciseDuration =JSON.parse(storedExerciseDuration);

      setWorkoutPlan((prev) => ({
        ...prev,name: initialName, goal: initialGoal, visibility:initialVisibility, restDuration: initialRestDuration, exerciseDuration: initialExerciseDuration}));
      setBlocks(initialExercises);
      }}, []);

  useEffect(() => {
    axiosInstance
      .get("/api/exercise")
      .then((res) =>{setExercises(res.data);
      setExercisesToShow(res.data);} )
      
      .catch((err) => console.log(err));
  }, [exerciseCreated]);

 

  useEffect(() => {
    setWorkoutPlan((prev) => ({ ...prev, exercises: blocks }));
    if(blocks.length>0)
    {
       
       if (blocks[blocks.length - 1].exercise.equipment !== "body weight") {
         setWorkoutPlan((prev) => ({ ...prev, equipment: true }));
       }

    }
   
      
    
  }, [blocks]);

  useEffect(() => {
    validatePlan();
  }, [workoutPlan]);

  const handlePlan = (e) => {
    setWorkoutPlan((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };



  const handleExerciseBlock = (newBlock,index) => {
    setBlocks((prev) => {prev[index] = newBlock; return [...prev]})
  };

  
  const addExercise = (exercise) => {
    setExerciseBlock((prev) => ({ ...prev,id:uuidv4(), exercise: exercise }));
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
      .then((res) =>{
        
        alert("Workout plan saved successfully")
        navigate("/workoutPlan");
        
     
   } )
     // .then(navigate("/workoutPlan"))
      .catch((err) => {console.log(err);
      alert(err.response.data.message);});
      //window.location.reload();
  };

  const removeExercise = (index) => {
    const newBlocks = [...blocks];
    newBlocks.splice(index, 1);
    setBlocks((prev)=>newBlocks);
  };

  const handleSearch = (e) => {
    setExerciseSearch(e.target.value);
    setExercisesToShow(
      exercises.filter((exercise) =>
        exercise.name.toLowerCase().includes(e.target.value.toLowerCase())
      )
    );
  };

  const handleNewExercise = (e) => {
    setNewExercise((prev) => ({ ...prev, [e.target.id]: e.target.value }));
  };
  const createNewExercise = () => {
    axiosInstance.post("/api/exercise", newExercise).then((res) => { setExerciseCreated((prev)=>[...prev,res.data])}).then(alert("New exercise created")).catch((err) => console.log(err));
  };

  const validatePlan = () => {
    if (workoutPlan.name === "" || workoutPlan.goal === "" || workoutPlan.visibility === "" || workoutPlan.exercises.length === 0 || workoutPlan.restDuration <= 0 || workoutPlan.exerciseDuration <= 0) {
      return setPlanIsValid(false);
    }
    return setPlanIsValid(true);
  };

  const saveDraft = () => {
    localStorage.setItem("workoutPlanName", JSON.stringify(workoutPlan.name));
    localStorage.setItem("workoutPlanGoal", JSON.stringify(workoutPlan.goal));
    localStorage.setItem("workoutPlanVisibility", JSON.stringify(workoutPlan.visibility));
    localStorage.setItem("workoutPlanRestDuration", JSON.stringify(workoutPlan.restDuration));
    localStorage.setItem("workoutPlanExerciseDuration", JSON.stringify(workoutPlan.exerciseDuration));
    localStorage.setItem("workoutPlanExercises", JSON.stringify(workoutPlan.exercises));
    alert("Draft saved")
  };

  const clearDraft = () => {
    localStorage.removeItem("workoutPlanName");
    localStorage.removeItem("workoutPlanGoal");
    localStorage.removeItem("workoutPlanVisibility");
    localStorage.removeItem("workoutPlanRestDuration");
    localStorage.removeItem("workoutPlanExerciseDuration");
    localStorage.removeItem("workoutPlanExercises");
    setWorkoutPlan((prev) => ({ ...prev, name: "", goal: "", visibility: false, restDuration: 0, exerciseDuration: 0, exercises: [] }));
    setBlocks([]);
    alert("Draft cleared")
  }

 
  return (
    <section className="bg-white shadow dark:bg-gray-900 py-[10px]">
      <h1 className="m-10  text-xl  text-gray-500 dark:text-gray-400">Workout Plan Editor</h1>
      <div className="flex justify-center">
        <Button
          className="m-4"
          type="button"
          onClick={saveWorkout}
          disabled={!planIsValid}
        >
          Save workout
        </Button>
        <Button className="m-4" type="button" onClick={saveDraft}>
          Save draft
        </Button>
        <Button className="m-4" type="button" onClick={clearDraft}>
          Clear draft
        </Button>
      </div>

      <div className="flex flex-wrap px-[20px] justify-between bg-white shadow dark:bg-gray-900 py-[100px]">
        <section className="w-[100%] lg:pr-[10px] lg:w-[49%] m-[5px]">
          <h2 className=" text-gray-500 dark:text-gray-400">Your plan</h2>
          <div className="m-4 ">
            <Label htmlFor="name" value="Plan name" />
            <TextInput
              id="name"
              type="text"
              onChange={handlePlan}
              value={workoutPlan.name}
            />
          </div>
          <div className="m-4 ">
            <Label htmlFor="goal" value="Goal" />
            <TextInput
              id="goal"
              type="text"
              onChange={handlePlan}
              value={workoutPlan.goal}
            />
          </div>
          <div className="m-4 ">
            <Label htmlFor="visibility" value="Visibility" />
            <Select
              id="visibility"
              onChange={handlePlan}
              value={workoutPlan.visibility}
            >
              <option value={true}>Public</option>
              <option value={false}>Private</option>
            </Select>
          </div>
          <div className="m-4 ">
            <Label htmlFor="restDuration" value="Rest duration" />
            <TextInput
              id="restDuration"
              type="number"
              onChange={handlePlan}
              value={workoutPlan.restDuration}
            />
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
              value={workoutPlan.exerciseDuration}
            />
          </div>

          <div className="overflow-y-scroll max-h-screen">
            {blocks.length > 0 &&
              blocks.map((block, index) => (
                <Block
                  key={block.id}
                  exerciseBlock={block}
                  handleExerciseBlock={handleExerciseBlock}
                  blockIndex={index}
                  removeExercise={removeExercise}
                />
              ))}
          </div>
        </section>
        <section className="w-[100%] lg:pl-[10px] lg:w-[49%] m-[5px]">
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
                  onChange={handleSearch}
                />
              </div>
              <div className="overflow-y-scroll max-h-screen">
                {exercisesToShow.length > 0 &&
                  exercisesToShow.map((exercise) => (
                    <ExerciseCard
                      key={exercise._id}
                      exercise={exercise}
                      user={true}
                      addExercise={addExercise}
                      inPlan={false}
                      remove={null}
                      blocks={blocks}
                    />
                  ))}
              </div>
            </Tabs.Item>
            <Tabs.Item title="New exercise">
              <h2>Create a new exercise</h2>
              <div className="m-4 ">
                <Label htmlFor="name" value="Name of the exercise" />
                <TextInput id="name" type="text" onChange={handleNewExercise} />
              </div>
              <div className="m-4 ">
                <Label
                  htmlFor="description"
                  value="Description of the exercise"
                />
                <TextInput
                  id="description"
                  type="text"
                  onChange={handleNewExercise}
                />
              </div>
              <div className="m-4 ">
                <Label
                  htmlFor="difficulty"
                  value="Difficulty of the exercise"
                />
                <TextInput
                  id="difficulty"
                  type="number"
                  onChange={handleNewExercise}
                />
              </div>
              
              <div className="m-4 ">
                <Label htmlFor="equipment" value="Equipment required" />
                <TextInput
                  id="equipment"
                  type="text"
                  onChange={handleNewExercise}
                />
              </div>
              <div className="m-4 ">
                <Label htmlFor="muscleGroup" value="The target muscle group" />
                <TextInput
                  id="muscleGroup"
                  type="text"
                  onChange={handleNewExercise}
                />
              </div>
              <Button
                className="m-auto"
                type="button"
                onClick={createNewExercise}
              >
                Create exercise
              </Button>
            </Tabs.Item>
          </Tabs>
        </section>
      </div>
    </section>
  );
};

export default Editor;
