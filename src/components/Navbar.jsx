import axios from "axios";
import { Link, useNavigate } from "react-router";
import { BASE_URL } from "../utils/constants";
import { useDispatch, useSelector } from "react-redux";
import { removeUser } from "../utils/userSlice";

const Navbar = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const user = useSelector((store) => store.user);

  const handleLogout = async () => {
    try {
      await axios.post(
        BASE_URL + "/logout",
        {},
        {
          withCredentials: true,
        }
      );
      dispatch(removeUser());
      return navigate("/login");
    } catch (err) {
      console.error(err);
    }
  };

  return (
    <>
      <div className="navbar bg-gradient-to-r from-rose-100 via-pink-50 to-purple-100 shadow-lg backdrop-blur-md sticky top-0 z-50 px-6 py-3 rounded-b-2xl border-b border-pink-200">
        <div className="flex-1">
          <Link
            to={user ? "/" : "/login"}
            className="text-2xl font-bold text-rose-600 hover:text-purple-700 transition-colors duration-300"
          >
            DevTinder
          </Link>
        </div>
        <div className="flex items-center gap-2">
          <div className="dropdown dropdown-end">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar hover:scale-105 transition-transform duration-300"
            >
              <div className="w-10 h-10 rounded-full border border-rose-300 shadow-sm">
                <img
                  alt="User Avatar"
                  src="https://img.daisyui.com/images/stock/photo-1534528741775-53994a69daeb.webp"
                  className="rounded-full object-cover w-full h-full"
                />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content mt-3 z-[1] p-3 rounded-xl w-52 space-y-1
    bg-gradient-to-br from-pink-50 via-rose-100 to-purple-50
    shadow-2xl border border-pink-200 backdrop-blur-md"
            >
              <li>
                {user && (
                  <Link
                    to={user ? "/profile" : "/login"}
                    className="hover:bg-rose-100 px-3 py-2 rounded-md transition-colors font-medium text-gray-700"
                  >
                    Profile
                    <span className="badge bg-pink-100 text-rose-500 ml-auto">
                      New
                    </span>
                  </Link>
                )}
              </li>
              <li>
                <Link
                  to={user ? "/connections" : "/login"}
                  className="hover:bg-rose-100 px-3 py-2 rounded-md transition-colors font-medium text-gray-700"
                >
                  Connections
                </Link>
              </li>
              <li>
                <Link
                  to={user ? "/requests" : "/login"}
                  className="hover:bg-rose-100 px-3 py-2 rounded-md transition-colors font-medium text-gray-700"
                >
                  Requests
                </Link>
              </li>
              <li>
                <button
                  onClick={handleLogout}
                  className="text-red-500 hover:bg-red-50 px-3 py-2 rounded-md transition-colors w-full text-left font-medium"
                >
                  Logout
                </button>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </>
  );
};

export default Navbar;
