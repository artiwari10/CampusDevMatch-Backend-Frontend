import axios from "axios";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";
import { removeUser } from "../utils/userSlice";

const Navbar = () => {
  const user = useSelector((store) => store.user);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.post(BASE_URL + "/logout", {}, { withCredentials: true });
      dispatch(removeUser());
      navigate("/login");
    } catch (err) {
      console.error("Logout failed:", err);
    }
  };

  if (!user) return null;

  return (
    <div className="navbar bg-base-100">
      <div className="navbar-start">
        <Link to="/" className="btn btn-ghost normal-case text-xl">CampusDevMatch</Link>
      </div>
      
      <div className="navbar-center hidden lg:flex">
        <ul className="menu menu-horizontal px-1">
          <li><Link to="/feed">Feed</Link></li>
          <li><Link to="/connections">Connections</Link></li>
          <li><Link to="/requests">Requests</Link></li>
        </ul>
      </div>
      
      <div className="navbar-end">
        <Link to="/profile" className="btn btn-ghost btn-circle avatar">
          <div className="w-10 rounded-full">
            <img src={user?.profilePic || "https://via.placeholder.com/40"} alt="Profile" />
          </div>
        </Link>
        <button className="btn btn-ghost" onClick={handleLogout}>Logout</button>
      </div>
    </div>
  );
};

export default Navbar;
