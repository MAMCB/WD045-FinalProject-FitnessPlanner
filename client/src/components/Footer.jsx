import logo from '../assets/Logo_!.png'
import {Link} from 'react-router-dom'


const Footer = () => {
    return (
      <footer className="bg-white shadow dark:bg-gray-900 h-[200px]">
        <div className="w-full max-w-screen-xl mx-auto p-4 md:py-8">
          <div className="sm:flex sm:items-center sm:justify-between">
            <Link
              to={"/"}
              className="flex items-center mb-4 sm:mb-0 space-x-3 rtl:space-x-reverse"
            >
              <img src={logo} className="mr-3 h-9" alt="Logo" />
              <span className="self-center text-2xl font-semibold whitespace-nowrap dark:text-white">
                FitLife
              </span>
            </Link>
            <ul className="flex flex-wrap items-center mb-6 text-sm font-medium text-gray-500 sm:mb-0 dark:text-gray-400">
              <li>
                <Link to={"/about"} className="hover:underline me-4 md:me-6">
                  About
                </Link>
              </li>

              <li>
                <Link to={"/contact"} className="hover:underline me-4 md:me-6">
                  Contact
                </Link>
              </li>
            </ul>
          </div>
          <hr className="my-6 border-gray-200 sm:mx-auto dark:border-gray-700 lg:my-8" />
          <span className="block text-sm text-gray-500 sm:text-center dark:text-gray-400">
            © 2024{" "}
            <Link to={"/"} className="hover:underline">
              FitLife™
            </Link>
            All Rights Reserved.
          </span>
        </div>
      </footer>
    );
  };

  export default Footer