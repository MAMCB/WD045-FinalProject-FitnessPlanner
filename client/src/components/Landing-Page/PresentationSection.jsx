import bodyBuilding from "../../assets/gym-2.jpeg";
import timeIcon from "../../assets/time-svgrepo-com.svg";
import workoutIcon from "../../assets/workout.svg";


const PresentationSection = () => {
  return (
    <section className="relative bg-black-color py-[100px]">
      <div className="flex w-100 max-w-7xl mx-auto">
        <div className="w-3/5 pr-[50px]">
          <h2 className="text-primary-color mb-[50px] uppercase text-6xl font-bold">
            Start
            <span className="rounded-xl bottom-[15px] m-3 py-1 px-6 relative inline-block  border border-primary-color text-2xl">
              transforming
            </span>
            your fitness journey today
          </h2>
          <p className="text-primary-color text-xl">
            The ultimate app for accessing top-notch personal trainers who will
            help you reach your fitness goals. Whether you're a beginner or an
            experienced fitness enthusiast, our team of certified coaches is
            here to provide personalized training programs tailored to your
            needs. From strength training and weight loss to muscle building and
            flexibility, we've got you covered. Get ready to transform your body
            and enhance your overall well-being with the guidance of our
            dedicated personal trainers.
          </p>
          <div className="flex mt-[50px]">
            <div className="w-1/3 flex flex-wrap flex-col justify-center content-center max-w-sm min-h-72 p-6 m-0.5 bg-pale-sky rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
              <div className="h-24 w-24 mr-auto ml-auto mb-4">
              <img className="h-full w-full text-center" src={timeIcon} alt="" />
              </div>
              <p className="font-normal text-primary-color text-center">
                Track Your Achievement.
              </p>
            </div>
            <div className="w-1/3 flex flex-wrap flex-col justify-center content-center max-w-sm min-h-72 p-6 m-0.5  bg-pale-sky border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
            <div className="h-24 w-24 mr-auto ml-auto mb-4">
            <img className="h-full w-full" src={workoutIcon} alt="" />
            </div>
              <p className="font-normal text-primary-color text-center">
                Track Your Achievement.
              </p>
            </div>

            <div className="flex w-1/3 flex-wrap flex-col justify-center content-center max-w-sm min-h-72 p-6 m-0.5  bg-pale-sky border border-gray-200 rounded-lg shadow hover:bg-gray-100 dark:bg-gray-800 dark:border-gray-700 dark:hover:bg-gray-700">
              <div className="h-24 w-24 mr-auto ml-auto mb-4">
            <img className="h-full w-full" src={timeIcon} alt="" />
            </div>
              <p className="font-normal text-primary-color text-center">
                Track Your Achievement.
              </p>
            </div>
            <div></div>
            <div></div>
          </div>
        </div>
        <div className="w-2/5">
          <div className="h-[800px] border-2 rounded-lg border-box-shadow  border-primary-color">
            <img
              className="h-[100%] width-[100%] object-cover rounded-lg"
              src={bodyBuilding}
              alt="Bodybuilding Image"
            />
          </div>
        </div>
      </div>
    </section>
  );
};

export default PresentationSection;
