import { useContext, useState,useEffect } from "react";
import { AuthContext } from "../context/Auth";
import axios from "../axiosInstance";
import { useNavigate} from "react-router-dom";


const EditProfile = () => {
  const context = useContext(AuthContext);
  const navigate = useNavigate();
  const [user, setUser] = useState({});
  const [image, setImage] = useState(null);
  const [error, setError] = useState(null);
  const [updateProfilePic, setUpdateProfilePic] = useState(false);


  useEffect(() => {
    if(Object.keys(user).length===0) return;
    console.log(user.profilePic);
   // user.profilePic.startsWith("https://res.cloudinary.com/") || user.profilePic.startsWith("https://lh3.googleusercontent.com/")
   typeof user.profilePic === 'string'
      ? setUpdateProfilePic(false)
      : setUpdateProfilePic(true);
  },[user]);

  useEffect(() => {
    axios.get(`api/user/${context.user._id}`)
    .then(res => setUser(res.data))
    .catch((e) => console.error(e));
  },[]);


  const handleChange = (e) => {
    if (e.target.name === "profilePic") {

      const file = e.target.files[0];
      if (file.size <= 320 * 320) { // Check file size limit
        setImage(file);
        setError(null);
      } else {
        setImage(null);
        setError('File size exceeds the limit');
      }
      setUser({ ...user, profilePic: e.target.files[0] });
      console.log(e.target.files[0]);
    } else {
      setUser({ ...user, [e.target.name]: e.target.value });
    }
  };

  const handleSubmit = (e) => {
    e.preventDefault();

    if (!image) {
      setError('Please select an image');
      return;
    }

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
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Edit
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

