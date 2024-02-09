import React from "react";

const StaticModal = ({
  modal_id,
  modal_description,
  modal_title,
  setIsWorkoutPaus,
  setIsWorkoutFin,
  setIsModalOp,
  nameBtnOne,
  nameBtnTwo,
  setisModalOpen,
  isModalOpen,
  setIsWorkoutStarted,
}) => {
  const HandleClosedBtn = () => {
    setIsModalOp(false);
    setIsWorkoutPaus(false);
    console.log("closed");
  };

  const handleButtonOne = () => {
    setIsWorkoutPaus(false);
    setIsModalOp(false);
    console.log(
      modal_id,
      modal_description,
      modal_title,
      nameBtnOne,
      nameBtnTwo,
      setIsWorkoutStarted
    );
  };

  const handleButtonTwo = () => {
    setIsWorkoutFin(true);
    setIsWorkoutStarted(false);
  };
  return (
    <>
      <div
        id={modal_id}
        data-modal-backdrop="static"
        tabIndex="-1"
        aria-hidden={isModalOpen ? "true" : "false"}
        className={
          isModalOpen
            ? "overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full backdrop-blur-md"
            : "hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
        }
      >
        <div className="relative p-4 w-full max-w-2xl max-h-full flex justify-center items-center m-auto">
          <div className="relative bg-white rounded-lg shadow dark:bg-gray-700">
            <div className="flex items-center justify-between p-4 md:p-5 border-b rounded-t dark:border-gray-600 g">
              <h3 className="text-xl font-semibold  text-gray-500 dark:text-gray-400">
                {modal_title}
              </h3>
              <button
                type="button"
                onClick={HandleClosedBtn}
                data-modal-hide={modal_id}
                className="text-gray-400 bg-transparent hover:bg-gray-200 hover:text-gray-900 rounded-lg text-sm w-8 h-8 ms-auto inline-flex justify-center items-center dark:hover:bg-gray-600 dark:hover:text-white"
              >
                <svg
                  className="w-3 h-3"
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
                <span className=" text-gray-500 dark:text-gray-400 sr-only">Close modal</span>
              </button>
            </div>

            <div className="p-4 md:p-5 space-y-4">{modal_description}</div>

            <div className="flex items-center p-4 gap-3 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
              <button
                onClick={handleButtonOne}
                data-modal-hide="static-modal"
                type="button"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                {nameBtnOne}
              </button>
              <button
                onClick={handleButtonTwo}
                data-modal-hide="static-modal"
                type="button"
                className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
              >
                {nameBtnTwo}
              </button>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default StaticModal;
