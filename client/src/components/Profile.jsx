import { useContext, useState } from "react";
import { AuthContext } from "../context/Auth";
import {Link} from 'react-router-dom'

import React from "react";



const Profile = () => {
  const context = useContext(AuthContext);
  const [currentUser, setCurrentUser] = useState([context]);
  let day = new Date(context.user.joinedDate);

  let date = day.getDate();
  let month = day.getMonth() + 1;
  let year = day.getFullYear();
  let currentDate = `${date}. ${month}. ${year}`;


  return (
    <div className="py-[100px]">
      {currentUser.map((user) => {
        return (
        <div key={user.user._id} className="flex justify-center w-full">
        <div className="bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 w-[100%] dark:border-gray-700 m-[10px] md:w-[40%] ">
          <div className="flex justify-center items-center h-full">
        <div className="flex align-center px-4 pt-4">        
        <div className="flex flex-col items-center pb-10">
          <img
            className="w-24 h-24 object-cover mb-3 rounded-full shadow-lg"
            src={user.user.profilePic}
            alt="Bonnie image"
          />
          <h5 className="mb-1 text-xl font-medium text-gray-900 dark:text-white">
           <p>Username: {user.user.username}</p>
          </h5>
          <span className="text-sm text-gray-500 dark:text-gray-400">
          </span>
          <div className="flex mt-4 md:mt-6">
            <Link
              to={`/EditProfile/${user.user._id}`}
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
<ul role="list" className="divide-y divide-gray-200 dark:divide-gray-700">
<li className="py-3 sm:py-4">
  <div className="flex items-center">
    <div className="flex-1 min-w-0 ms-4">
      <p className="text-lg font-medium text-gray-900 truncate dark:text-white">
      Username: {user.user.username}
      </p>
    </div>
  </div>
</li>
<li className="py-3 sm:py-4">
  <div className="flex items-center ">
    <div className="flex-1 min-w-0 ms-4">
      <p className="text-lg font-medium text-gray-900 truncate dark:text-white">
      Email: {user.user.email}
      </p>
    </div>
  </div>
</li>
<li className="py-3 sm:py-4">
  <div className="flex items-center">
    <div className="flex-1 min-w-0 ms-4">
      <p className="text-lg font-medium text-gray-900 truncate dark:text-white">
      Age: {user.user.age}
      </p>
    </div>
  </div>
</li>
<li className="py-3 sm:py-4">
  <div className="flex items-center ">
    <div className="flex-1 min-w-0 ms-4">
      <p className="text-lg font-medium text-gray-900 truncate dark:text-white">
      Height: {user.user.height}
      </p>
    </div>
  </div>
</li>
<li className="py-3 sm:py-4">
  <div className="flex items-center ">
    <div className="flex-1 min-w-0 ms-4">
      <p className="text-lg font-medium text-gray-900 truncate dark:text-white">
      Weight: {user.user.weight}
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
      )})}
    </div>
  );
};

export default Profile;
