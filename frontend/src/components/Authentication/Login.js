import React, { useState } from "react";
import { Link } from "react-router-dom";
import { ToastContainer, toast } from "react-toastify";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = () => {
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  //   const navigate = useNavigate();
  var emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  var passwordRegex = /^(?=.*\d)(?=.*[!@#$%^&*])(?=.*[a-z])(?=.*[A-Z]).{8,15}$/;

  const validateForm = () => {
    if (!emailRegex.test(email)) {
      toast.error("Email is required");
      return false;
    } else if (!passwordRegex.test(password)) {
      toast.error("Password is required");
      return false;
    }

    return true;
  };

  const callLogin = async () => {
    if (validateForm()) {
      const userData = {
        email: email,
        password: password,
      };
      const login_url = `${process.env.REACT_APP_API_URL}/api/auth/login`;

      const response = await axios.post(login_url, userData);
      if (response.status === 400) {
        toast.error(response.data.message);
      } else {
        toast.success("Login successful");
        localStorage.setItem("token", response.data.token);
        localStorage.setItem("userId", response.data.userId);
        navigate("/fileupload");
      }
    }
  };
  return (
    <>
      <ToastContainer />
      <div className="flex flex-col items-center justify-center px-6 py-8 mx-auto md:h-screen lg:py-0 h-screen    ">
        <div className="w-full bg-slate-300 rounded-lg shadow-xl border-2 md:mt-0 sm:max-w-md xl:p-0 z-50">
          <div className="p-6 space-y-4 md:space-y-6 sm:p-8">
            <h1 className="text-xl font-bold leading-tight items-center tracking-tight text-gray-900 md:text-2xl ">
              Login here ...
            </h1>
            <div className="space-y-4 md:space-y-6">
              <div>
                <label
                  for="email"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Email
                </label>
                <input
                  type="email"
                  id="email"
                  value={email}
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  placeholder="xyz@gmail.com"
                  required=""
                  onChange={(e) => setEmail(e.target.value)}
                />
              </div>
              <div>
                <label
                  for="password"
                  className="block mb-2 text-sm font-medium text-gray-900"
                >
                  Password
                </label>
                <input
                  type="password"
                  name="password"
                  id="password"
                  value={password}
                  placeholder="••••••••"
                  className="bg-gray-50 border border-gray-300 text-gray-900 sm:text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5"
                  required=""
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
              <div className="flex items-start">
                <div className="flex items-center h-5">
                  <input
                    id="terms"
                    aria-describedby="terms"
                    type="checkbox"
                    className="w-4 h-4 border border-gray-300 rounded bg-gray-50 focus:ring-3 focus:ring-primary-300"
                    required=""
                  />
                </div>
                <div className="ml-3 text-black text-sm">
                  <label for="terms">
                    I want to{" "}
                    <a
                      className="font-medium text-blue-700 hover:underline dark:text-primary-500"
                      href="/"
                    >
                      subsribe to the email services
                    </a>
                  </label>
                </div>
              </div>
              <button
                type="submit"
                onClick={callLogin}
                className="w-full text-white bg-black focus:ring-4 focus:outline-none focus:ring-primary-300 font-medium rounded-lg text-sm px-5 py-2.5 text-center"
              >
                LOGIN
              </button>
              <p className="text-sm text-black">
                Already have an account?{" "}
                <Link to={"/signup"}>
                  <span className="font-medium text-blue-700 hover:underline">
                    Signup here
                  </span>
                </Link>
                {/* </Link> */}
                {/* <a href="/" className="font-medium text-blue-700 hover:underline">
                    Login here
                  </a> */}
              </p>
            </div>
          </div>
        </div>
      </div>
    </>
  );
};

export default Login;
