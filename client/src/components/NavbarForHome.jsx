import React from 'react'
import { Avatar, Dropdown, Navbar } from "flowbite-react";
import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from "../context/Auth";
import logo from '../assets/Logo_!.png'
const NavbarForHome = () => {

  const context = useContext(AuthContext);
  console.log(context.user)
    
  const handleLogOut = () => {
    context.logout();
  }

  
  return (
    <Navbar fluid rounded>
      <Navbar.Brand>
        <img
          src={logo}
          className="mr-3 h-6 sm:h-9"
          alt="Logo"
          />
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
              /* img="https://flowbite.com/docs/images/people/profile-picture-5.jpg" */
              img={context.user.profilePicture}
              rounded
            />
          }
        >
          <Dropdown.Header>
            <span className="block text-sm">Hello</span>
            <span className="block truncate text-sm font-medium">
              {context.user.username}
            </span>
          </Dropdown.Header>
          <Dropdown.Item>Dashboard</Dropdown.Item>
          <Dropdown.Item>Profile</Dropdown.Item>
          <Dropdown.Divider />
          <Dropdown.Item onClick={handleLogOut}>Sign out</Dropdown.Item>
        </Dropdown>
        <Navbar.Toggle />
      </div>
      <Navbar.Collapse>
        <Navbar.Link href="/" active>
          Home
        </Navbar.Link>
        <Navbar.Link href="#">Your workouts</Navbar.Link>
        <Navbar.Link href="#">Editor</Navbar.Link>
        <Navbar.Link href="#">Template Store</Navbar.Link>
      </Navbar.Collapse>
    </Navbar>
  );

}


export default NavbarForHome