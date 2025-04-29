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
      console.error("Logout failed:", err);
    }
  };

  return (
    <div className="navbar bg-gray-900 text-white shadow-lg px-6 py-4">
      <div className="flex items-center justify-between w-full">
        {/* Left Section: Title */}
        <Link
          to="/"
          className="text-3xl font-extrabold tracking-wide"
          style={{ fontFamily: "'Poppins', sans-serif" }}
        >
          Campus Dev Match
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
