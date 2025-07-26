import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [emailId, setEmailId] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [password, setPassword] = useState("");
  const [isLoginForm, setIsLoginForm] = useState(true);

  const handleSignUp = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/signup",
        { firstName, lastName, emailId, password },
        { withCredentials: true }
      );
      dispatch(addUser(res.data.data));
      return navigate("/profile");
    } catch (err) {}
  };

  const handleLogin = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        { emailId, password },
        { withCredentials: true }
      );
      //console.log(res.data);
      dispatch(addUser(res.data));
      return navigate("/");
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-rose-50 via-white to-sky-100">
      <div className="bg-white shadow-2xl rounded-xl px-8 py-10 w-full max-w-sm border border-slate-200">
        <h2 className="text-3xl font-extrabold text-center text-rose-600 mb-6">
          {isLoginForm ? "Welcome Back 👋" : "Create Account ✨"}
        </h2>

        <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
          {!isLoginForm && (
            <>
              <div>
                <label className="block text-gray-700 font-semibold mb-1">
                  First Name
                </label>
                <input
                  type="name"
                  value={firstName}
                  placeholder="First Name"
                  className="w-full px-4 py-2 rounded-lg bg-gray-100 border border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                  required
                  onChange={(e) => setFirstName(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-gray-700 font-semibold mb-1">
                  Last Name
                </label>
                <input
                  type="name"
                  value={lastName}
                  placeholder="Last Name"
                  className="w-full px-4 py-2 rounded-lg bg-gray-100 border border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                  required
                  onChange={(e) => setLastName(e.target.value)}
                />
              </div>
            </>
          )}
          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Email
            </label>
            <input
              type="email"
              value={emailId}
              placeholder="you@devmail.com"
              className="w-full px-4 py-2 rounded-lg bg-gray-100 border border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-400"
              required
              onChange={(e) => setEmailId(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-gray-700 font-semibold mb-1">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                className="w-full px-4 py-2 rounded-lg bg-gray-100 border border-gray-300 text-gray-900 focus:outline-none focus:ring-2 focus:ring-emerald-400"
                required
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-3 flex items-center text-sm text-emerald-500 hover:text-emerald-600"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <button
            type="submit"
            onClick={isLoginForm ? handleLogin : handleSignUp}
            className="w-full py-2 px-4 bg-emerald-500 hover:bg-emerald-600 text-white font-semibold rounded-lg shadow-md transition duration-300 cursor-pointer"
          >
            {isLoginForm ? "Log In" : "Sign Up"}
          </button>
        </form>

        <p
          onClick={() => setIsLoginForm((value) => !value)}
          className="mt-6 text-center text-sm text-gray-600 cursor-pointer"
        >
          {isLoginForm ? "Don't have an account?" : "Already have an account?"}{" "}
          <span className="text-emerald-600 hover:underline font-medium">
            {isLoginForm ? "Sign Up" : "Log In"}
          </span>
        </p>
      </div>
    </div>
  );
};

export default Login;
