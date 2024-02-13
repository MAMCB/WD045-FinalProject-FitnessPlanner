import React from 'react'
import { useState,useEffect } from 'react';
import SessionCalendar from './SessionCalendar';
import axiosInstance from '../axiosInstance';
import Loading from './Loading';

const Dashboard = () => {
    const [workoutSessions, setWorkoutSessions] = useState([]);
    useEffect(() => {
      axiosInstance.get('/api/workoutSession')
      .then((res) => {
        setWorkoutSessions(res.data);
      })
      .catch((e) => console.error(e));
    }, []);
  return (
    <div>
        <h1>Dashboard</h1>
       {workoutSessions.length > 0 ? (
        <SessionCalendar workoutSessions={workoutSessions} />):<Loading/>}
    </div>
  )
}

export default Dashboard