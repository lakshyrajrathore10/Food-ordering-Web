import React, {  useContext, useState } from "react";
import { assets } from "../assets/assets";
import { Storecontext } from "../context/Storecontext";
import axios from "axios"
const Loginpopup = ({ setshowLogin }) => {

  const {url,setToken} = useContext(Storecontext)

  const [currentState, setcurrentState] = useState("Login");
  const [data, setdata] = useState({
    name: "",
    email: "",
    password: "",
  });

  const onChangeHandler = (event) => {
    const name = event.target.name;
    const value = event.target.value;
    setdata((setdata) => ({ ...data, [name]: value }));
  };


  const handleSubmit = async (e) => {
    e.preventDefault();
    
   let newUrl = url;
   if(currentState==="Login"){
    newUrl += "/api/user/login"
   }
   else{
    newUrl += "/api/user/register"
   }
   const response = await axios.post(newUrl,data);

   if(response.data.success){
     setToken(response.data.token);
     localStorage.setItem("token",response.data.token)
     setshowLogin(false)
   }
   else{
    alert(response.data.message)
   }

  };

  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <form

        onSubmit={handleSubmit}
        className="bg-gradient-to-br from-gray-50 to-gray-100 rounded-2xl shadow-2xl w-full max-w-md overflow-hidden border border-white/20"
      >
        {/* Header with glass effect */}
        <div className="flex justify-between items-center p-6 border-b border-white/20 bg-white/10 backdrop-blur-md">
          <h2 className="text-2xl md:text-3xl font-bold bg-gradient-to-r from-amber-600 to-amber-800 bg-clip-text text-transparent">
            {currentState}
          </h2>
          <button
            type="button"
            
            onClick={() => setshowLogin(false)}
            className="text-amber-700 hover:text-amber-900 transition-colors duration-200 p-2 rounded-full hover:bg-amber-100/50"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M6 18L18 6M6 6l12 12"
              />
            </svg>
          </button>
        </div>

        <div className="p-6 md:p-8 space-y-4 md:space-y-5">
          {currentState === "Sign up" && (
            <div className="relative">
              <input
                type="text"
                name="name"
                value={data.name}
                onChange={onChangeHandler}
                placeholder="Your Name"
                required
                className="w-full px-5 py-3 bg-white/80 backdrop-blur-sm rounded-xl border border-amber-200/50 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 text-gray-700 placeholder-gray-400 transition-all duration-200 shadow-sm pl-12"
              />
              <svg
                className="absolute left-4 top-3.5 h-5 w-5 text-amber-500"
                fill="none"
                viewBox="0 0 24 24"
                stroke="currentColor"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                />
              </svg>
            </div>
          )}

          <div className="relative">
            <input
              type="email"
              name="email"
              value={data.email}
              onChange={onChangeHandler}
              placeholder="Your Email"
              required
              className="w-full px-5 py-3 bg-white/80 backdrop-blur-sm rounded-xl border border-amber-200/50 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 text-gray-700 placeholder-gray-400 transition-all duration-200 shadow-sm pl-12"
            />
            <svg
              className="absolute left-4 top-3.5 h-5 w-5 text-amber-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
              />
            </svg>
          </div>

          <div className="relative">
            <input
              type="password"
              name="password"
              value={data.password}
              onChange={onChangeHandler}
              placeholder="Password"
              required
              className="w-full px-5 py-3 bg-white/80 backdrop-blur-sm rounded-xl border border-amber-200/50 focus:outline-none focus:ring-2 focus:ring-amber-500/30 focus:border-amber-500 text-gray-700 placeholder-gray-400 transition-all duration-200 shadow-sm pl-12"
            />
            <svg
              className="absolute left-4 top-3.5 h-5 w-5 text-amber-500"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M12 15v2m-6 4h12a2 2 0 002-2v-6a2 2 0 00-2-2H6a2 2 0 00-2 2v6a2 2 0 002 2zm10-10V7a4 4 0 00-8 0v4h8z"
              />
            </svg>
          </div>
        </div>

        <div className="px-6 md:px-8 pb-4 md:pb-5 flex items-start">
          <label className="flex items-center space-x-3 cursor-pointer">
            <div className="relative">
              <input type="checkbox" required className="sr-only peer" />
              <div className="w-5 h-5 bg-white/80 border border-amber-300 rounded-md peer-checked:bg-amber-500 transition-all duration-200 flex items-center justify-center">
                <svg
                  className="w-3 h-3 text-white opacity-0 peer-checked:opacity-100 transition-opacity duration-200"
                  fill="none"
                  viewBox="0 0 24 24"
                  stroke="currentColor"
                >
                  <path
                    strokeLinecap="round"
                    strokeLinejoin="round"
                    strokeWidth={2}
                    d="M5 13l4 4L19 7"
                  />
                </svg>
              </div>
            </div>
            <span className="text-sm text-gray-600">
              I agree to the{" "}
              <span className="text-amber-600 hover:underline">Terms</span> and{" "}
              <span className="text-amber-600 hover:underline">
                Privacy Policy
              </span>
            </span>
          </label>
        </div>

        <div className="px-6 md:px-8 pb-6">
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-amber-500 to-amber-600 text-white py-4 rounded-xl font-semibold hover:shadow-lg hover:from-amber-600 hover:to-amber-700 transition-all duration-300 flex items-center justify-center space-x-2 active:scale-95 min-h-[3.5rem]"
          >
            <span>
              {currentState === "Sign up" ? "Create Account" : "Login"}
            </span>
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-5 w-5"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M17 8l4 4m0 0l-4 4m4-4H3"
              />
            </svg>
          </button>
        </div>

        <div className="px-6 md:px-8 pb-6 md:pb-8 text-center">
          {currentState === "Login" ? (
            <p className="text-gray-600">
              Don't have an account?{" "}
              <button
                type="button"
                onClick={() => setcurrentState("Sign up")}
                className="text-amber-600 hover:text-amber-800 font-medium hover:underline transition-colors duration-200 p-1"
              >
                Sign up
              </button>
            </p>
          ) : (
            <p className="text-gray-600">
              Already have an account?{" "}
              <button
                type="button"
                onClick={() => setcurrentState("Login")}
                className="text-amber-600 hover:text-amber-800 font-medium hover:underline transition-colors duration-200 p-1"
              >
                Login
              </button>
            </p>
          )}
        </div>
      </form>
    </div>
  );
};

export default Loginpopup;
