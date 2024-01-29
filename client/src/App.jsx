
import { useState } from "react";
import Home from "./components/Home";
import { Routes, Route } from "react-router-dom";
import "./App.css";
import WorkoutPlan from "./components/WorkoutPlan";
import Exercise from "./components/Exercise";
import WorkoutPlayer from "./components/WorkoutPlayer";
import Editor from "./components/Editor";
import Login from "./components/Login";
import Register from "./components/Register";
import Profile from "./components/Profile";
import LandingPage from "./components/LandingPage";
import Protected from "./components/ProtectedRoute";


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
          <Route path="workoutPlan" element={<WorkoutPlan />} />
          <Route path="workoutPlan/public" element={<WorkoutPlan />} />
          <Route path="workoutPlan/public/:id" element={<WorkoutPlan />} />
          <Route path="workoutPlan/:id" element={<WorkoutPlan />} />
          <Route path="editor" element={<Editor />} />
          <Route path="workoutPlayer" element={<WorkoutPlayer />} />
          <Route path="profile" element={<Profile />} />
        </Route>
      </Routes>
    </>
  );
}

export default App;
