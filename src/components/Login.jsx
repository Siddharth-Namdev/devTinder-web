import axios from "axios";
import React, { useState } from "react";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router";
import { BASE_URL} from "../utils/constants";

const Login = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [showPassword, setShowPassword] = useState(false);
  const [emailId, setEmailId] = useState("Goldi@gmail.com");
  const [password, setPassword] = useState("Goldi12@");

  const handleLogin = async () => {
    try {
      const res = await axios.post(
         BASE_URL+"/login",
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
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-100 via-white to-indigo-100">
      <div className="bg-white shadow-2xl rounded-xl px-8 py-10 w-full max-w-sm border border-slate-200">
        <h2 className="text-3xl font-extrabold text-center text-indigo-600 mb-6">
          Welcome Back 👋
        </h2>

        <form className="space-y-5" onSubmit={(e) => e.preventDefault()}>
          <div>
            <label className="block text-slate-700 font-medium mb-1">
              Email{" "}
            </label>
            <input
              type="email"
              value={emailId}
              placeholder="you@devmail.com"
              className="w-full px-4 py-2 rounded-md bg-slate-100 border border-slate-300 text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-400"
              required
              onChange={(e) => setEmailId(e.target.value)}
            />
          </div>

          <div>
            <label className="block text-slate-700 font-medium mb-1">
              Password
            </label>
            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="••••••••"
                value={password}
                className="w-full px-4 py-2 rounded-md bg-slate-100 border border-slate-300 text-gray-800 focus:outline-none focus:ring-2 focus:ring-indigo-400"
                required
                onChange={(e) => setPassword(e.target.value)}
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-3 flex items-center text-sm text-indigo-500 hover:text-indigo-600"
              >
                {showPassword ? "Hide" : "Show"}
              </button>
            </div>
          </div>

          <button
            type="submit"
            onClick={handleLogin}
            className="w-full py-2 px-4 bg-indigo-500 hover:bg-indigo-600 text-white font-semibold rounded-md shadow transition duration-300"
          >
            Log In
          </button>
        </form>

        <p className="mt-6 text-center text-sm text-gray-500">
          Don't have an account?{" "}
          <a href="#" className="text-indigo-500 hover:underline font-medium">
            Sign Up
          </a>
        </p>
      </div>
    </div>
  );
};

export default Login;

// import React, { useState } from "react";

// const Login = () => {
//   const [showPassword, setShowPassword] = useState(false);

//   return (
//     <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-900 via-gray-800 to-gray-900">
//       <div className="bg-gray-950 shadow-xl rounded-2xl p-8 w-full max-w-sm border border-gray-800">
//         <h2 className="text-3xl font-bold text-center text-cyan-400 mb-6">
//           DevMatch Login
//         </h2>

//         <form className="space-y-5">
//           <div>
//             <label className="block text-gray-300 font-medium mb-1">
//               Email
//             </label>
//             <input
//               type="email"
//               placeholder="developer@example.com"
//               className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-cyan-500"
//               required
//             />
//           </div>

//           <div>
//             <label className="block text-gray-300 font-medium mb-1">
//               Password
//             </label>
//             <div className="relative">
//               <input
//                 type={showPassword ? "text" : "password"}
//                 placeholder="••••••••"
//                 className="w-full px-4 py-2 rounded-lg bg-gray-800 text-white border border-gray-700 focus:outline-none focus:ring-2 focus:ring-cyan-500"
//                 required
//               />
//               <button
//                 type="button"
//                 onClick={() => setShowPassword(!showPassword)}
//                 className="absolute inset-y-0 right-3 flex items-center text-sm text-cyan-400 hover:text-cyan-300 focus:outline-none"
//               >
//                 {showPassword ? "Hide" : "Show"}
//               </button>
//             </div>
//           </div>

//           <button
//             type="submit"
//             className="w-full py-2 px-4 bg-cyan-500 hover:bg-cyan-600 text-white font-semibold rounded-lg shadow-md transition duration-300"
//           >
//             Login
//           </button>
//         </form>

//         <p className="mt-6 text-center text-sm text-gray-400">
//           New to DevMatch?{" "}
//           <a href="#" className="text-cyan-400 hover:underline">
//             Create an account
//           </a>
//         </p>
//       </div>
//     </div>
//   );
// };

// export default Login;
