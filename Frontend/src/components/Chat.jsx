import { useEffect, useState, useRef } from "react";
import { useParams } from "react-router-dom";
import { createSocketConnection } from "../utils/socket";
import { useSelector } from "react-redux";
import axios from "axios";
import { BASE_URL } from "../utils/constants";

const Chat = () => {
  const { targetUserId } = useParams();
  const [messages, setMessages] = useState([]);
  const [newMessage, setNewMessage] = useState("");
  const [showNotification, setShowNotification] = useState(true); // Notification state
  const user = useSelector((store) => store.user);
  const userId = user?._id;

  const chatEndRef = useRef(null);

  const fetchChatMessages = async () => {
    try {
      const chat = await axios.get(BASE_URL + "/chat/" + targetUserId, {
        withCredentials: true,
      });

      const chatMessages = chat?.data?.messages.map((msg) => {
        const { senderId, text } = msg;
        if (!senderId) {
          return {
            firstName: "Unknown",
            lastName: "",
            text,
          };
        }
        return {
          firstName: senderId?.firstName,
          lastName: senderId?.lastName,
          text,
        };
      });
      setMessages(chatMessages);
    } catch (err) {
      console.error(err);
    }
  };

  const scrollToBottom = () => {
    chatEndRef.current?.scrollIntoView({ behavior: "smooth" });
  };

  useEffect(() => {
    fetchChatMessages();
  }, []);

  useEffect(() => {
    if (!userId) {
      return;
    }
    const socket = createSocketConnection();
    socket.emit("joinChat", {
      firstName: user.firstName,
      userId,
      targetUserId,
    });

    socket.on("messageReceived", ({ firstName, lastName, text }) => {
      setMessages((messages) => [...messages, { firstName, lastName, text }]);
    });

    return () => {
      socket.disconnect();
    };
  }, [userId, targetUserId]);

  useEffect(() => {
    scrollToBottom();
  }, [messages]);

  // Automatically hide the notification after 5 seconds
  useEffect(() => {
    const timer = setTimeout(() => {
      setShowNotification(false);
    }, 10000);

    return () => clearTimeout(timer);
  }, []);

  const sendMessage = () => {
    const socket = createSocketConnection();
    socket.emit("sendMessage", {
      firstName: user.firstName,
      lastName: user.lastName,
      userId,
      targetUserId,
      text: newMessage,
    });
    setNewMessage("");
  };

  return (
    <div className="w-3/4 mx-auto border border-gray-300 rounded-lg shadow-lg m-5 h-[80vh] flex flex-col bg-gray-50">
      {/* Notification */}
      {showNotification && (
        <div className="fixed top-5 left-1/2 transform -translate-x-1/2 bg-blue-500 text-white p-4 rounded-lg shadow-lg flex items-center justify-between">
          <p>Welcome to the Campus Dev Match,
            <br />The backend is hosted on Render.com. Due to cold start time, the chat feature currently works only on the local setup. Thank you.</p>
        
          <button
            onClick={() => setShowNotification(false)}
            className="ml-4 bg-white text-blue-500 rounded-full px-2 py-1 hover:bg-gray-200"
          >
            Close
          </button>
        </div>
      )}

      {/* Chat Header */}
      <h1 className="p-5 border-b border-gray-300 text-2xl font-bold text-gray-800 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-t-lg">
        Chat
      </h1>

      {/* Chat Messages */}
      <div className="flex-1 overflow-y-auto p-5 space-y-4 bg-gray-100">
        {messages.map((msg, index) => (
          <div
            key={index}
            className={`flex ${
              user.firstName === msg.firstName ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`max-w-xs p-4 rounded-xl shadow-md ${
                user.firstName === msg.firstName
                  ? "bg-blue-500 text-white"
                  : "bg-gray-200 text-gray-800"
              }`}
            >
              <div className="text-sm font-semibold mb-1">
                {msg.firstName || "Unknown"} {msg.lastName || ""}
              </div>
              <div className="text-base">{msg.text}</div>
            </div>
          </div>
        ))}
        {/* Invisible div to scroll to */}
        <div ref={chatEndRef}></div>
      </div>

      {/* Chat Input */}
      <div className="p-5 border-t border-gray-300 flex items-center gap-3 bg-white">
        <input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="flex-1 border border-gray-300 rounded-full p-3 focus:outline-none focus:ring-2 focus:ring-blue-500"
          placeholder="Type your message..."
        />
        <button
          onClick={sendMessage}
          className="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-full hover:from-blue-600 hover:to-purple-700 transition-all duration-300"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;