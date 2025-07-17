import { Outlet, useNavigate } from "react-router";
import Navbar from "./Navbar";
import Footer from "./Footer";
import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useEffect } from "react";
const Body = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const userData = useSelector((store) => store.user);

  const fetchUser = async () => {
    if (userData) return;

    //this is for when you are login and refresh the page you still in feed page
    try {
      const res = await axios.get(BASE_URL + "/profile/view", {
        withCredentials: true,
      });
      dispatch(addUser(res.data));
    } catch (err) {
      if (err.status === 401) {
        navigate("/login");
      }
      console.error(err);
    }
  };

  useEffect(() => {
    fetchUser(); // when user is logged in then again and again not call API
  }, []);
  return (
    <div className="min-h-screen bg-gradient-to-br from-rose-50 via-white to-sky-100">
      <Navbar />
      <main className="pt-4 pb-10 px-2 sm:px-6">
        <Outlet />
      </main>
      {/* <Footer /> */}
    </div>
  );
};
export default Body;
