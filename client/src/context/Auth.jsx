/* eslint-disable react/prop-types */
import { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import axios from "../axiosInstance";


export const AuthContext = createContext();

function AuthProvider({ children }) {
  const navigate = useNavigate();
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [errors, setErrors] = useState(null);
  const setState = (user, loading, errors) => {
    setUser(user);
    setLoading(loading);
    setErrors(errors);
  };
  useEffect(() => {
    console.log("authenticating")
    axios
      .get("/auth/user")
      .then((res) => {
        setState(res.data.user, false, null);
        console.log(res.data.user);
      })
      .catch(() => {
        // we don't care about this error so I'm not storing it
        setState(null, false, null);
      });
  }, []);

  const login = (user) => {
    setLoading(true);
    axios
      .post("/auth/login", user)
      .then((res) => {
        setState(res.data.user, false, null);
        navigate("/");
      })
      .catch((err) => {
        setState(null, false, err.response.data);
      });
  };
  const register = (user) => {
    setLoading(true);
    axios
      .post("/auth/register", user)
      .then((res) => {
        setState(res.data.user, false, null);
        navigate("/");
      })
      .catch((err) => {
        setState(null, false, err.response.data.errors);
      });
  };

  const logout = () => {
    axios.get("/auth/logout", {}).then(() => {
      navigate("/");
      window.location.reload();
    });
  };

  return (
    <AuthContext.Provider
      value={{ user, errors, loading, register, login, logout }}
    >
      {children}
    </AuthContext.Provider>
  );
}



export default AuthProvider;
