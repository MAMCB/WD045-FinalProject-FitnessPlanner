import React from "react";
import { Link, Navigate } from "react-router-dom";
import { useState, useContext } from "react";
import { AuthContext } from "../context/Auth";
import {Input} from "./Input";
import { useForm, FormProvider, useFormContext } from "react-hook-form";

const Register = () => {
  const context = useContext(AuthContext);
  const errors = context.errors;
  const methods = useForm();
  console.log({ context });

  const [user, setUser] = useState({
    username: "",
    email: "",
    password: "",
    confirmPassword: "",
  });

  /* const handleChange = (e) => {
    const { name, value } = e.target;
    setUser({ ...user, [name]: value });
    console.log(user);
  }; */
  /* const handleSubmit = (e) => {
    e.preventDefault();
    console.log(context);
    context.register(user);
  }; */
  const handleSubmit = methods.handleSubmit((data) => {
    
    console.log(data);
  });
  // if user exist go to home
  if (context.user) {
    return <Navigate to="/" />;
  }
  if (!context.loading && !context.user) {
    return (
      <section className="bg-gray-50 dark:bg-gray-900">
        <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0">
          <a
            href="#"
            className="flex items-center mb-6 text-2xl font-semibold text-gray-900 dark:text-white"
          >
            <img
              className="w-8 h-8 mr-2"
              src="https://flowbite.s3.amazonaws.com/blocks/marketing-ui/logo.svg"
              alt="logo"
            />
            FitLife
          </a>
          <div className="w-full bg-white rounded-lg shadow dark:border md:mt-0 sm:max-w-md xl:p-0 dark:bg-gray-800 dark:border-gray-700">
            <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
              <h1 className="text-xl font-bold leading-tight tracking-tight text-gray-900 md:text-2xl dark:text-white">
                Create an account
              </h1>
              <FormProvider {...methods}>
                <form
                  className="space-y-4 md:space-y-6"
                  onSubmit={(e) => e.preventDefault()}
                  noValidate
                >
                  <div>
                    <Input
                      label="Username"
                      type="text"
                      id="username"
                      placeholder="type your name..."
                    />

                    {/*                     <label
                      htmlFor=""
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Username:
                    </label>
                    {errors?.username && (
                      <p className="text-danger">{errors?.username.message}</p>
                    )}
                    <input
                      type="text"
                      name="username"
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      value={user.username}
                      onChange={handleChange} 
                      placeholder="username"
                      required
                    /> */}

                    <Input
                      label="Your email"
                      type="email"
                      id="email"
                      placeholder="name@company.com"
                    />

                    {/*                     <label
                      htmlFor="email"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Your email
                    </label>
                    {errors?.email && (
                      <p className="text-danger">{errors?.email.message}</p>
                    )}
                    <input
                      type="email"
                      name="email"
                      id="email"
                      autoComplete="new-email"
                      placeholder="name@company.com"
                       value={user.email}
                    onChange={handleChange} 
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      required
                    /> */}

                    <Input
                      label="Password"
                      type="password"
                      id="password"
                      placeholder="••••••••"
                    />
                  </div>
                  <div>
                    <Input
                      label="Confirm password"
                      type="password"
                      id="confirm-password"
                      placeholder="••••••••"
                    />
                    {/* <label
                      htmlFor="password"
                      className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                    >
                      Password
                    </label>
                    {errors?.password && (
                      <p className="text-danger">{errors?.password.message}</p>
                    )}

                    <input
                      type="password"
                      name="password"
                      id="password"
                      placeholder="••••••••"
                      autoComplete="new-password"
                      value={user.password}
                    onChange={handleChange}
                      className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                      required
                    /> */}
                  </div>
                  <div>
                    <div>
                      {/* <label
                        type="confirm-password"
                        className="block mb-2 text-sm font-medium text-gray-900 dark:text-white"
                      >
                        Confirm password
                      </label>
                      {errors?.confirmPassword && (
                        <p className="text-danger">
                          {errors?.confirmPassword.message}
                        </p>
                      )}
                      <input
                        type="password"
                        name="confirmPassword"
                        id="confirm-password"
                        placeholder="••••••••"
                        autoComplete="new-password"
                        value={user.confirmPassword}
                      onChange={handleChange}
                        className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-blue-500 dark:focus:border-blue-500"
                        required
                      /> */}
                    </div>
                    <button
                      /* type="submit" */
                      onClick={handleSubmit}
                      className="w-full mt-4 mb-4 text-white bg-primaryOne hover:bg-secondary focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center dark:bg-primary-600 dark:hover:bg-primary-700 dark:focus:ring-primary-800"
                    >
                      Create an account
                    </button>
                    <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                      Already have an account?{" "}
                      <Link
                        to="/login"
                        className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                      >
                        Login here
                      </Link>
                    </p>
                  </div>
                </form>
              </FormProvider>
            </div>
          </div>
        </div>
      </section>
    );
  }
};

export default Register;
