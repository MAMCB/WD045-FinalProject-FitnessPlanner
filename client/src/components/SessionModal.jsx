import React from 'react'
import { Button } from 'flowbite-react'

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
            ? "overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full backdrop-blur-md"
            : "hidden overflow-y-auto overflow-x-hidden fixed top-0 right-0 left-0 z-50 justify-center items-center w-full md:inset-0 h-[calc(100%-1rem)] max-h-full"
        }
      >
        <div className="bg-gray-400 p-1 m-auto text-black w-1/2 rounded-lg">
          <h1 className="m-10">Workout session</h1>
          <h2 className='m-10'>{sessions[0]?.finishedDate.substr(-29,10)}</h2>
          <ul>
            {sessions.map((session) => (
              <>
                <li key={session._id} className="m-10">
                  <h3>{session.finishedDate.substr(11, 8)}</h3>
                  <p>Version: {session.version}</p>
                  <p>Workout completed: {session.completed.toString()}</p>
                  {session.comments.map((comment, index) => (
                    <p key={index}>{comment}</p>
                  ))}
                </li>
                <hr />
              </>
            ))}
          </ul>
          <Button className="m-auto" onClick={handleClose}>
            Close
          </Button>
        </div>
      </div>
    </>
  );
}

export default SessionModal