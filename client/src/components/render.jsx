<>
  {!isWorkoutStarted ? (
    <>
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="flex flex-col items-center justify-center p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Are you ready to start?
              </h1>
              <div className="flex items-center p-4 gap-3 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                <Link
                  to="/"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Return to Home Page
                </Link>
                <button
                  onClick={() => {
                    setIsWorkoutStarted(true);
                  }}
                  type="button"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Star Workout
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  ) : !isWorkoutFinished ? (
    <section className="p-5 mx-auto body-font dark:bg-gray-900 min-h-100">
      <div className="container mx-auto flex flex-col gap-3 h-full">
        <div className="flex  mb-4 gap-2">
          <button
            onClick={handlePauseButton}
            data-modal-target="default-modal"
            data-modal-toggle="pause-modal"
          >
            <FontAwesomeIcon icon={faCirclePause} className="h-10" />
          </button>
          <button
            onClick={handlePauseButton}
            data-modal-target="default-modal"
            data-modal-toggle="pause-modal"
            type="button"
          >
            <FontAwesomeIcon icon={faCircleStop} className="h-10" />
          </button>

          <StaticModal
            modal_id="pause-modal"
            modal_title="Pause workout"
            modal_description="Your workout is paused"
            nameBtnOne="Return to workout"
            nameBtnTwo="End workout"
            setIsWorkoutPaus={setIsWorkoutPaused}
            setIsWorkoutFin={setIsWorkoutFinished}
            setIsModalOp={setIsModalOpen}
            isModalOpen={isModalOpen}
          />

          <StaticModal
            modal_id="stop-modal"
            modal_title="Stop workout"
            modal_description="Your workout is stopped"
            nameBtnOne="Return to workout"
            nameBtnTwo="End workout"
            setIsWorkoutPaus={setIsWorkoutPaused}
            setIsWorkoutFin={setIsWorkoutFinished}
            setIsModalOp={setIsModalOpen}
            isModalOpen={isModalOpen}
          />
        </div>

        <div className="mb-2">
          <p>
            {!isExerciseFinished
              ? workoutDataExample.exercises[currentExerciseIndex].name
              : "Rest time"}
          </p>
        </div>
        <div className="img max-w-[500px] max-h-[500px] m-auto">
          {!isExerciseFinished ? (
            <img
              alt="exercise"
              className="lg:w-1/2 w-full sm:h-100 lg:h-auto h-100 object-cover object-center rounded"
              src={workoutDataExample.exercises[currentExerciseIndex].image}
            ></img>
          ) : animationData ? (
            <Lottie options={defaultOptions} />
          ) : null}
          <div>
            Remain time :
            {!isExerciseFinished ? remainingTime : remainingTimeInRest}
          </div>
        </div>
        <div className="flex flex-col">
          <div>
            {!isExerciseFinished
              ? `Description : ${workoutDataExample.exercises[currentExerciseIndex].description}`
              : ""}
          </div>
          <div className="side panel">
            <p>
              {currentExerciseIndex + 1 < workoutDataExample.exercises.length &&
              !isExerciseFinished
                ? `Next exercise: ${
                    workoutDataExample.exercises[currentExerciseIndex + 1].name
                  }`
                : ""}
            </p>
          </div>
        </div>

        <div className="bottom panel"></div>
      </div>
    </section>
  ) : (
    <>
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="flex flex-col items-center justify-center p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Workout is finished
              </h1>
              <div className="flex items-center p-4 md:p-5 border-t border-gray-200 rounded-b dark:border-gray-600">
                <Link
                  to="/"
                  className="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800"
                >
                  Return to Home Page
                </Link>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  )}
</>;
