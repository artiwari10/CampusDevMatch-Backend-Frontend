import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/conectionSlice";
import { Link } from "react-router-dom";

const Connections = () => {
  const connections = useSelector((store) => store.connections);
  const dispatch = useDispatch();

  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      dispatch(addConnections(res.data.data));
    } catch (err) {
      console.error("Error fetching connections:", err.message);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections) return;

  if (connections.length === 0) return <h1 className="text-center text-gray-500 text-2xl">No Connections Found</h1>;

  return (
    <div className="bg-gray-200 min-h-screen py-10">
      {/* Cool Title */}
      <h1 className="text-center text-5xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-blue-400 via-purple-500 to-pink-500 mb-8 hover:scale-105 transition-transform duration-300">
        Connections
      </h1>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6 px-6">
        {connections.map((connection) => {
          const { _id, firstName, lastName, photoUrl, age, gender, about, number, college, skills } = connection;

          return (
            <div
              key={_id}
              className="bg-gray-100 text-gray-800 shadow-md rounded-lg overflow-hidden hover:shadow-lg transition-shadow duration-300"
            >
              {/* Profile Picture */}
              <div className="relative">
                <img
                  alt="profile"
                  className="w-full h-40 object-cover"
                  src={photoUrl}
                />
                <div className="absolute bottom-0 left-0 bg-black bg-opacity-50 text-white px-4 py-2 w-full">
                  <h2 className="font-bold text-lg">{firstName + " " + lastName}</h2>
                  {age && gender && <p className="text-sm">{age + ", " + gender}</p>}
                </div>
              </div>

              {/* Details Section */}
              <div className="p-3">
                <p className="text-gray-600 text-sm">
                  <span className="font-semibold text-gray-800">Contact:</span> {number}
                </p>
                <p className="text-gray-600 text-sm">
                  <span className="font-semibold text-gray-800">College:</span> {college}
                </p>
                <p className="text-gray-600 text-sm">
                  <span className="font-semibold text-gray-800">Skills:</span> {skills.length > 0 ? skills.join(", ") : "None"}
                </p>
                <p className="text-gray-600 text-sm">
                  <span className="font-semibold text-gray-800">About:</span> {about}
                </p>
              </div>

              {/* Cool Chat Button */}
              <div className="p-3 border-t border-gray-300">
                <Link to={"/chat/" + _id}>
                  <button className="w-full bg-gradient-to-r from-blue-500 to-purple-600 text-white py-2 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-all duration-300">
                    Chat
                  </button>
                </Link>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Connections;
