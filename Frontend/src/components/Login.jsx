import { useState, useEffect } from "react";
import axios from "axios";
import { useDispatch } from "react-redux";
import { addUser } from "../utils/userSlice";
import { useNavigate } from "react-router-dom";
import { BASE_URL } from "../utils/constants";

const Login = () => {
  const [emailId, setEmailId] = useState("");
  const [password, setPassword] = useState("");
  const [firstName, setFirstName] = useState("");
  const [lastName, setLastName] = useState("");
  const [middleName, setMiddleName] = useState("");
  const [age, setAge] = useState("");
  const [college, setCollege] = useState("");
  const [year, setYear] = useState("");
  const [gender, setGender] = useState("");
  const [number, setNumber] = useState("");
  const [isLoginForm, setIsLoginForm] = useState(true);
  const [error, setError] = useState("");
  const [isLoading, setIsLoading] = useState(false); // Loading state
  const [showNotification, setShowNotification] = useState(true); // Notification visibility
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    // Automatically hide the notification after 5 seconds
    const timer = setTimeout(() => {
      setShowNotification(false);
    }, 5000);

    return () => clearTimeout(timer); // Cleanup timer
  }, []);

  const handleLogin = async () => {
    setIsLoading(true); // Start loading
    try {
      const res = await axios.post(
        BASE_URL + "/login",
        {
          emailId,
          password,
        },
        { withCredentials: true }
      );
      dispatch(addUser(res.data));
      navigate("/");
    } catch (err) {
      setError(err?.response?.data || "Something went wrong");
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  const handleSignUp = async () => {
    setIsLoading(true); // Start loading
    try {
      const res = await axios.post(
        BASE_URL + "/signup",
        {
          firstName,
          middleName,
          lastName,
          emailId,
          password,
          age,
          gender,
          college,
          year,
          number,
        },
        { withCredentials: true }
      );
      dispatch(addUser(res.data.data));
      navigate("/");
    } catch (err) {
      setError(err?.response?.data || "Something went wrong");
    } finally {
      setIsLoading(false); // Stop loading
    }
  };

  return (
    <div className="relative flex justify-center items-center min-h-screen bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500">
      {/* Notification Popup */}
      {showNotification && (
        <div className="absolute top-5 left-1/2 transform -translate-x-1/2 bg-blue-600 text-white px-6 py-3 rounded-lg shadow-lg flex items-center justify-between w-11/12 max-w-md">
          <p className="text-sm font-medium">
            The backend is hosted on Render.com, so it may take up to 60 seconds to load. Thank you for your patience!
          </p>
          <button
            className="ml-4 text-white font-bold text-lg focus:outline-none"
            onClick={() => setShowNotification(false)}
          >
            ✕
          </button>
        </div>
      )}

      <div className="bg-white shadow-2xl rounded-lg p-8 w-full max-w-md">
        {isLoading ? (
          // Loading message
          <div className="text-center text-gray-700">
            <p className="text-lg font-semibold">
              Backend is hosted on Render.com
            </p>
            <p className="text-sm">
              It may take approximately 60 seconds to load. Thank you for your
              patience!
            </p>
          </div>
        ) : (
          <>
            <h2 className="text-4xl font-extrabold text-center text-gray-800 mb-6">
              {isLoginForm ? "Welcome Back!" : "Create an Account"}
            </h2>
            <p className="text-center text-gray-500 mb-6">
              {isLoginForm
                ? "Login to continue"
                : "Sign up to join our amazing platform"}
            </p>
            <div className="space-y-4">
              {!isLoginForm && (
                <>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      First Name
                    </label>
                    <input
                      type="text"
                      value={firstName}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                      onChange={(e) => setFirstName(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Middle Name
                    </label>
                    <input
                      type="text"
                      value={middleName}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                      onChange={(e) => setMiddleName(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Last Name
                    </label>
                    <input
                      type="text"
                      value={lastName}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                      onChange={(e) => setLastName(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Age
                    </label>
                    <input
                      type="number"
                      value={age}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                      onChange={(e) => setAge(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Gender
                    </label>
                    <select
                      value={gender}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                      onChange={(e) => setGender(e.target.value)}
                    >
                      <option value="">Select Gender</option>
                      <option value="Male">Male</option>
                      <option value="Female">Female</option>
                      <option value="Other">Other</option>
                    </select>
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      College
                    </label>
                    <input
                      type="text"
                      value={college}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                      onChange={(e) => setCollege(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      College Year
                    </label>
                    <input
                      type="text"
                      value={year}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                      onChange={(e) => setYear(e.target.value)}
                    />
                  </div>
                  <div>
                    <label className="block text-sm font-medium text-gray-700">
                      Mobile Number
                    </label>
                    <input
                      type="text"
                      value={number}
                      className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                      onChange={(e) => setNumber(e.target.value)}
                    />
                  </div>
                </>
              )}
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Email ID
                </label>
                <input
                  type="email"
                  value={emailId}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                  onChange={(e) => setEmailId(e.target.value)}
                />
              </div>
              <div>
                <label className="block text-sm font-medium text-gray-700">
                  Password
                </label>
                <input
                  type="password"
                  value={password}
                  className="mt-1 block w-full rounded-md border-gray-300 shadow-sm focus:border-purple-500 focus:ring-purple-500"
                  onChange={(e) => setPassword(e.target.value)}
                />
              </div>
            </div>
            {error && <p className="text-red-500 mt-4">{error}</p>}
            <div className="mt-6 flex justify-center">
              <button
                className="bg-gradient-to-r from-purple-500 to-pink-500 text-white px-6 py-2 rounded-md shadow-md hover:from-purple-600 hover:to-pink-600 transition-all duration-300"
                onClick={isLoginForm ? handleLogin : handleSignUp}
              >
                {isLoginForm ? "Login" : "Sign Up"}
              </button>
            </div>
            <p
              className="mt-4 text-center text-sm text-purple-500 cursor-pointer hover:underline"
              onClick={() => setIsLoginForm((value) => !value)}
            >
              {isLoginForm
                ? "New User? Sign up here"
                : "Existing User? Login here"}
            </p>
          </>
        )}
      </div>
    </div>
  );
};

export default Login;
