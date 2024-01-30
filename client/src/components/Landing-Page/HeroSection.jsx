import React from "react";
import { Link } from "react-router-dom";

const HeroSection = () => {
  return (
    <section className="bg-[url('/src/assets/bodybilder.jpg')] relative bg-no-repeat bg-left bg-cover h-screen">
      <div className="overlay">
        <div className="clip-path-triangle z-10 absolute bg-primary-color right-0 top-0 bottom-0 left-2/4">
          <div className="flex absolute right-9  bottom-5">
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={100}
              height={100}
              viewBox="0 0 24 24"
              fill="#9EB9D6"
            >
              <path d="M10.477 0h-8.977l12.024 12-12.024 12h8.977l12.023-12z" />
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={100}
              height={100}
              viewBox="0 0 24 24"
              fill="#9EB9D6"
            >
              <path d="M10.477 0h-8.977l12.024 12-12.024 12h8.977l12.023-12z" />
            </svg>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              width={100}
              height={100}
              viewBox="0 0 24 24"
              fill="#9EB9D6"
            >
              <path d="M10.477 0h-8.977l12.024 12-12.024 12h8.977l12.023-12z" />
            </svg>
          </div>
        </div>
        <div className="max-w-7xl mx-auto h-screen relative">
          <div>
            <div className="position-text-in-center z-10">
              <h1 className="text-primary-color text-8xl font-bold">FitLife</h1>
              <p className="text-primary-color text-3xl text-center">
                Fitness -Planner
              </p>
            </div>
            <div className="flex flex-col absolute z-10 left-0 bottom-10 items-baseline justify-end">
              <p className="text-primary-color font-bold mb-10">
                Start planning your new healthy lifestile!
              </p>
              <button
                className="text-primary-color button border-2 py-1 mb-2 px-5 border-primary-color"
                type="button"
              >
                <Link to={"/register"}>Register</Link>
              </button>
              <p className="text-primary-color mb-2">
                Already have an account?
              </p>
              <button
                className="text-primary-color button border-2 mb-3 py-1 px-5 border-primary-color"
                type="button"
              >
                <Link to={"/login"}>Login</Link>
              </button>
            </div>
          </div>
        </div>
      </div>
    </section>
  );
};

export default HeroSection;