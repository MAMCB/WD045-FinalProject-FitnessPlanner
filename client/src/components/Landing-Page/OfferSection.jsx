import fitnessGirl from "../../assets/fitness-girl.jpg";

const OfferSection = () => {
  return (
    <section className="relative bg-primary-color py-[100px]">
       <div className="flex w-100 max-w-7xl mx-auto">
      <div className="w-2/5">
        <div className="h-[800px] border-2 rounded-lg  border-black-color">
          <img
            className="h-[100%] width-[100%] object-cover rounded-lg"
            src={fitnessGirl}
            alt="Bodybuilding Image"
          />
        </div>
      </div>
      <div className="flex w-100 max-w-7xl mx-auto">
        <ul className="flex w-100 flex-col flex-wrap justify-center align-center">
          <li className="text-4xl text-center p-5 text-primary-color mb-6 bg-black-color rounded-3xl">Personalized Workout</li>
          <li className="text-4xl text-center p-5 text-primary-color mb-6 bg-black-color rounded-3xl">Visualize Your Progress</li>
          <li className="text-4xl text-center p-5 text-primary-color mb-6 bg-black-color rounded-3xl">Smart Scheduling</li>
          <li  className="text-4xl text-center p-5 text-primary-color mb-6 bg-black-color rounded-3xl">Real-Time Workouts</li>
        </ul>
      </div>
      </div>
    </section>
  );
};

export default OfferSection;
