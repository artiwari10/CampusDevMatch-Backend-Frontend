import { useState } from "react";
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
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleLogin = async () => {
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
      return navigate("/");
    } catch (err) {
      setError(err?.response?.data || "Something went wrong");
    }
  };

  const handleSignUp = async () => {
    try {
      const res = await axios.post(
        BASE_URL + "/signup",
        { firstName,middleName, lastName, emailId, password, age,gender,college,year,number},
        { withCredentials: true }
      );
      dispatch(addUser(res.data.data));
      return navigate("/");
    } catch (err) {
      setError(err?.response?.data || "Something went wrong");
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-primary/5 to-secondary/5 py-12 px-4 sm:px-6 lg:px-8 relative">
      {/* Background Pattern */}
      <div className="absolute inset-0 z-0 opacity-20">
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,theme(colors.primary)_1px,transparent_0)] [background-size:40px_40px]"></div>
        <div className="absolute inset-0 bg-[radial-gradient(circle_at_1px_1px,theme(colors.secondary)_1px,transparent_0)] [background-size:80px_80px] rotate-45"></div>
      </div>

      {/* Glass Card */}
      <div className="max-w-md w-full space-y-8 bg-base-100/90 backdrop-blur-sm p-8 rounded-lg shadow-2xl relative z-10 border border-white/10">
        <div>
          <h2 className="mt-6 text-center text-3xl font-extrabold text-primary">
            {isLoginForm ? "Welcome Back" : "Create Your Account"}
          </h2>
          <p className="mt-2 text-center text-sm text-gray-400">
            {isLoginForm ? "Sign in to your account" : "Join our community"}
          </p>
        </div>

        <div className="mt-8 space-y-6">
          {!isLoginForm && (
            <div className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400">First Name</label>
                  <input
                    type="text"
                    value={firstName}
                    className="mt-1 input input-bordered w-full bg-base-200"
                    onChange={(e) => setFirstName(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400">Last Name</label>
                  <input
                    type="text"
                    value={lastName}
                    className="mt-1 input input-bordered w-full bg-base-200"
                    onChange={(e) => setLastName(e.target.value)}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400">Middle Name (Optional)</label>
                <input
                  type="text"
                  value={middleName}
                  className="mt-1 input input-bordered w-full bg-base-200"
                  onChange={(e) => setMiddleName(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400">Age</label>
                  <input
                    type="number"
                    value={age}
                    className="mt-1 input input-bordered w-full bg-base-200"
                    onChange={(e) => setAge(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400">Gender</label>
                  <select
                    className="mt-1 select select-bordered w-full bg-base-200"
                    value={gender}
                    onChange={(e) => setGender(e.target.value)}
                  >
                    <option value="">Select</option>
                    <option value="Male">Male</option>
                    <option value="Female">Female</option>
                    <option value="Other">Other</option>
                  </select>
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-400">College</label>
                <input
                  type="text"
                  value={college}
                  className="mt-1 input input-bordered w-full bg-base-200"
                  onChange={(e) => setCollege(e.target.value)}
                />
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-400">Year</label>
                  <input
                    type="text"
                    value={year}
                    className="mt-1 input input-bordered w-full bg-base-200"
                    onChange={(e) => setYear(e.target.value)}
                  />
                </div>
                <div>
                  <label className="block text-sm font-medium text-gray-400">Mobile Number</label>
                  <input
                    type="tel"
                    value={number}
                    className="mt-1 input input-bordered w-full bg-base-200"
                    onChange={(e) => setNumber(e.target.value)}
                  />
                </div>
              </div>
            </div>
          )}

          <div className="space-y-4">
            <div>
              <label className="block text-sm font-medium text-gray-400">Email Address</label>
              <input
                type="email"
                value={emailId}
                className="mt-1 input input-bordered w-full bg-base-200"
                onChange={(e) => setEmailId(e.target.value)}
              />
            </div>

            <div>
              <label className="block text-sm font-medium text-gray-400">Password</label>
              <input
                type="password"
                value={password}
                className="mt-1 input input-bordered w-full bg-base-200"
                onChange={(e) => setPassword(e.target.value)}
              />
            </div>
          </div>

          {error && (
            <div className="text-error text-sm text-center">{error}</div>
          )}

          <div>
            <button
              className="btn btn-primary w-full"
              onClick={isLoginForm ? handleLogin : handleSignUp}
            >
              {isLoginForm ? "Sign In" : "Create Account"}
            </button>
          </div>
        </div>

        <div className="text-center">
          <button
            className="text-primary hover:underline text-sm"
            onClick={() => setIsLoginForm((value) => !value)}
          >
            {isLoginForm
              ? "New here? Create an account"
              : "Already have an account? Sign in"}
          </button>
        </div>
      </div>
    </div>
  );
};
export default Login;
