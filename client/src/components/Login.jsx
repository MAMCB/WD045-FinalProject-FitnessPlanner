import React from "react";
import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/Auth";
import { Navigate } from "react-router-dom";
import { useForm, FormProvider, useFormContext } from "react-hook-form";
import { Input } from "./Input";
import NavbarForHome from "./NavbarForHome";

const Login = () => {
  const context = useContext(AuthContext);
  const errors_ = context.errors;
  const methods = useForm();

  const email_Validation = {
    name: "email",
    label: "Email",
    type: "email",
    id: "email",
    placeholder: "type your email ...",
    validation: {
      required: {
        value: true,
        message: "Email is required",
      },
      pattern: {
        value:
          /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        message: "Invalid email address",
      },
    },
  };

  const password_Validation = {
    name: "password",
    label: "Password",
    type: "password",
    id: "password",
    placeholder: "type password ...",
    validation: {
      required: {
        value: true,
        message: "required",
      },
      minLength: {
        value: 8,
        message: "min 8 characters",
      },
    },
  };

  const handleSubmit = methods.handleSubmit((data) => {
    context.login(data);
  });
  if (!context.loading && context.user) {
    return <Navigate to="/" />;
  }

  if (!context.loading && !context.user) {
    return (
      <>
        <NavbarForHome />
        {context.errors?.message}
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
                  Sign in to your account
                </h1>
                <FormProvider {...methods}>
                  <form
                    className="space-y-4 md:space-y-6"
                    onSubmit={(e) => e.preventDefault()}
                    noValidate
                    autoComplete="off"
                  >
                    <div>
                      <Input {...email_Validation} />
                      <Input {...password_Validation} />
                    </div>
                    <div></div>
                    <div>
                      <div className="flex items-start">
                        <a
                          href="#"
                          className="text-sm font-medium text-primary-600 hover:underline dark:text-primary-500"
                        >
                          Forgot password?
                        </a>
                      </div>
                      <button
                        onClick={handleSubmit}
                        className="w-full group mb-5 flex items-center justify-center p-0.5 text-center font-medium relative focus:z-10 focus:outline-none text-white bg-cyan-700 border border-transparent enabled:hover:bg-cyan-800 focus:ring-cyan-300 dark:bg-cyan-600 dark:enabled:hover:bg-cyan-700 dark:focus:ring-cyan-800 rounded-lg focus:ring-2"
                      >
                      <span className="flex items-center transition-all duration-200 rounded-md text-sm px-4 py-2">Sign in</span>
                      </button>
                      <p className="text-sm font-light text-gray-500 dark:text-gray-400">
                        Don’t have an account yet?{" "}
                        <Link
                          to="/register"
                          className="font-medium text-primary-600 hover:underline dark:text-primary-500"
                        >
                          Sign up
                        </Link>
                      </p>
                    </div>
                  </form>
                </FormProvider>
              </div>
            </div>
          </div>
        </section>
      </>
    );
  }
};

export default Login;
