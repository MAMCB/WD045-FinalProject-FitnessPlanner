import NavbarForHome from "./NavbarForHome"
import linkedin from "../assets/linkedin.png";

const About = () =>{
   
    const developers = [
      {
        id: 1,
        name: "Ana",
        image: "https://www.w3schools.com/howto/img_avatar2.png",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda, rerum sit. Alias quia quisquam labore beatae, impedit rerum aspernatur placeat! In amet veritatis dignissimos ipsam, laborum eum cumque molestias sit?",
        contact: "#",
      },
      {
        id: 2,
        name: "Miguel",
        image: "https://avatars.githubusercontent.com/u/96302464?v=4",
        description:
          "Borned in Brazil, raised in Portugal and now living in Germany. I came from a background in Tourism where i worked with adventure activities. As such i was always very active and interested in sports. With also a great passion for programming, building this app was a great way to combine both passions. I was responsible mostly for the backend and the database of the app. I also worked on the frontend working on the editor and search exercise functionality. I am very proud of the result and i am looking forward to add new features to it.",
        contact: "https://www.linkedin.com/in/borges-miguel/",
      },
      {
        id: 3,
        name: "Darko",
        image: "https://www.w3schools.com/howto/img_avatar.png",
        description:
          "Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda, rerum sit. Alias quia quisquam labore beatae, impedit rerum aspernatur placeat! In amet veritatis dignissimos ipsam, laborum eum cumque molestias sit?",
        contact: "#",
      },
    ];
    
    
    
    return (
      <>
        <NavbarForHome />
        <section className="bg-white shadow dark:bg-gray-900 py-[100px] px-[40px]">
          <div className="mb-[50px] w-[96%] lg:w-[800px] lg:m-auto">
            <h2 className="mb-4 text-center text-4xl font-bold tracking-tight text-gray-500 dark:text-gray-400">
              About Us
            </h2>
            <p className="text-center text-gray-500 mb-6 dark:text-gray-400">
              We are a group of Fullstack Web Developer graduates from
              WBS-Coding School.This was our final project for the batch of
              October 2023 to February 2024, where we applied all our knowledge
              by creating this MERN stack Web application with authentication
              and full CRUD functionalities. The idea of the app came from the need of wanting to have an application where the user can create, store and track all their fitness workout history, creating in this way a hub for their own personal fitness activities. Made in only 3 weeks we are very
              proud of our results and aim to add new features to it in the near
              future.
            </p>
          </div>
          <div className="text-gray-500 sm:mb-0 dark:text-gray-400 body-font">
            <div className="container px-1 py-12 mx-auto ">
              <div className="flex flex-wrap -m-2 gap-4 justify-center">
                {developers.map((dev) => (
                  <div
                    key={dev.id}
                    className=" bg-white border border-gray-200 rounded-lg shadow dark:bg-gray-800 dark:border-gray-700 lg:w-1/5 md:w-1/3 p-2 w-full flex flex-col justify-between"
                  >
                    <img
                      className="rounded-t-lg object-cover object-center w-full h-full block"
                      src={dev.image}
                      alt=""
                    />

                    <div className="p-5 flex-grow">
                      <h5 className="mb-2 text-2xl font-bold tracking-tight text-gray-500 sm:mb-0 dark:text-gray-400">
                        {dev.name}
                      </h5>
                    </div>
                    <div>
                      <p className="text-gray-500 sm:mb-0 dark:text-gray-400">
                        {dev.description}
                      </p>
                    </div>
                    <div className="flex justify-center">
                      <a href={dev.contact} target="_blank">
                        <img
                          src={linkedin}
                          className="m-auto mt-4 h-9"
                          alt="Logo"
                        />
                      </a>
                      </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        </section>
      </>
    );
}

export default About