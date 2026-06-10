import SignInIllustrations from "../assets/sign-in.svg?react";
import { useForm } from "react-hook-form";
import axios from "axios";
const Login = () => {
  const { register, handleSubmit } = useForm();
  const BASE_URL = import.meta.env.VITE_BASE_URL;
  const onSubmit = async (data) => {
    try {
      const response = await axios.post(
        `${BASE_URL}/api/auth/users/login`,
        data,
      );
      if (response.data && response.data.token) {
        localStorage.setItem("token", response.data.token);
      }
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
            <SignInIllustrations className="w-full h-full text-center" />
            <h2 className="text-center text-3xl font-extrabold text-white">
              Sign In
            </h2>
            <p className="mt-4 text-center text-gray-400">
              Welcome back you've been missed
            </p>
            <form onSubmit={handleSubmit(onSubmit)} className="mt-8 space-y-6">
              <div className="rounded-md shadow-sm">
                <div>
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
              </div>
              <div>
                <button
                  className="group relative w-full flex justify-center py-3 px-4 border border-transparent text-sm font-medium rounded-md text-gray-900 bg-indigo-500 hover:bg-indigo-600 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
                  type="submit"
                >
                  Sign In
                </button>
              </div>
            </form>
          </div>
          <div className="px-8 py-4 bg-gray-700 text-center">
            <span className="text-gray-400">Don't have an account? </span>
            <a
              className="font-medium text-indigo-500 hover:text-indigo-400"
              href="#"
            >
              Sign up
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
