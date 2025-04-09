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
    <div className="navbar bg-gradient-to-r from-purple-900 to-indigo-900 text-white shadow-lg">
      <div className="flex-1">
        <Link to="/" className="btn btn-ghost text-xl font-bold">
          <span className="text-transparent bg-clip-text bg-gradient-to-r from-cyan-400 to-purple-400">
            Campus Dev Match
          </span>
        </Link>
      </div>
      {user && (
        <div className="flex-none gap-4">
          <div className="form-control text-cyan-300">
            Welcome, {user.firstName}
          </div>
          <div className="dropdown dropdown-end mx-5 flex">
            <div
              tabIndex={0}
              role="button"
              className="btn btn-ghost btn-circle avatar ring ring-cyan-400 ring-offset-2 ring-offset-base-100"
            >
              <div className="w-10 rounded-full">
                <img alt="user photo" src={user.photoUrl} />
              </div>
            </div>
            <ul
              tabIndex={0}
              className="menu menu-sm dropdown-content bg-gradient-to-b from-purple-900 to-indigo-900 rounded-box z-[1] mt-3 w-52 p-2 shadow-lg border border-cyan-400"
            >
              <li>
                <Link to="/profile" className="justify-between hover:bg-purple-700 hover:text-cyan-300">
                  Profile
                  <span className="badge badge-primary">New</span>
                </Link>
              </li>
              <li>
                <Link to="/connections" className="hover:bg-purple-700 hover:text-cyan-300">
                  Connections
                </Link>
              </li>
              <li>
                <Link to="/requests" className="hover:bg-purple-700 hover:text-cyan-300">
                  Requests
                </Link>
              </li>
              <li>
                <a onClick={handleLogout} className="hover:bg-purple-700 hover:text-cyan-300">
                  Logout
                </a>
              </li>
            </ul>
          </div>
        </div>
      )}
    </div>
  );
};

export default NavBar;
