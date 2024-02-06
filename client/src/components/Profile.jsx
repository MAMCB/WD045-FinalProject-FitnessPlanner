import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/Auth";
import { Link } from "react-router-dom";
import axios from "../axiosInstance";
import React from "react";
import { useNavigate } from "react-router-dom";

const Profile = () => {
  const context = useContext(AuthContext);
  const [currentUser, setCurrentUser] = useState({
    username: context.user.username,
  });

const navigate = useNavigate();


  useEffect(() => {
    axios
      .get(`api/user/${context.user._id}`)
      .then((res) => {
        setCurrentUser(res.data);
        console.log(res.data);
      })
      .catch((e) => console.error(e));
  }, []);
  let day = new Date(currentUser.joinedDate);

  let date = day.getDate();
  let month = day.getMonth() + 1;
  let year = day.getFullYear();
  let currentDate = `${date}. ${month}. ${year}`;


  return (
    <div className="bg-white shadow dark:bg-gray-900 py-[100px]">
      <div key={currentUser._id} className="flex justify-center w-full">
        <div className="bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 w-[100%] dark:border-gray-700 m-[10px] md:w-[40%] ">
          <div className="flex justify-center items-center h-full">
            <div className="flex align-center px-4 pt-4">
              <div className="flex flex-col items-center pb-10">
                <img
                  className="w-24 h-24 object-cover mb-3 rounded-full shadow-lg"
                  src={currentUser.profilePic}
                  alt="Bonnie image"
                />
                <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
                  <p>Username: {currentUser.username}</p>
                </h5>
                <span className="text-sm text-gray-500 dark:text-gray-400"></span>
                <div className="flex mt-4 md:mt-6 flex-wrap">
                  <Link
                    to={`/EditProfile/${currentUser._id}`}
                    className="inline-flex items-center px-4 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                  >
                    Edit Profile
                  </Link>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="w-[100%] m-[10px] md:w-[40%]">
          <div className="p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
            <div className="flex items-center justify-between mb-4">
              <h5 className="text-xl font-bold leading-none text-gray-900 dark:text-white">
                User Profile
              </h5>
            </div>
            <div className="flow-root">
              <ul
                role="list"
                className="divide-y divide-gray-200 dark:divide-gray-700"
              >
                <li className="py-3 sm:py-4">
                  <div className="flex items-center">
                    <div className="flex-1 min-w-0 ms-4">
                      <p className="text-lg font-medium text-gray-900 truncate dark:text-white">
                        Username: {currentUser.username}
                      </p>
                    </div>
                  </div>
                </li>
                <li className="py-3 sm:py-4">
                  <div className="flex items-center ">
                    <div className="flex-1 min-w-0 ms-4">
                      <p className="text-lg font-medium text-gray-900 truncate dark:text-white">
                        Email: {currentUser.email}
                      </p>
                    </div>
                  </div>
                </li>
                <li className="py-3 sm:py-4">
                  <div className="flex items-center">
                    <div className="flex-1 min-w-0 ms-4">
                      <p className="text-lg font-medium text-gray-900 truncate dark:text-white">
                        Age: {currentUser.age}
                      </p>
                    </div>
                  </div>
                </li>
                <li className="py-3 sm:py-4">
                  <div className="flex items-center ">
                    <div className="flex-1 min-w-0 ms-4">
                      <p className="text-lg font-medium text-gray-900 truncate dark:text-white">
                        Height: {currentUser.height} cm
                      </p>
                    </div>
                  </div>
                </li>
                <li className="py-3 sm:py-4">
                  <div className="flex items-center ">
                    <div className="flex-1 min-w-0 ms-4">
                      <p className="text-lg font-medium text-gray-900 truncate dark:text-white">
                        Weight: {currentUser.weight} Kg
                      </p>
                    </div>
                  </div>
                </li>
                <li className="py-3 sm:py-4">
                  <div className="flex items-center ">
                    <div className="flex-1 min-w-0 ms-4">
                      <p className="text-lg font-medium  text-gray-900 truncate dark:text-white">
                        Joined: {currentDate}
                      </p>
                    </div>
                  </div>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
