
import Slider from "react-slick";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

const TestimonialsSection = () => {
  const settings = {
    dots: true,
    infinite: true,
    slidesToShow: 3,
    slidesToScroll: 1,
    arrows: true,
    autoplay: true,
    autoplaySpeed: 10000,
    speed: 2000,
    responsive: [
      {
        breakpoint: 920,
        settings: {
          slidesToShow: 2,
          slidesToScroll: 1,
        },
      },
      {
        breakpoint: 768,
        settings: {
          slidesToShow: 1,
          slidesToScroll: 1,
        },
      },
    ],
  };
  return (
    <section className="relative bg-black-color py-[100px] overflow-hidden">
      <h2 className="text-2xl lg:text-6xl text-center text-primary-color mb-[150px] uppercase font-bold">
        Testimonials
      </h2>

      <Slider {...settings}>
        <div className="border-box-shadow mb-8  p-8  border-2 text-primary-color button border-primary-color rounded-lg shadow">
          <svg
            width={40}
            viewBox="0 0 47 38"
            height={30}
            fill="#4FB5A9"
            xmlns="http://www.w3.org/2000/svg"
            className="block comment__icon comment__icon__right"
          >
            <path
              xmlns="http://www.w3.org/2000/svg"
              d="m20.8889 4.21442c-2.2112 1.26432-3.999 2.36475-5.3634 3.30129-1.3643.88971-2.7522 2.0838-4.1636 3.58229-1.3174 1.4048-2.32887 2.8798-3.03457 4.4251-.70571 1.5453-1.1997 3.5354-1.48198 5.9704h3.38735c2.9169 0 5.1987.7258 6.8454 2.1775 1.6937 1.4048 2.5405 3.4886 2.5405 6.2514 0 1.9667-.7527 3.8164-2.2582 5.5489-1.4585 1.6858-3.4815 2.5287-6.0691 2.5287-4.04606 0-6.93945-1.3112-8.68019-3.9335-1.74074-2.6691-2.61111-6.1577-2.61111-10.4658 0-3.0437.658659-5.8065 1.97598-8.2883 1.31731-2.5287 2.91691-4.7764 4.7988-6.74308 1.92892-2.01356 3.97542-3.72274 6.13962-5.12755 2.1642-1.4048 3.9755-2.55206 5.4339-3.44177zm26.1111 0c-2.2112 1.26432-3.999 2.36475-5.3634 3.30129-1.3643.88971-2.7522 2.0838-4.1636 3.58229-1.3644 1.4516-2.3994 2.9501-3.1051 4.4953-.6587 1.4985-1.1292 3.4652-1.4114 5.9002h3.3873c2.917 0 5.1987.7258 6.8454 2.1775 1.6937 1.4048 2.5405 3.4886 2.5405 6.2514 0 1.9667-.7527 3.8164-2.2582 5.5489-1.4585 1.6858-3.4815 2.5287-6.0691 2.5287-4.046 0-6.9394-1.3112-8.6802-3.9335-1.7407-2.6691-2.6111-6.1577-2.6111-10.4658 0-3.0437.6587-5.8065 1.976-8.2883 1.3173-2.5287 2.9169-4.7764 4.7988-6.74308 1.9289-2.01356 3.9755-3.72274 6.1396-5.12755 2.1642-1.4048 3.9755-2.55206 5.434-3.44177z"
            />
          </svg>

          <p className="font-normal text-primary-color mt-10 text-lg">
            As someone who is always on the go, this app has been a game-changer
            for my fitness journey. The workout plans are diverse and adaptable
            to my schedule, and the progress tracking keeps me motivated every
            step of the way!
          </p>
          <div className="flex justify-start items-center mt-6">
            <div className="h-16 w-16 overflow-hidden rounded-full">
              <img
                className="h-full w-full object-cover"
                src="https://www.bodybuilding.com/images/2017/march/raise-the-bar-on-triceps-long-head-growth-MUSCLETECH-header-v3-830x467.jpg"
                alt=""
              />
            </div>
            <p className="ml-4">John Doe</p>
          </div>
        </div>
        <div className="border-box-shadow mb-8  p-8  border-2 text-primary-color button border-primary-color rounded-lg shadow">
          <svg
            width={40}
            viewBox="0 0 47 38"
            height={30}
            fill="#4FB5A9"
            xmlns="http://www.w3.org/2000/svg"
            className="block comment__icon comment__icon__right"
          >
            <path
              xmlns="http://www.w3.org/2000/svg"
              d="m20.8889 4.21442c-2.2112 1.26432-3.999 2.36475-5.3634 3.30129-1.3643.88971-2.7522 2.0838-4.1636 3.58229-1.3174 1.4048-2.32887 2.8798-3.03457 4.4251-.70571 1.5453-1.1997 3.5354-1.48198 5.9704h3.38735c2.9169 0 5.1987.7258 6.8454 2.1775 1.6937 1.4048 2.5405 3.4886 2.5405 6.2514 0 1.9667-.7527 3.8164-2.2582 5.5489-1.4585 1.6858-3.4815 2.5287-6.0691 2.5287-4.04606 0-6.93945-1.3112-8.68019-3.9335-1.74074-2.6691-2.61111-6.1577-2.61111-10.4658 0-3.0437.658659-5.8065 1.97598-8.2883 1.31731-2.5287 2.91691-4.7764 4.7988-6.74308 1.92892-2.01356 3.97542-3.72274 6.13962-5.12755 2.1642-1.4048 3.9755-2.55206 5.4339-3.44177zm26.1111 0c-2.2112 1.26432-3.999 2.36475-5.3634 3.30129-1.3643.88971-2.7522 2.0838-4.1636 3.58229-1.3644 1.4516-2.3994 2.9501-3.1051 4.4953-.6587 1.4985-1.1292 3.4652-1.4114 5.9002h3.3873c2.917 0 5.1987.7258 6.8454 2.1775 1.6937 1.4048 2.5405 3.4886 2.5405 6.2514 0 1.9667-.7527 3.8164-2.2582 5.5489-1.4585 1.6858-3.4815 2.5287-6.0691 2.5287-4.046 0-6.9394-1.3112-8.6802-3.9335-1.7407-2.6691-2.6111-6.1577-2.6111-10.4658 0-3.0437.6587-5.8065 1.976-8.2883 1.3173-2.5287 2.9169-4.7764 4.7988-6.74308 1.9289-2.01356 3.9755-3.72274 6.1396-5.12755 2.1642-1.4048 3.9755-2.55206 5.434-3.44177z"
            />
          </svg>

          <p className="font-normal text-primary-color mt-10 text-lg">
            I have tried numerous fitness apps before, but none compare to this
            one. The exercise library is extensive, catering to both beginners
            and seasoned athletes. Plus, the nutritional guidance is a fantastic
            bonus for anyone serious about their gains!
          </p>
          <div className="flex justify-start items-center mt-6">
            <div className="h-16 w-16 overflow-hidden rounded-full">
              <img
                className="h-full w-full object-cover"
                src="https://www.bodybuilding.com/images/2017/march/raise-the-bar-on-triceps-long-head-growth-MUSCLETECH-header-v3-830x467.jpg"
                alt=""
              />
            </div>
            <p className="ml-4">John Doe</p>
          </div>
        </div>
        <div className="border-box-shadow mb-8  p-8  border-2 text-primary-color button border-primary-color rounded-lg shadow">
          <svg
            width={40}
            viewBox="0 0 47 38"
            height={30}
            fill="#4FB5A9"
            xmlns="http://www.w3.org/2000/svg"
            className="block comment__icon comment__icon__right"
          >
            <path
              xmlns="http://www.w3.org/2000/svg"
              d="m20.8889 4.21442c-2.2112 1.26432-3.999 2.36475-5.3634 3.30129-1.3643.88971-2.7522 2.0838-4.1636 3.58229-1.3174 1.4048-2.32887 2.8798-3.03457 4.4251-.70571 1.5453-1.1997 3.5354-1.48198 5.9704h3.38735c2.9169 0 5.1987.7258 6.8454 2.1775 1.6937 1.4048 2.5405 3.4886 2.5405 6.2514 0 1.9667-.7527 3.8164-2.2582 5.5489-1.4585 1.6858-3.4815 2.5287-6.0691 2.5287-4.04606 0-6.93945-1.3112-8.68019-3.9335-1.74074-2.6691-2.61111-6.1577-2.61111-10.4658 0-3.0437.658659-5.8065 1.97598-8.2883 1.31731-2.5287 2.91691-4.7764 4.7988-6.74308 1.92892-2.01356 3.97542-3.72274 6.13962-5.12755 2.1642-1.4048 3.9755-2.55206 5.4339-3.44177zm26.1111 0c-2.2112 1.26432-3.999 2.36475-5.3634 3.30129-1.3643.88971-2.7522 2.0838-4.1636 3.58229-1.3644 1.4516-2.3994 2.9501-3.1051 4.4953-.6587 1.4985-1.1292 3.4652-1.4114 5.9002h3.3873c2.917 0 5.1987.7258 6.8454 2.1775 1.6937 1.4048 2.5405 3.4886 2.5405 6.2514 0 1.9667-.7527 3.8164-2.2582 5.5489-1.4585 1.6858-3.4815 2.5287-6.0691 2.5287-4.046 0-6.9394-1.3112-8.6802-3.9335-1.7407-2.6691-2.6111-6.1577-2.6111-10.4658 0-3.0437.6587-5.8065 1.976-8.2883 1.3173-2.5287 2.9169-4.7764 4.7988-6.74308 1.9289-2.01356 3.9755-3.72274 6.1396-5.12755 2.1642-1.4048 3.9755-2.55206 5.434-3.44177z"
            />
          </svg>

          <p className="font-normal text-primary-color mt-10 text-lg">
            Being a busy professional, finding time for the gym was a challenge
            until I discovered this app. With its customizable workout plans and
            quick, effective routines, I can squeeze in a session anytime,
            anywhere. It is like having a personal trainer in my pocket!
          </p>
          <div className="flex justify-start items-center mt-6">
            <div className="h-16 w-16 overflow-hidden rounded-full">
              <img
                className="h-full w-full object-cover"
                src="https://www.bodybuilding.com/images/2017/march/raise-the-bar-on-triceps-long-head-growth-MUSCLETECH-header-v3-830x467.jpg"
                alt=""
              />
            </div>
            <p className="ml-4">John Doe</p>
          </div>
        </div>
        <div className="border-box-shadow mb-8  p-8  border-2 text-primary-color button border-primary-color rounded-lg shadow">
          <svg
            width={40}
            viewBox="0 0 47 38"
            height={30}
            fill="#4FB5A9"
            xmlns="http://www.w3.org/2000/svg"
            className="block comment__icon comment__icon__right"
          >
            <path
              xmlns="http://www.w3.org/2000/svg"
              d="m20.8889 4.21442c-2.2112 1.26432-3.999 2.36475-5.3634 3.30129-1.3643.88971-2.7522 2.0838-4.1636 3.58229-1.3174 1.4048-2.32887 2.8798-3.03457 4.4251-.70571 1.5453-1.1997 3.5354-1.48198 5.9704h3.38735c2.9169 0 5.1987.7258 6.8454 2.1775 1.6937 1.4048 2.5405 3.4886 2.5405 6.2514 0 1.9667-.7527 3.8164-2.2582 5.5489-1.4585 1.6858-3.4815 2.5287-6.0691 2.5287-4.04606 0-6.93945-1.3112-8.68019-3.9335-1.74074-2.6691-2.61111-6.1577-2.61111-10.4658 0-3.0437.658659-5.8065 1.97598-8.2883 1.31731-2.5287 2.91691-4.7764 4.7988-6.74308 1.92892-2.01356 3.97542-3.72274 6.13962-5.12755 2.1642-1.4048 3.9755-2.55206 5.4339-3.44177zm26.1111 0c-2.2112 1.26432-3.999 2.36475-5.3634 3.30129-1.3643.88971-2.7522 2.0838-4.1636 3.58229-1.3644 1.4516-2.3994 2.9501-3.1051 4.4953-.6587 1.4985-1.1292 3.4652-1.4114 5.9002h3.3873c2.917 0 5.1987.7258 6.8454 2.1775 1.6937 1.4048 2.5405 3.4886 2.5405 6.2514 0 1.9667-.7527 3.8164-2.2582 5.5489-1.4585 1.6858-3.4815 2.5287-6.0691 2.5287-4.046 0-6.9394-1.3112-8.6802-3.9335-1.7407-2.6691-2.6111-6.1577-2.6111-10.4658 0-3.0437.6587-5.8065 1.976-8.2883 1.3173-2.5287 2.9169-4.7764 4.7988-6.74308 1.9289-2.01356 3.9755-3.72274 6.1396-5.12755 2.1642-1.4048 3.9755-2.55206 5.434-3.44177z"
            />
          </svg>

          <p className="font-normal text-primary-color mt-10 text-lg">
            I haveve been using this app to prep for my first bodybuilding
            competition, and I couldn't be happier with the results. The
            detailed workout plans and expert tips have helped me pack on muscle
            mass while maintaining peak performance. It's truly a must-have for
            serious lifters!
          </p>
          <div className="flex justify-start items-center mt-6">
            <div className="h-16 w-16 overflow-hidden rounded-full">
              <img
                className="h-full w-full object-cover"
                src="https://www.bodybuilding.com/images/2017/march/raise-the-bar-on-triceps-long-head-growth-MUSCLETECH-header-v3-830x467.jpg"
                alt=""
              />
            </div>
            <p className="ml-4">John Doe</p>
          </div>
        </div>
        <div className="border-box-shadow mb-8  p-8  border-2 text-primary-color button border-primary-color rounded-lg shadow">
          <svg
            width={40}
            viewBox="0 0 47 38"
            height={30}
            fill="#4FB5A9"
            xmlns="http://www.w3.org/2000/svg"
            className="block comment__icon comment__icon__right"
          >
            <path
              xmlns="http://www.w3.org/2000/svg"
              d="m20.8889 4.21442c-2.2112 1.26432-3.999 2.36475-5.3634 3.30129-1.3643.88971-2.7522 2.0838-4.1636 3.58229-1.3174 1.4048-2.32887 2.8798-3.03457 4.4251-.70571 1.5453-1.1997 3.5354-1.48198 5.9704h3.38735c2.9169 0 5.1987.7258 6.8454 2.1775 1.6937 1.4048 2.5405 3.4886 2.5405 6.2514 0 1.9667-.7527 3.8164-2.2582 5.5489-1.4585 1.6858-3.4815 2.5287-6.0691 2.5287-4.04606 0-6.93945-1.3112-8.68019-3.9335-1.74074-2.6691-2.61111-6.1577-2.61111-10.4658 0-3.0437.658659-5.8065 1.97598-8.2883 1.31731-2.5287 2.91691-4.7764 4.7988-6.74308 1.92892-2.01356 3.97542-3.72274 6.13962-5.12755 2.1642-1.4048 3.9755-2.55206 5.4339-3.44177zm26.1111 0c-2.2112 1.26432-3.999 2.36475-5.3634 3.30129-1.3643.88971-2.7522 2.0838-4.1636 3.58229-1.3644 1.4516-2.3994 2.9501-3.1051 4.4953-.6587 1.4985-1.1292 3.4652-1.4114 5.9002h3.3873c2.917 0 5.1987.7258 6.8454 2.1775 1.6937 1.4048 2.5405 3.4886 2.5405 6.2514 0 1.9667-.7527 3.8164-2.2582 5.5489-1.4585 1.6858-3.4815 2.5287-6.0691 2.5287-4.046 0-6.9394-1.3112-8.6802-3.9335-1.7407-2.6691-2.6111-6.1577-2.6111-10.4658 0-3.0437.6587-5.8065 1.976-8.2883 1.3173-2.5287 2.9169-4.7764 4.7988-6.74308 1.9289-2.01356 3.9755-3.72274 6.1396-5.12755 2.1642-1.4048 3.9755-2.55206 5.434-3.44177z"
            />
          </svg>

          <p className="font-normal text-primary-color mt-10 text-lg">
            Being a busy professional, finding time for the gym was a challenge
            until I discovered this app. With its customizable workout plans and
            quick, effective routines, I can squeeze in a session anytime,
            anywhere. It is like having a personal trainer in my pocket!
          </p>
          <div className="flex justify-start items-center mt-6">
            <div className="h-16 w-16 overflow-hidden rounded-full">
              <img
                className="h-full w-full object-cover"
                src="https://www.bodybuilding.com/images/2017/march/raise-the-bar-on-triceps-long-head-growth-MUSCLETECH-header-v3-830x467.jpg"
                alt=""
              />
            </div>
            <p className="ml-4">John Doe</p>
          </div>
        </div>
        <div className="border-box-shadow mb-8  p-8  border-2 text-primary-color button border-primary-color rounded-lg shadow">
          <svg
            width={40}
            viewBox="0 0 47 38"
            height={30}
            fill="#4FB5A9"
            xmlns="http://www.w3.org/2000/svg"
            className="block comment__icon comment__icon__right"
          >
            <path
              xmlns="http://www.w3.org/2000/svg"
              d="m20.8889 4.21442c-2.2112 1.26432-3.999 2.36475-5.3634 3.30129-1.3643.88971-2.7522 2.0838-4.1636 3.58229-1.3174 1.4048-2.32887 2.8798-3.03457 4.4251-.70571 1.5453-1.1997 3.5354-1.48198 5.9704h3.38735c2.9169 0 5.1987.7258 6.8454 2.1775 1.6937 1.4048 2.5405 3.4886 2.5405 6.2514 0 1.9667-.7527 3.8164-2.2582 5.5489-1.4585 1.6858-3.4815 2.5287-6.0691 2.5287-4.04606 0-6.93945-1.3112-8.68019-3.9335-1.74074-2.6691-2.61111-6.1577-2.61111-10.4658 0-3.0437.658659-5.8065 1.97598-8.2883 1.31731-2.5287 2.91691-4.7764 4.7988-6.74308 1.92892-2.01356 3.97542-3.72274 6.13962-5.12755 2.1642-1.4048 3.9755-2.55206 5.4339-3.44177zm26.1111 0c-2.2112 1.26432-3.999 2.36475-5.3634 3.30129-1.3643.88971-2.7522 2.0838-4.1636 3.58229-1.3644 1.4516-2.3994 2.9501-3.1051 4.4953-.6587 1.4985-1.1292 3.4652-1.4114 5.9002h3.3873c2.917 0 5.1987.7258 6.8454 2.1775 1.6937 1.4048 2.5405 3.4886 2.5405 6.2514 0 1.9667-.7527 3.8164-2.2582 5.5489-1.4585 1.6858-3.4815 2.5287-6.0691 2.5287-4.046 0-6.9394-1.3112-8.6802-3.9335-1.7407-2.6691-2.6111-6.1577-2.6111-10.4658 0-3.0437.6587-5.8065 1.976-8.2883 1.3173-2.5287 2.9169-4.7764 4.7988-6.74308 1.9289-2.01356 3.9755-3.72274 6.1396-5.12755 2.1642-1.4048 3.9755-2.55206 5.434-3.44177z"
            />
          </svg>

          <p className="font-normal text-primary-color mt-10 text-lg">
            After struggling to stay consistent with my fitness routine, this
            app has been a lifesaver. The intuitive interface makes it easy to
            track my progress and stay accountable, while the variety of
            workouts keeps things interesting. I've never felt stronger or more
            confident in my body!
          </p>
          <div className="flex justify-start items-center mt-6">
            <div className="h-16 w-16 overflow-hidden rounded-full">
              <img
                className="h-full w-full object-cover"
                src="https://www.bodybuilding.com/images/2017/march/raise-the-bar-on-triceps-long-head-growth-MUSCLETECH-header-v3-830x467.jpg"
                alt=""
              />
            </div>
            <p className="ml-4">John Doe</p>
          </div>
        </div>
      </Slider>
    </section>
  );
};

export default TestimonialsSection;

