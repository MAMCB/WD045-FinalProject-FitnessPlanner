import React from 'react'
import { Navbar,Button } from 'flowbite-react'
import { useContext } from 'react'
import { Link } from 'react-router-dom'
import { AuthContext } from "../context/Auth";
const NavbarForHome = () => {
    const context = useContext(AuthContext);
    
  const handleLogOut = () => {
    context.logout();
  }
  return (
    <Navbar fluid className="dark:bg-black dark:text-white ">
      <Link to="/">
        <div className="flex s">
        
          <span className="self-center whitespace-nowrap text-xl font-semibold dark:text-white">
            Navbar
          </span>
        </div>
      </Link>
      <Button onClick={handleLogOut}>Log out</Button>
    </Navbar>
  )

}


export default NavbarForHome