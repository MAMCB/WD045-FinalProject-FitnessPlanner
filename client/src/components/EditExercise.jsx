import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/Auth";
import axios from "../axiosInstance";
import { useNavigate, useParams } from "react-router-dom";

const EditExercise = () => {
  const [currentExercise, setCurrentExercise] = useState([]);
  const [exercise, setExercise] = useState({
    name: currentExercise?.name,
    description: currentExercise?.description,
    image: currentExercise?.image,
    difficulty: currentExercise?.difficulty,
    muscleGroup: currentExercise?.muscleGroup,
    equipment: currentExercise?.equipment,
    rating: currentExercise?.rating,
  });

  const { id } = useParams();
  const navigate = useNavigate();

  useEffect(() => {
    axios
      .get(`api/exercise/${id}`, currentExercise)
      .then((res) => setCurrentExercise(res.data))
      .catch((e) => console.error(e));
  }, []);

  useEffect(() => {
    setExercise(currentExercise);
  }, [currentExercise]);

  console.log(exercise.name);

  const handleChange = (e) => {
    if (e.target.name === "image") {
      setExercise((state)=>({ ...state, image: e.target.files[0] }));
      console.log(e.target.files[0]);
    }
    else{
      setExercise((state) => ({
        ...state,
        [e.target.name]: e.target.value,
      }));
    }
    
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    const { name, description, image, difficulty, muscleGroup, equipment, rating } = exercise;
    console.log(exercise)
    const formData = new FormData();
    formData.append("name", name);
    formData.append("description", description);
    formData.append("image", image);
    formData.append("difficulty", difficulty);
    formData.append("muscleGroup", muscleGroup);
    formData.append("equipment", equipment);
    formData.append("rating", rating);
    axios
      .put(`/api/exercise/${id}`, formData)
      .then((res) => navigate("/workoutPlan"))
      .catch((e) => console.error(e));
  };

  const deleteHandler = (id) =>{
    axios.delete(`/api/exercise/${id}`)
    .then(res=> navigate(`/workoutPlan`))
    .catch(e=>console.error(e))
}

  return (
    <div className="py-[100px]">
      <div className="w-full m-auto bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
        <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
          <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
            Edit Exercise
          </h1>

          <form
            onSubmit={handleSubmit}
            className="max-w-sm mx-auto"
            encType="multipart/form-data"
            
          >
            <div className="mb-5">
              <label
                htmlFor="username"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Exercise Name
              </label>
              <input
                type="text"
                id="name"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="exercise name"
                required=""
                name="name"
                defaultValue={currentExercise?.name}
                onChange={handleChange}
              />
            </div>
            <div className="mb-5">
              <>
                <label
                  htmlFor="description"
                  className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                >
                  Description
                </label>
                <textarea
                  id="description"
                  rows={4}
                  name="description"
                  className="block p-2.5 w-full text-sm text-gray-900 bg-gray-50 rounded-lg border border-gray-300 focus:ring-blue-500 focus:border-blue-500 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                  placeholder="Description"
                  defaultValue={currentExercise?.description}
                  onChange={handleChange}
                />
              </>
            </div>
            <div className="mb-5">
              <label
                htmlFor="image"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Exercise image
              </label>
              <input
                type="file"
                id="image"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="image"
                required=""
                name="image"
                accept="image/*"
                defaultValue={currentExercise?.image}
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
                defaultValue={currentExercise?.difficulty}
                onChange={handleChange}
              />
            </div>
            <div className="mb-5">
              <label
                htmlFor="restDuration"
                className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
              >
                Muscle group
              </label>
              <input
                type="text"
                id="muscleGroup"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="Muscle group"
                required=""
                name="muscleGroup"
                defaultValue={currentExercise?.muscleGroup}
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
                id="equipment"
                className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                placeholder="restDuration"
                required=""
                name="equipment"
                defaultValue={currentExercise?.equipment}
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
                defaultValue={currentExercise?.rating}
                onChange={handleChange}
              />
            </div>
            <button
              type="submit"
              className="group mb-5 flex items-center justify-center p-0.5 text-center font-medium relative focus:z-10 focus:outline-none text-white bg-cyan-700 border border-transparent enabled:hover:bg-cyan-800 focus:ring-cyan-300 dark:bg-cyan-600 dark:enabled:hover:bg-cyan-700 dark:focus:ring-cyan-800 rounded-lg focus:ring-2"
            >
            <span className="flex items-center transition-all duration-200 rounded-md text-sm px-4 py-2">Edit</span>
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default EditExercise;
