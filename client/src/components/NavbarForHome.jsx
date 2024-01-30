import React, { useEffect } from 'react'
import { Avatar, Dropdown, Navbar } from "flowbite-react";
import { useContext, useState } from 'react'
import { AuthContext } from "../context/Auth";
import logo from '../assets/Logo_!.png'
import Profile from './Profile';
import { NavLink } from 'react-router-dom';
const NavbarForHome = () => {

  const context = useContext(AuthContext);
  console.log(context)
  console.log(context.user)

  const [theme, setTheme] = useState("dark");

  useEffect(() => {
    if (theme === "dark") {
        document.documentElement.classList.add('dark');
    } else {
        document.documentElement.classList.remove('dark')
    }
  }
  ,[theme])

  const handleToggleTheme = () => {
    setTheme(theme === "light" ? "dark" : "light");
    console.log(theme)
   };
    
  const handleLogOut = () => {
    if (context) {
      context.logout();
    }
  }

  
  return (
    <Navbar fluid className="dark:bg-black">
      <Navbar.Brand>
        <img src={logo} className="mr-3 h-9" alt="Logo" />
        <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
          <NavLink to={"/"}>FitLife</NavLink>
        </span>
      </Navbar.Brand>
      <div className="flex md:order-2">
        <Dropdown
          arrowIcon={false}
          inline
          label={
            <Avatar
              alt="User settings"
              img={
                context.user
                  ? context.user.profilePicture
                  : "https://lh6.googleusercontent.com/proxy/i3o6o_HVc0XQaPNEpxAVDJw1QyLH6LRIw_OxAKjhOm5lZQDimRQYyz9_vIGDpMnEliSpI6AKhSbDqvzc4zIDdg3Cx5HAaLvjhE0dfz-Wns9I89ULsgeG8w=s0-d"
              }
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
              <NavLink to={"/profile"}>Profile</NavLink>
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
        <Navbar.Link href="#" className={context.user ? "" : "hidden"}>
          Your workouts
        </Navbar.Link>
        <Navbar.Link href="#" className={context.user ? "" : "hidden"}>
          Editor
        </Navbar.Link>
        <Navbar.Link href="#" className={context.user ? "" : "hidden"}>
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

}


export default NavbarForHome