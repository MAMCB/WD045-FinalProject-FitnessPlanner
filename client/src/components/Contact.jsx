import React, { useEffect } from 'react'
import NavbarForHome from "./NavbarForHome";
import logo from "../assets/Logo_!.png";
import gitHub from "../assets/github-mark-white.png";
import gitHubBlack from "../assets/github-mark.png";
import gym from "../assets/wp8834037.jpg";
import { useState } from 'react';

const Contact = () => {
  const [theme, setTheme] = useState(localStorage.getItem("theme"));
  

 
 

  return (
    <>
      <NavbarForHome />
      <section className="bg-white shadow dark:bg-gray-900 py-[100px] px-[40px]">
        {" "}
        <div className="mb-[50px] w-[96%] lg:w-[800px] lg:m-auto">
          <h1 className="mb-4 text-center text-4xl font-bold tracking-tight text-gray-500 dark:text-gray-400">
            Contact
          </h1>
          <p className="text-center text-gray-500 mb-6 dark:text-gray-400">
            For any questions or concerns, please contact us at:{" "}
            <a href="mailto:miguel.amc.borges@gmail.com">
              <img src={logo} className="m-auto mt-4 h-9" alt="Logo" />
              <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                FitLife
              </span>
            </a>
          </p>
          <a
            href="https://github.com/MAMCB/WD045-FinalProject-FitnessPlanner"
            target="_blank"
          >
            <img src={theme==="dark"?gitHub:gitHubBlack} className="m-auto mt-4 h-9" alt="Logo" />
          </a>
        </div>
        
          <img
            className="m-auto mt-10 rounded-xl w-1/2 "
            src={gym}
            alt="dumbbells gym floor"
          />
      
      </section>
    </>
  );
}

export default Contact