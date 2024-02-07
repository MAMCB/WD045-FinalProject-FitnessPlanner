import { useContext, useState,useEffect } from "react";
import { AuthContext } from "../context/Auth";
import axios from "../axiosInstance";
import { useNavigate, useParams } from "react-router-dom";

const EditWorkoutPlan = () =>{
    const [workout, setWorkout]= useState({
        name:'',
        goal:'',
        image:'',
        difficulty:'',
        restDuration:0,
        type:'',
        equipment:'false',
        rating:0,
    })
    const {id} = useParams();
    const navigate = useNavigate();

useEffect(()=>{
    axios.get(`/api/workoutPlan/${id}`)
    .then(res=>setWorkout(res.data))
    .catch((e) => console.error(e));
},[])

const handleChange = (e) =>{
    setWorkout((state)=>({
...state,
[e.target.name]:e.target.value
       }
    ))
}

const handleSubmit = (e) =>{
    e.preventDefault();
    axios.put(`/api/workoutPlan/${id}`, workout)
    .then(res=> navigate(`/workoutPlan`))
    .catch(e=>console.error(e))
}




    return(
        <div className="bg-white shadow dark:bg-gray-900 py-[100px]">
        <div className="w-full m-auto bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
              Edit workout settings
            </h1>
  
            <form onSubmit={handleSubmit} className="max-w-sm mx-auto">
              <div className="mb-5">
                <label
                  htmlFor="username"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Workout Name
                </label>
                <input
                  type="text"
                  id="name"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="workout name"
                  required=""
                  name="name"
                  defaultValue={workout?.name}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-5">
                <label
                  htmlFor="age"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Goal
                </label>
                <input
                  type="text"
                  id="goal"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="goal"
                  required=""
                  name="goal"
                  defaultValue={workout?.goal}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-5">
                <label
                  htmlFor="image"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Workout image
                </label>
                <input
                  type="text"
                  id="image"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="image"
                  required=""
                  name="image"
                  defaultValue={workout?.image}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-5">
                <label
                  htmlFor="difficulty"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Difficulty
                </label>
                <input
                  type="number"
                  id="difficulty"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="weight"
                  required=""
                  name="difficulty"
                  defaultValue={workout?.difficulty}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-5">
                <label
                  htmlFor="restDuration"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Rest duration
                </label>
                <input
                  type="number"
                  id="restDuration"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="restDuration"
                  required=""
                  name="restDuration"
                  defaultValue={workout?.restDuration}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-5">
                <label
                  htmlFor="equipment"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Type
                </label>
                <input
                  type="text"
                  id="equipment"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="equipment"
                  required=""
                  name="type"
                  defaultValue={workout?.equipment}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-5">
                <label
                  htmlFor="restDuration"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Equipment
                </label>
                <input
                  type="text"
                  id="restDuration"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="restDuration"
                  required=""
                  name="restDuration"
                  defaultValue={workout?.restDuration}
                  onChange={handleChange}
                />
              </div>
              <div className="mb-5">
                <label
                  htmlFor="restDuration"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                 Rating
                 </label>
                <input
                  type="number"
                  id="rating"
                  className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="rating"
                  required=""
                  name="rating"
                  defaultValue={workout?.rating}
                  onChange={handleChange}
                />
              </div>
              <button
                type="submit"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                Edit
              </button>
            </form>
          </div>
        </div>
      </div>
    )
}

export default EditWorkoutPlan