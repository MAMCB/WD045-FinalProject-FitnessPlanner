import { useState } from "react";
import Home from "./components/Home";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import WorkoutPlan from "./components/WorkoutPlan";
import EditWorkoutPlan from "./components/EditWorkoutPlan";
import Exercise from "./components/ExerciseSearch-page/Exercise";
import EditExercise from "./components/EditExercise";
import WorkoutPlayer from "./components/WorkoutPlayer";
import Editor from "./components/Editor/Editor";
import Login from "./components/Login";
import Register from "./components/Register";
import Profile from "./components/Profile";
import EditProfile from "./components/EditProfile";
import LandingPage from "./components/Landing-Page/LandingPage";

import Protected from "./components/ProtectedRoute";
import Footer from "./components/Footer";

function App() {
  return (
    <>
      <Routes>
        <Route path="/landingPage" element={<LandingPage />} />
        <Route path="login" element={<Login />} />
        <Route path="register" element={<Register />} />
        <Route path="/" element={<Protected />}>
          <Route path="" element={<Home />} />
          <Route path="exercise" element={<Exercise />} />
          <Route path="exercise/:id" element={<Exercise />} />
          <Route path="editExercise/:id" element={<EditExercise />} />

          <Route path="workoutPlan" element={<WorkoutPlan />} />
          <Route path="workoutPlan/:id" element={<EditWorkoutPlan />} />
          <Route path="workoutPlan/public" element={<EditWorkoutPlan />} />
          <Route path="workoutPlan/public/:id" element={<WorkoutPlan />} />
          <Route path="workoutPlan/:id" element={<WorkoutPlan />} />
          <Route path="editor" element={<Editor />} />
          <Route path="workoutPlayer/:id/:version" element={<WorkoutPlayer />} />
          <Route path="profile" element={<Profile />} />
          <Route path="editProfile/:id" element={<EditProfile />} />
        </Route>
      </Routes>
      <Footer />
    </>
  );
}

export default App;
