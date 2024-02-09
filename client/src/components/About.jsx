import NavbarForHome from "./NavbarForHome"

const About = () =>{
   
    const developers = [
        {
            id:1,
            name:"Ana",
            image:"https://www.w3schools.com/howto/img_avatar2.png",
            description:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda, rerum sit. Alias quia quisquam labore beatae, impedit rerum aspernatur placeat! In amet veritatis dignissimos ipsam, laborum eum cumque molestias sit?"
        },
        {
            id:2,
            name:"Miguel",
            image:"https://www.w3schools.com/howto/img_avatar.png",
            description:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda, rerum sit. Alias quia quisquam labore beatae, impedit rerum aspernatur placeat! In amet veritatis dignissimos ipsam, laborum eum cumque molestias sit?"
        },
        {
            id:3,
            name:"Darko",
            image:"https://www.w3schools.com/howto/img_avatar.png",
            description:"Lorem ipsum dolor sit amet, consectetur adipisicing elit. Assumenda, rerum sit. Alias quia quisquam labore beatae, impedit rerum aspernatur placeat! In amet veritatis dignissimos ipsam, laborum eum cumque molestias sit?"
        }
    ]
    
    
    
    return(
        <>
         <NavbarForHome/>
        <section className="bg-white shadow dark:bg-gray-900 py-[100px] px-[40px]">
           <div className="mb-[50px] w-[96%] lg:w-[800px] lg:m-auto">
           <h2 className="mb-4 text-center text-4xl font-bold tracking-tight text-gray-500 dark:text-gray-400">About Us</h2>
            <p className="text-center text-gray-500 mb-6 dark:text-gray-400">Lorem ipsum dolor sit amet consectetur adipisicing elit. Quaerat vero optio nihil temporibus voluptatem, asperiores natus doloribus odit, fuga sint quibusdam quia, modi nam ipsum sit qui amet enim fugit.</p>
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
                <p className="text-gray-500 sm:mb-0 dark:text-gray-400">{dev.description}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
        </section>
        </>
    )
}

export default About