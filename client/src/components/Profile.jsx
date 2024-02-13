

import { useContext, useState, useEffect } from "react";
import { AuthContext } from "../context/Auth";
import { Link } from "react-router-dom";
import axios from "../axiosInstance";
import React from "react";
import { useNavigate } from "react-router-dom";
import userAvatar from "../assets/userAvatar.png";

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
        
        <div className="w-[100%] m-[10px] md:w-[40%]">
          <div className="p-4 bg-white border border-gray-200 rounded-lg shadow sm:p-8 dark:bg-gray-800 dark:border-gray-700">
      
            <div className="flex items-center justify-center mb-4">
            <img
                  className="w-24 h-24 object-cover mb-3 rounded-full shadow-lg"
                  src={currentUser.profilePic ? currentUser.profilePic : userAvatar}
                  alt="Bonnie image"
                />
            </div>
            <div className="flow-root">
              <ul
                role="list"
                className="divide-y divide-gray-200 dark:divide-gray-700"
              >
                <li className="py-3 sm:py-4 text-center">
                  <div className="flex items-center">
                    <div className="flex-1 min-w-0 ms-4">
                      <p className="text-lg font-medium truncate text-gray-500 sm:mb-0 dark:text-gray-400">
                        Username: {currentUser.username}
                      </p>
                    </div>
                  </div>
                </li>
                <li className="py-3 sm:py-4 text-center">
                  <div className="flex items-center ">
                    <div className="flex-1 min-w-0 ms-4">
                      <p className="text-lg font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
                        Email: {currentUser.email}
                      </p>
                    </div>
                  </div>
                </li>
                <li className="py-3 sm:py-4 text-center">
                  <div className="flex items-center">
                    <div className="flex-1 min-w-0 ms-4">
                      <p className="text-lg font-medium truncate text-gray-500 sm:mb-0 dark:text-gray-400">
                        Age: {currentUser.age}
                      </p>
                    </div>
                  </div>
                </li>
                <li className="py-3 sm:py-4 text-center">
                  <div className="flex items-center ">
                    <div className="flex-1 min-w-0 ms-4">
                      <p className="text-lg font-medium truncate text-gray-500 sm:mb-0 dark:text-gray-400">
                        Height: {currentUser.height} cm
                      </p>
                    </div>
                  </div>
                </li>
                <li className="py-3 sm:py-4 text-center">
                  <div className="flex items-center ">
                    <div className="flex-1 min-w-0 ms-4">
                      <p className="text-lg font-medium truncate text-gray-500 sm:mb-0 dark:text-gray-400">
                        Weight: {currentUser.weight} Kg
                      </p>
                    </div>
                  </div>
                </li>
                <li className="py-3 sm:py-4 text-center">
                  <div className="flex items-center ">
                    <div className="flex-1 min-w-0 ms-4">
                      <p className="text-lg font-medium truncate text-gray-500 sm:mb-0 dark:text-gray-400">
                        Joined: {currentDate}
                      </p>
                    </div>
                  </div>
                </li>
              </ul>
              <div className="flex mt-4 md:mt-6 flex-wrap justify-center">
                <button type="button" className="group mb-5 flex items-center justify-center p-0.5 text-center font-medium relative focus:z-10 focus:outline-none text-white bg-cyan-700 border border-transparent enabled:hover:bg-cyan-800 focus:ring-cyan-300 dark:bg-cyan-600 dark:enabled:hover:bg-cyan-700 dark:focus:ring-cyan-800 rounded-lg focus:ring-2">
                  <Link
                    to={`/EditProfile/${currentUser._id}`}
                    className="flex items-center transition-all duration-200 rounded-md text-sm px-4 py-2"
                  >
                    Edit Profile
                  </Link>
                  </button>
                </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;

