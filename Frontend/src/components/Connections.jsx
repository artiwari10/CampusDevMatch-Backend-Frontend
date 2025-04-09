import axios from "axios";
import { BASE_URL } from "../utils/constants";
import { useEffect } from "react";
import { connect, useDispatch, useSelector } from "react-redux";
import { addConnections } from "../utils/conectionSlice";

const Connections = () => {
  const connections = useSelector((store) => store.connections);
  const dispatch = useDispatch();
  const fetchConnections = async () => {
    try {
      const res = await axios.get(BASE_URL + "/user/connections", {
        withCredentials: true,
      });
      // Log each connection's data
      res.data.data.forEach((conn, index) => {
        console.log(`Connection ${index + 1}:`, {
          name: conn.firstName,
          college: conn.college,
          number: conn.number,
          skills: conn.skills
        });
      });
      dispatch(addConnections(res.data.data));
    } catch (err) {
      console.error("Error fetching connections:", err);
    }
  };

  useEffect(() => {
    fetchConnections();
  }, []);

  if (!connections) return;

  if (connections.length === 0) return (
    <div className="min-h-[60vh] flex items-center justify-center">
      <h1 className="text-2xl font-serif text-gray-400 animate-pulse">No Connections Found</h1>
    </div>
  );

  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-serif text-center mb-8 bg-gradient-to-r from-primary to-secondary bg-clip-text text-transparent">
        Your Professional Network
      </h1>

      <div className="grid md:grid-cols-3 gap-6 max-w-7xl mx-auto">
        {connections.map((connection, index) => {
          console.log(`Rendering connection ${index}:`, connection);
          const { _id, firstName, lastName, photoUrl, age, gender, about, number, college, skills } = connection;

          return (
            <div
              key={_id}
              className="bg-base-200/50 backdrop-blur-sm rounded-lg shadow-md overflow-hidden transition-all duration-300 hover:shadow-xl hover:shadow-primary/20 group"
            >
              <div className="p-4">
                <div className="flex gap-4 items-start">
                  <img
                    alt={`${firstName}'s photo`}
                    className="w-20 h-20 rounded-lg object-cover shadow-md transition-transform duration-300 group-hover:scale-105"
                    src={photoUrl}
                  />
                  <div className="flex-grow">
                    <h2 className="text-lg font-semibold text-primary/90 group-hover:text-primary transition-colors duration-300">
                      {firstName + " " + lastName}
                    </h2>
                    <div className="flex items-center gap-2 text-xs text-gray-400 mt-1">
                      {age && gender && (
                        <span>{age} • {gender}</span>
                      )}
                    </div>
                  </div>
                </div>

                <div className="mt-3 space-y-2">
                  {/* User Details */}
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <svg className="w-4 h-4 opacity-70" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10 12a2 2 0 100-4 2 2 0 000 4z"/>
                      <path fillRule="evenodd" d="M.458 10C1.732 5.943 5.522 3 10 3s8.268 2.943 9.542 7c-1.274 4.057-5.064 7-9.542 7S1.732 14.057.458 10zM14 10a4 4 0 11-8 0 4 4 0 018 0z" clipRule="evenodd"/>
                    </svg>
                    <span>{age} years • {gender}</span>
                  </div>

                  {/* College */}
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <svg className="w-4 h-4 opacity-70" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M10.394 2.08a1 1 0 00-.788 0l-7 3a1 1 0 000 1.84L5.25 8.051a.999.999 0 01.356-.257l4-1.714a1 1 0 11.788 1.838L7.667 9.088l1.94.831a1 1 0 00.787 0l7-3a1 1 0 000-1.838l-7-3z"/>
                    </svg>
                    <span> College : {college} </span>
                  </div>

                  {/* Phone Number */}
                  <div className="flex items-center gap-2 text-sm text-gray-400">
                    <svg className="w-4 h-4 opacity-70" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M2 3a1 1 0 011-1h2.153a1 1 0 01.986.836l.74 4.435a1 1 0 01-.54 1.06l-1.548.773a11.037 11.037 0 006.105 6.105l.774-1.548a1 1 0 011.059-.54l4.435.74a1 1 0 01.836.986V17a1 1 0 01-1 1h-2C7.82 18 2 12.18 2 5V3z"/>
                    </svg>
                    <span>{number}</span>
                  </div>

                  {/* Skills */}
                  {Array.isArray(skills) && skills.length > 0 && (
                    <div className="flex items-center gap-2 text-sm text-gray-400">
                      <svg className="w-4 h-4 opacity-70" fill="currentColor" viewBox="0 0 20 20">
                        <path fillRule="evenodd" d="M11.49 3.17c-.38-1.56-2.6-1.56-2.98 0a1.532 1.532 0 01-2.286.948c-1.372-.836-2.942.734-2.106 2.106.54.886.061 2.042-.947 2.287-1.561.379-1.561 2.6 0 2.978a1.532 1.532 0 01.947 2.287c-.836 1.372.734 2.942 2.106 2.106a1.532 1.532 0 012.287.947c.379 1.561 2.6 1.561 2.978 0a1.533 1.533 0 012.287-.947c1.372.836 2.942-.734 2.106-2.106a1.533 1.533 0 01.947-2.287c1.561-.379 1.561-2.6 0-2.978a1.532 1.532 0 01-.947-2.287c.836-1.372-.734-2.942-2.106-2.106a1.532 1.532 0 01-2.287-.947zM10 13a3 3 0 100-6 3 3 0 000 6z" clipRule="evenodd"/>
                      </svg>
                      <div className="flex gap-2 flex-wrap">
                        {skills.map((skill, index) => (
                          <span key={index} className="bg-primary/10 px-2 py-0.5 rounded-full text-xs text-primary">
                            {skill}
                          </span>
                        ))}
                      </div>
                    </div>
                  )}
                </div>
              </div>
              
              <div className="px-4 py-2 bg-base-300/50 flex justify-end">
                <button className="btn btn-xs btn-ghost gap-1 hover:bg-primary/10">
                  <svg className="w-3 h-3" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M2 5a2 2 0 012-2h7a2 2 0 012 2v4a2 2 0 01-2 2H9l-3 3v-3H4a2 2 0 01-2-2V5z"/>
                  </svg>
                  Message
                </button>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default Connections;
