/* eslint-disable react/prop-types */
import React from 'react'
import {Button} from "flowbite-react"


const SessionModal = ({isModalOpen,hideModal,sessions}) => {
 

    const handleClose = () => {
        hideModal();
    }
  return (
    <>
      <div
        data-modal-backdrop="static"
        tabIndex="-1"
        aria-hidden={isModalOpen ? "true" : "false"}
        className={
          isModalOpen
            ? "overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%)] max-h-full backdrop-blur-md"
            : "hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
        }
      >
        <div className="bg-gray-400 p-1 mt-9 m-auto text-black w-4/5 md:w-1/2 rounded-lg relative flex items-center justify-center justify-self-center content-center self-center place-content-center place-items-center place-self-center flex-col">
          <div className="flex mt-10 gap-2 ">
            <h1 className="">Workout session</h1>
          </div>
          <h2 className="mt-5">
            Data: {sessions[0]?.finishedDate.substr(-29, 10)}
          </h2>
          <ul className="text-center">
            {sessions.map((session) => (
              <div key={session._id}>
                <h2>{session.workoutId?.name}</h2>
                <li
                  className="m-5 flex items-center justify-center justify-self-center content-center self-center place-content-center place-items-center place-self-center flex-col"
                >
                  <h3>
                    Time when finished: {session.finishedDate.substr(11, 8)}
                  </h3>
                  <p>Version: {session.version}</p>
                  <p>
                    {session.completed
                      ? "Workout was successfully completed"
                      : "Workout was not completed"}
                  </p>
                  {session.comments.map((comment, index) => (
                    <p key={index}>Comment: {comment}</p>
                  ))}
                </li>
                <hr />
              </div>
            ))}
          </ul>
          <Button className="mt-3 mb-3" onClick={handleClose}>
            Close
          </Button>
        </div>
      </div>
    </>
  );
}

export default SessionModal