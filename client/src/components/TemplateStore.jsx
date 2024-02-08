("use client");
import React from "react";
import { useState, useEffect, useContext } from "react";
import { AuthContext } from "../context/Auth";
import axios from "../axiosInstance";

const TemplateStore = () => {
  const [workoutPlans, setWorkoutPlans] = useState([]);
  const context = useContext(AuthContext);

  useEffect(() => {
    axios
      .get("/api/workoutPlan/public")
      .then((res) => setWorkoutPlans(res.data))
      .catch((e) => console.error(e));
  }, []);

  useEffect(() => {
    console.log(workoutPlans);
  }, [workoutPlans]);

  const products = [
    {
      title: "The Catalyzer",
      price: "$16.00",
      img: "https://dummyimage.com/420x260",
    },
    {
      title: "Shooting Stars",
      price: "$21.15",
      img: "https://dummyimage.com/421x261",
    },
    {
      title: "Neptune",
      price: "$12.00",
      img: "https://dummyimage.com/422x262",
    },
    {
      title: "The 400 Blows",
      price: "$18.40",
      img: "https://dummyimage.com/423x263",
    },
    {
      title: "The Catalyzer",
      price: "$16.00",
      img: "https://dummyimage.com/424x264",
    },
    {
      title: "Shooting Stars",
      price: "$21.15",
      img: "https://dummyimage.com/425x265",
    },
    {
      title: "Neptune",
      price: "$12.00",
      img: "https://dummyimage.com/427x267",
    },
    {
      title: "The 400 Blows",
      price: "$18.40",
      img: "https://dummyimage.com/428x268",
    },
  ];

  return (
    <section className="text-gray-600 body-font">
      <div className="container px-1 py-12 mx-auto ">
        <div className="flex flex-wrap -m-2 gap-4 justify-center">
          {products.map((product, index) => (
            <div
              key={index}
              className=" bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 lg:w-1/5 md:w-1/3 p-2 w-full"
            >
              <a
                href="#"
                className="block relative h-48 rounded overflow-hidden"
              >
                <img
                  className="rounded-t-lg object-cover object-center w-full h-full block"
                  src={product.img}
                  alt=""
                />
              </a>
              <div className="p-5">
                <a href="#">
                  <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-900 dark:text-white">
                    Noteworthy technology acquisitions 2021
                  </h5>
                </a>
                <p className="mb-3 font-normal text-gray-700 dark:text-gray-400">
                  Here are the biggest enterprise technology acquisitions of
                  2021 so far, in reverse chronological order.
                </p>
                <a
                  href="#"
                  className="inline-flex items-center px-3 py-2 text-sm font-medium text-center text-white bg-blue-700 rounded-lg hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Read more
                  <svg
                    className="rtl:rotate-180 w-3.5 h-3.5 ms-2"
                    aria-hidden="true"
                    xmlns="http://www.w3.org/2000/svg"
                    fill="none"
                    viewBox="0 0 14 10"
                  >
                    <path
                      stroke="currentColor"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      d="M1 5h12m0 0L9 1m4 4L9 9"
                    />
                  </svg>
                </a>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default TemplateStore;
