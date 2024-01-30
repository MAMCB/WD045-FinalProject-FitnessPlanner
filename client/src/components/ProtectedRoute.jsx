import { useContext } from "react";
import { Navigate, Outlet } from "react-router-dom";
import { AuthContext } from "../context/Auth";
import NavbarForHome from "./NavbarforHome";

function Protected() {
  const { user, loading } = useContext(AuthContext);

  return (
    <>
      {!loading && (
        <>
          {user ? (
            <>
              <NavbarForHome />
              <Outlet />
            </>
          ) : (
            <Navigate to="/landingPage" />
          )}
        </>
      )}
    </>
  );
}

export default Protected;
