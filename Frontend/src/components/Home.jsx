import React, { useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

const Home = () => {
  const navigate = useNavigate();

  // Check if the user is logged in
  const isLoggedIn = useSelector((state) => !!state.user?._id);

  // Redirect to /feed if the user is logged in
  useEffect(() => {
    if (isLoggedIn) {
      navigate("/");
    }
  }, [isLoggedIn, navigate]);

  return (
    <div className="min-h-screen bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500 text-white">
      {/* Header Section */}
      <header className="text-center py-16">
        <h1 className="text-6xl font-extrabold mb-6 animate-pulse">
          Campus Dev Match
        </h1>
        <p className="text-xl font-medium mb-8">
          Connecting developers, building communities, and fostering innovation.
        </p>
        <Link to="/login">
          <button className="bg-white text-blue-500 px-8 py-4 rounded-full font-semibold shadow-lg hover:bg-gray-200 transition-all duration-300">
            Get Started
          </button>
        </Link>
      </header>

      {/* Features Section */}
      <section className="py-16 px-6">
        <h2 className="text-4xl font-bold text-center mb-12">Features</h2>
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          <div className="bg-white text-gray-800 p-6 rounded-lg shadow-lg hover:scale-105 transition-transform duration-300">
            <h3 className="text-2xl font-semibold mb-4">Chat System</h3>
            <p>
              Real-time messaging to connect with other developers and build
              meaningful connections.
            </p>
          </div>
          <div className="bg-white text-gray-800 p-6 rounded-lg shadow-lg hover:scale-105 transition-transform duration-300">
            <h3 className="text-2xl font-semibold mb-4">Profile Matching</h3>
            <p>
              Match with developers based on skills, interests, and goals to
              collaborate on projects.
            </p>
          </div>
          <div className="bg-white text-gray-800 p-6 rounded-lg shadow-lg hover:scale-105 transition-transform duration-300">
            <h3 className="text-2xl font-semibold mb-4">Project Collaboration</h3>
            <p>
              Work together on exciting projects and showcase your skills to the
              community.
            </p>
          </div>
          <div className="bg-white text-gray-800 p-6 rounded-lg shadow-lg hover:scale-105 transition-transform duration-300">
            <h3 className="text-2xl font-semibold mb-4">Notifications</h3>
            <p>
              Stay updated with real-time notifications for messages, requests,
              and updates.
            </p>
          </div>
          <div className="bg-white text-gray-800 p-6 rounded-lg shadow-lg hover:scale-105 transition-transform duration-300">
            <h3 className="text-2xl font-semibold mb-4">Secure Authentication</h3>
            <p>
              Login and signup with secure authentication to protect your data
              and privacy.
            </p>
          </div>
          <div className="bg-white text-gray-800 p-6 rounded-lg shadow-lg hover:scale-105 transition-transform duration-300">
            <h3 className="text-2xl font-semibold mb-4">Responsive Design</h3>
            <p>
              Access Campus Dev Match on any device with a fully responsive
              design.
            </p>
          </div>
        </div>
      </section>

      {/* Tech Stack Section */}
      <section className="py-16 px-6 bg-gray-900">
        <h2 className="text-4xl font-bold text-center mb-12">Tech Stack</h2>
        <div className="grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-8 text-center">
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg hover:scale-105 transition-transform duration-300">
            <h3 className="text-2xl font-semibold">React</h3>
            <p>Frontend library for building user interfaces.</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg hover:scale-105 transition-transform duration-300">
            <h3 className="text-2xl font-semibold">Node.js</h3>
            <p>Backend runtime for scalable server-side applications.</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg hover:scale-105 transition-transform duration-300">
            <h3 className="text-2xl font-semibold">Express</h3>
            <p>Web framework for building RESTful APIs.</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg hover:scale-105 transition-transform duration-300">
            <h3 className="text-2xl font-semibold">MongoDB</h3>
            <p>NoSQL database for storing user and chat data.</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg hover:scale-105 transition-transform duration-300">
            <h3 className="text-2xl font-semibold">Socket.io</h3>
            <p>Real-time communication for chat and notifications.</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg hover:scale-105 transition-transform duration-300">
            <h3 className="text-2xl font-semibold">Tailwind CSS</h3>
            <p>Utility-first CSS framework for styling.</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg hover:scale-105 transition-transform duration-300">
            <h3 className="text-2xl font-semibold">Render</h3>
            <p>Cloud hosting platform for deploying the backend.</p>
          </div>
          <div className="bg-gray-800 p-6 rounded-lg shadow-lg hover:scale-105 transition-transform duration-300">
            <h3 className="text-2xl font-semibold">Axios</h3>
            <p>HTTP client for making API requests.</p>
          </div>
        </div>
      </section>

      {/* About Section */}
      <section className="py-16 px-6">
        <h2 className="text-4xl font-bold text-center mb-12">About Campus Dev Match</h2>
        <p className="text-center max-w-4xl mx-auto text-lg">
          Campus Dev Match is a platform designed to connect developers within
          college campuses. Whether you're looking for collaborators, mentors,
          or just like-minded individuals, Campus Dev Match helps you build
          meaningful connections and work on exciting projects together. Join
          us today and be part of a thriving developer community!
        </p>
      </section>

      {/* Footer */}
      <footer className="py-8 bg-gray-800 text-center">
        <p className="text-gray-400">
          © {new Date().getFullYear()} Campus Dev Match. All rights reserved.
        </p>
      </footer>
    </div>
  );
};

export default Home;