import React from "react";
import { useState } from "react";

const ExercisesModel = ({ setIsModalOpn, workoutExer }) => {
  console.log(workoutExer);
  const [expandedItem, setExpandedItem] = useState(null);
  return (
    <>
      <div
        id="ExercisesModel"
        data-modal-backdrop="static"
        tabIndex="-1"
        aria-hidden="true"
        className="h-lvh overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 w-full backdrop-blur-md justify-center"
      >
        <div className="relative p-4 w-full flex justify-center m-auto overflow-y-auto">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700 md:w-1/2 w-lvw">
            <div className="flex justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 ">
              <h3 className="text-xl font-semibold text-gray-900 dark:text-white">
                {workoutExer.name}
              </h3>
              <button
                type="button"
                onClick={() => setIsModalOpn(false)}
                data-modal-hide="ExercisesModel"
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              >
                <svg
                  className="md:w-3 h-3"
                  aria-hidden="true"
                  xmlns="http://www.w3.org/2000/svg"
                  fill="none"
                  viewBox="0 0 14 14"
                >
                  <path
                    stroke="currentColor"
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth="2"
                    d="m1 1 6 6m0 0 6 6M7 7l6-6M7 7l-6 6"
                  />
                </svg>
                <span className="sr-only">Close modal</span>
              </button>
            </div>
            <div className="p-4 md:p-5 space-y-4">
              <div id="accordion-collapse" data-accordion="collapse">
                {workoutExer.exercises.map((workout, index) => (
                  <div
                    key={index}
                    className="border-b border-gray-200 dark:border-gray-700"
                  >
                    <h2
                      id={`accordion-collapse-heading-${index}`}
                      onClick={() =>
                        setExpandedItem(expandedItem === index ? null : index)
                      }
                      className="flex items-center justify-between p-5 font-medium rtl:text-right text-gray-500 border border-b-0 border-gray-200 rounded-t-xl focus:ring-4 focus:ring-gray-200 dark:focus:ring-gray-800 dark:border-gray-700 dark:text-gray-400 hover:bg-gray-100 dark:hover:bg-gray-800 gap-3"
                      data-accordion-target={`#accordion-collapse-body-${index}`}
                      aria-expanded="true"
                      aria-controls={`accordion-collapse-body-${index}`}
                    >
                      <span>
                        {workout.exercise.name.charAt(0).toUpperCase() +
                          workout.exercise.name.slice(1)}
                      </span>
                      <svg
                        data-accordion-icon=""
                        className="md:w-3 w-full h-3 rotate-180 shrink-0"
                        aria-hidden="true"
                        xmlns="http://www.w3.org/2000/svg"
                        fill="none"
                        viewBox="0 0 10 6"
                      >
                        <path
                          stroke="currentColor"
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          strokeWidth={2}
                          d="M9 5 5 1 1 5"
                        />
                      </svg>
                    </h2>
                    <div
                      id={`accordion-collapse-body-${index}`}
                      className={expandedItem === index ? "" : "hidden"}
                      aria-labelledby={`accordion-collapse-heading-${index}`}
                    >
                      <div className="p-5 border border-b-0 border-gray-200 dark:border-gray-700 flex flex-col lg:flex-row gap-3 overflow-hidden ">
                        <div>
                          <img
                            src={workout.exercise.image}
                            alt="exercise"
                            className="max-w-xs"
                          />
                        </div>
                        <div className="flex flex-col flex-nowrap min-w-1.5">
                          <p className="text-gray-500 dark:text-gray-400">
                            Exercise Duration: {workout.duration}
                          </p>
                          <p className="text-gray-500 dark:text-gray-400">
                            Exercise Equipment: {workout.exercise.equipment}
                          </p>
                          <p className="text-gray-500 dark:text-gray-400">
                            Exercise Sets: {workout.sets}
                          </p>
                          <p className="text-gray-500 dark:text-gray-400">
                            Exercise description: {workout.exercise.description}
                          </p>
                        </div>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default ExercisesModel;
