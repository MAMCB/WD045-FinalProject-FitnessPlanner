import { useContext, useState,useEffect } from "react";
import { AuthContext } from "../context/Auth";
import axios from "../axiosInstance";
import { useNavigate} from "react-router-dom";


const EditProfile = () => {
  const context = useContext(AuthContext);
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [updateProfilePic, setUpdateProfilePic] = useState(false);


  useEffect(() => {
    console.log('user:',user)
    if(Object.keys(user).length===0) return;
    console.log(user.profilePic);
   // user.profilePic.startsWith("https://res.cloudinary.com/") || user.profilePic.startsWith("https://lh3.googleusercontent.com/")
   typeof user.profilePic === 'string'
      ? setUpdateProfilePic(false)
      : setUpdateProfilePic(true);
  },[user]);

  useEffect(() => {
    console.log('context:',context.user._id)
    console.log("getting user")
    axios.get(`/api/user/${context.user._id}`)
    .then(res => {setUser(res.data)
    console.log(res.data)})
    .catch((e) => console.error(e));
  },[]);


  const handleChange = (e) => {
    if (e.target.name === "profilePic") {
      setUser({ ...user, profilePic: e.target.files[0] });
      console.log(e.target.files[0]);
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    const { username, age, height, weight, profilePic } = user;
    console.log(profilePic);
    const formData = new FormData();
    formData.append("username", username);
    formData.append("age", age);
    formData.append("height", height);
    formData.append("weight", weight);
    formData.append("profilePic", profilePic);
    formData.append("updateProfilePic", updateProfilePic)
   
    axios
      .put(`/api/user/${context.user._id}`, formData)
      .then(res => navigate('/profile'))
      .catch((e) => {console.error(e)
     alert("Something went wrong, maybe the image is to large? Make sure its not over 5Mb") });
      console.log('user:',user)
      console.log('context:',context.user)

  };

  return (
    <>
      {user ? (
        <div className="bg-white shadow dark:bg-gray-900 py-[100px]">
          <div className="w-full m-auto bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Edit user profile
              </h1>

              <form
                onSubmit={handleSubmit}
                encType="multipart/form-data"
                className="max-w-sm mx-auto"
              >
                <div className="mb-5">
                  <label
                    htmlFor="username"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your username
                  </label>
                  <input
                    type="text"
                    id="username"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="username"
                    required=""
                    name="username"
                    defaultValue={user.username}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-5">
                  <label
                    htmlFor="age"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your age
                  </label>
                  <input
                    type="number"
                    id="age"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="age"
                    required=""
                    name="age"
                    defaultValue={user.age}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-5">
                  <label
                    htmlFor="height"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your height
                  </label>
                  <input
                    type="number"
                    id="height"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="height"
                    required=""
                    name="height"
                    defaultValue={user.height}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-5">
                  <label
                    htmlFor="weight"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your weight
                  </label>
                  <input
                    type="number"
                    id="weight"
                    className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                    placeholder="weight"
                    required=""
                    name="weight"
                    defaultValue={user.weight}
                    onChange={handleChange}
                  />
                </div>
                <div className="mb-5">
                  <label
                    htmlFor="profile"
                    className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                  >
                    Your profile picture
                  </label>
                  <input
                    type="file"
                    id="profile"
                    placeholder="profile"
                    accept="image/*"
                    name="profilePic"
                    onChange={handleChange}
                    defaultValue={user.profilePic}
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
      ) : (
        <p>Loading...</p>
      )}
    </>
  );
};

export default EditProfile;

