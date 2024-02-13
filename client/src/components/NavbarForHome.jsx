import React, { useEffect } from "react";
import { Avatar, Dropdown, Navbar } from "flowbite-react";
import { useContext, useState } from "react";
import { AuthContext } from "../context/Auth";
import logo from "../assets/Logo_!.png";
import Profile from "./Profile";
import { NavLink, useLocation } from "react-router-dom";
import axios from "../axiosInstance";
import userAvatar from "../assets/userAvatar.png";
import { useNavigate } from "react-router-dom";


const NavbarForHome = () => {
  const context = useContext(AuthContext);
  const [currentUser, setCurrentUser] = useState({});
  const location = useLocation();
  const navigate = useNavigate();

  useEffect(() => {
    if (context.user) {
      axios
        .get(`api/user/${context.user._id}`)
        .then((res) => {
          setCurrentUser(res.data);
          console.log(res.data);
        })
        .catch((e) => console.error(e));
    }
  }, []);

  console.log(currentUser.profilePic);

  // Theme start
  const [theme, setTheme] = useState(localStorage.getItem("theme") || "dark");
  

  useEffect(() => {
    localStorage.setItem("theme", theme);
    if (theme === "dark") {
      document.documentElement.classList.add("dark");
    } else {
      document.documentElement.classList.remove("dark");
    }
   
  }, [theme]);

  const handleToggleTheme = () => {
    const newTheme = theme === "light" ? "dark" : "light";
    setTheme(newTheme);
    if(location.pathname === "/contact")
    {
      window.location.reload();
    }
    
  };

  //Theme end

  const handleLogOut = () => {
    if (context) {
      context.logout();
    }
  };

  return (
    <Navbar fluid className="dark:bg-black">
      <Navbar.Brand href="/">
        <img src={logo} className="mr-3 h-9" alt="Logo" />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          FitLife
        </span>
      </Navbar.Brand>
      <div className="flex md:order-2">
        <Dropdown
          arrowIcon={false}
          inline
          label={
            <Avatar
              alt="User settings"
              img={currentUser.profilePic ? currentUser.profilePic : userAvatar}
              rounded
              className="mr-1"
            />
          }
        >
          <Dropdown.Header>
            <span className="block text-sm">Hello</span>
            <span className="block truncate text-sm font-medium">
              {context.user ? context.user.username : "User"}
            </span>
          </Dropdown.Header>
          <Dropdown.Item>
            {context.user ? (
              <NavLink to={"/dashboard"}>Dashboard</NavLink>
            ) : (
              <NavLink to={"/register"}>Register</NavLink>
            )}
          </Dropdown.Item>
          <Dropdown.Item>
            {context.user ? (
              <div
                onClick={() => navigate("/profile")}
                style={{ cursor: "pointer" }}
                className="inline-block w-full text-left dark:text-white"
              >
                Profile
              </div>
            ) : (
              <NavLink to={"/login"}>Sign in</NavLink>
            )}
          </Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item
            onClick={handleLogOut}
            className={context.user ? "" : "hidden"}
          >
            Sign out
          </Dropdown.Item>
        </Dropdown>
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Navbar.Link href="/" active>
          Home
        </Navbar.Link>
        <Navbar.Link
          href="/workoutPlan"
          className={context.user ? "" : "hidden"}
        >
          Your workouts
        </Navbar.Link>
        <Navbar.Link href="/editor" className={context.user ? "" : "hidden"}>
          Editor
        </Navbar.Link>
        <Navbar.Link
          href="/templateStore"
          className={context.user ? "" : "hidden"}
        >
          Template Store
        </Navbar.Link>
        <button
          onClick={handleToggleTheme}
          className="dark:bg-black  dark:text-white"
          type="button"
          color="primary"
        >
          {theme === "light" ? "Dark mode" : "Light mode"}
        </button>
      </Navbar.Collapse>
    </Navbar>
  );
};

export default NavbarForHome;
