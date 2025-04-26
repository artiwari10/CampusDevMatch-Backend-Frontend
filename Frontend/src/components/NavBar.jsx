import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { removeUser } from "../utils/userSlice";

const NavBar = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post(BASE_URL + "/logout", {}, { withCredentials: true });
      dispatch(removeUser());
      return navigate("/login");
    } catch (err) {
      // Error logic maybe redirect to error page
    }
  };

  return (
    <div className="navbar bg-gray-900 text-white shadow-lg px-6">
      <div className="flex items-center justify-between w-full">
        {/* Left Section: Title */}
        <Link
          to="/"
          className="relative group text-2xl font-bold tracking-wide"
        >
          {/* Default "CDM" */}
          <span className="inline-block transition-all duration-300 group-hover:opacity-0">
            CDM
          </span>
          {/* Typing Animation for "Campus Dev Match" */}
          <span className="absolute top-0 left-0 opacity-0 group-hover:opacity-100 group-hover:translate-x-0 whitespace-nowrap typing-animation">
            Campus Dev Match
          </span>
        </Link>

        {/* Right Section: User Info */}
        {user && (
          <div className="flex items-center gap-6">
            <div className="text-lg font-medium">
              Welcome, <span className="text-gray-300">{user.firstName}</span>
            </div>
            <div className="dropdown dropdown-end">
              <div
                tabIndex={0}
                role="button"
                className="btn btn-ghost btn-circle avatar hover:bg-gray-700"
              >
                <div className="w-12 rounded-full border-2 border-gray-500">
                  <img alt="user photo" src={user.photoUrl} />
                </div>
              </div>
              <ul
                tabIndex={0}
                className="menu menu-sm dropdown-content bg-gray-800 text-white rounded-box z-[1] mt-3 w-52 p-2 shadow-lg"
              >
                <li>
                  <Link
                    to="/profile"
                    className="justify-between hover:bg-gray-700"
                  >
                    Profile
                    <span className="badge badge-primary">New</span>
                  </Link>
                </li>
                <li>
                  <Link to="/connections" className="hover:bg-gray-700">
                    Connections
                  </Link>
                </li>
                <li>
                  <Link to="/requests" className="hover:bg-gray-700">
                    Requests
                  </Link>
                </li>
                <li>
                  <a
                    onClick={handleLogout}
                    className="hover:bg-red-600 hover:text-white"
                  >
                    Logout
                  </a>
                </li>
              </ul>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default NavBar;
