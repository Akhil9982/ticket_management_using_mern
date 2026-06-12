import SignUpIllustrations from "../assets/sign-up.svg?react";
import { useForm } from "react-hook-form";
import axios from "axios";
import { Link } from "react-router-dom";

const Signup = () => {
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const { register, handleSubmit } = useForm();
  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/api/auth/users/register`,
        data,
      );
      console.log("Success: ", response.data);
    } catch (error) {
      console.error("Submission failed: ", error.response?.data || error);
    }
  };
  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-600">
      <div className="max-w-lg w-full">
        <div
          style={{
            boxShadow:
              "0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04)",
          }}
          className="bg-gray-800 rounded-lg shadow-xl overflow-hidden"
        >
          <div className="p-8">
            <SignUpIllustrations className="w-full h-full text-center" />
            <h2 className="text-center text-3xl font-extrabold text-white">
              Sign Up
            </h2>
            <p className="mt-4 text-center text-gray-400">
              Just a few quick things to get started
            </p>
            <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
              <div className="rounded-md shadow-sm">
                <div>
                  <label className="sr-only" htmlFor="name">
                    Name
                  </label>
                  <input
                    placeholder="Enter Your Name"
                    className="appearance-none relative block w-full px-3 py-3 border border-gray-700 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    required
                    type="text"
                    autoComplete="name"
                    id="name"
                    {...register("name")}
                  />
                </div>
                <div className="mt-4">
                  <label className="sr-only" htmlFor="email">
                    Email address
                  </label>
                  <input
                    placeholder="Email address"
                    className="appearance-none relative block w-full px-3 py-3 border border-gray-700 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    required
                    autoComplete="email"
                    type="email"
                    {...register("email")}
                    id="email"
                  />
                </div>
                <div className="mt-4">
                  <label className="sr-only" htmlFor="password">
                    Password
                  </label>
                  <input
                    placeholder="Password"
                    className="appearance-none relative block w-full px-3 py-3 border border-gray-700 bg-gray-700 text-white rounded-md focus:outline-none focus:ring-indigo-500 focus:border-indigo-500 focus:z-10 sm:text-sm"
                    required
                    autoComplete="current-password"
                    type="password"
                    {...register("password")}
                    id="password"
                  />
                </div>
                <div className="w-full px-8 py-8 bg-gray-800 flex flex-col gap-5 mt-4 rounded-lg shadow-[0px_0px_20px_rgba(0,0,0,0.3)]">
                  <legend className="text-sm font-bold mb-2 text-gray-400 select-none">
                    Choose One
                  </legend>
                  <label
                    htmlFor="customer"
                    name="status"
                    className="font-medium h-10 relative hover:bg-gray-700 transition-all duration-300 flex items-center px-5 gap-3 rounded-lg has-checked:text-indigo-400 has-checked:bg-gray-700 has-checked:ring-indigo-500 has-checked:ring-2 select-none cursor-pointer"
                  >
                    <span className="text-gray-400">Customer</span>
                    <input
                      defaultChecked
                      type="radio"
                      {...register("status")}
                      value="customer"
                      className="peer/customer w-4 h-4 absolute accent-indigo-400 right-5 transition-all duration-300"
                      id="customer"
                    />
                    <span className="absolute right-5 w-4 h-4 rounded-full border-2 border-gray-400 peer-checked/customer:border-indigo-400 peer-checked/customer:bg-indigo-400 transition-all duration-300" />
                  </label>
                  <label
                    htmlFor="admin"
                    className="font-medium h-10 relative hover:bg-gray-700 transition-all duration-300 flex items-center px-5 gap-3 rounded-lg has-checked:text-indigo-400 has-checked:bg-gray-700 has-checked:ring-indigo-500 has-checked:ring-2 select-none cursor-pointer"
                  >
                    <span className="text-gray-400">Admin</span>
                    <input
                      type="radio"
                      {...register("status")}
                      value="admin"
                      className="peer/admin w-4 h-4 absolute accent-indigo-400 right-5 transition-all duration-300"
                      id="admin"
                    />
                    <span className="absolute right-5 w-4 h-4 rounded-full border-2 border-gray-400 peer-checked/admin:border-indigo-400 peer-checked/admin:bg-indigo-400 transition-all duration-300" />
                  </label>
                  <label
                    htmlFor="agent"
                    name="status"
                    className="font-medium h-10 relative hover:bg-gray-700 transition-all duration-300 flex items-center px-5 gap-3 rounded-lg has-checked:text-indigo-400 has-checked:bg-gray-700 has-checked:ring-indigo-500 has-checked:ring-2 select-none cursor-pointer"
                  >
                    <span className="text-gray-400">Agent</span>
                    <input
                      type="radio"
                      {...register("status")}
                      className="peer/agent w-4 h-4 absolute accent-indigo-400 right-5 transition-all duration-300"
                      id="agent"
                      value="agent"
                    />
                    <span className="absolute right-5 w-4 h-4 rounded-full border-2 border-gray-400 peer-checked/agent:border-indigo-400 peer-checked/agent:bg-indigo-400 transition-all duration-300" />
                  </label>
                </div>
              </div>
              <div>
                <button
                  className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-gray-900 bg-indigo-500 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  type="submit"
                >
                  Sign Up
                </button>
              </div>
            </form>
          </div>
          <div className="px-8 py-4 bg-gray-700 text-center">
            <span className="text-gray-400">Have an account? </span>
            <Link
              className="font-medium text-indigo-500 hover:text-indigo-400"
              to="/Login"
            >
              Sign in
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Signup;
