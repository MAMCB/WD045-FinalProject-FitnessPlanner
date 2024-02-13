import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/Auth";
import axios from "../axiosInstance";
import { useNavigate, useParams } from "react-router-dom";
import {
  Label,
  Select,
} from "flowbite-react";

const EditWorkoutPlan = () => {
  const [workout, setWorkout] = useState({
    name: "",
    goal: "",
    image: "",
    difficulty: "",
    restDuration: 0,
    type: "",
    exercises: [],
    
    visibility: "false",
  });
  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios.get(`/api/workoutPlan/${id}`).then((res) => setWorkout(res.data));
  }, []);

  const handleChange = (e) => {
     if (e.target.name === "image") {
      setWorkout((state)=>({ ...state, image: e.target.files[0] }));
      console.log(e.target.files[0]);
    }
    else{
    setWorkout((state) => ({
      ...state,
      [e.target.name]: e.target.value,
    }));}
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, goal, image, difficulty, restDuration, type, equipment, rating, visibility } = workout;
    const formData = new FormData();
    formData.append("name", name);
    formData.append("goal", goal);
    formData.append("image", image);
    formData.append("difficulty", difficulty);
    formData.append("restDuration", restDuration);
    formData.append("type", type);
    
    formData.append("visibility", visibility);
    axios
      .put(`/api/workoutPlan/${id}`, formData)
      .then((res) => navigate(`/workoutPlan`))
      .catch((e) => console.error(e));
  };

  return (
    <div className="bg-white shadow dark:bg-gray-900 py-[100px]">
      <div className="w-full m-auto bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            Edit workout settings
          </h1>

          <form
            onSubmit={handleSubmit}
            className="max-w-sm mx-auto"
            encType="multipart/form-data"
          >
            <div className="mb-5">
              <label
                htmlFor="name"
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
                htmlFor="goal"
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
              <Label htmlFor="visibility" value="Visibility" />
              <Select
                id="visibility"
                onChange={handleChange}
                name="visibility"
                defaultValue={workout?.visibility}
              >
                <option value={true}>Public</option>
                <option value={false}>Private</option>
              </Select>
            </div>
            <div className="mb-5">
              <label
                htmlFor="image"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Workout image
              </label>
              <input
                type="file"
                id="image"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="image"
                required=""
                accept="image/*"
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
                placeholder="difficulty"
                required=""
                name="difficulty"
                defaultValue={workout?.difficulty}
                onChange={handleChange}
              />
            </div>
            <div className="mb-5">
              <Label htmlFor="type" value="type" />
              <Select
                id="type"
                onChange={handleChange}
                name="type"
                defaultValue={workout?.type}
              >
                <option value={workout?.type}>{workout?.type}</option>
                <option value={"cardio"}>Cardio</option>
                <option value={"strength"}>Strength</option>
                <option value={"flexibility"}>Flexibility</option>
                <option value={"balance"}>Balance</option>
                <option value={"other"}>Other</option>
              </Select>
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
  );
};

export default EditWorkoutPlan;
