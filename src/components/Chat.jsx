import { useEffect, useState } from "react";
import { useSelector } from "react-redux";
import { useParams } from "react-router";
import { createSockerConnection } from "../utils/socket.js";
import axios from "axios";
import { BASE_URL } from "../utils/constants.js";

const Chat = () => {
  const { targetUserId } = useParams();
  const [message, setMessage] = useState([]); // message ka array jisme msg ayenge
  const [newMessage, setNewMessage] = useState("");
  const user = useSelector((store) => store.user); // this give the loggedIn user
  const userId = user?._id;

  
  const fetchChatMessage = async (req, res) => {
    const chat = await axios.get(BASE_URL + "/chat/" + targetUserId, {
      withCredentials: true,
    });

    const chatMessage = chat?.data?.message.map((msg) => {
      const { senderId, text } = msg;
      return {
        firstName: senderId?.firstName,
        lastName: senderId?.lastName,
        text,
        timestamp: msg.createdAt,
      };
    });
    setMessage(chatMessage);
  };

  useEffect(() => {
    fetchChatMessage();
  }, []);

  useEffect(() => {
    //id userId is not exist , not create connection
    if (!userId || !targetUserId) {
      console.error("Missing ID, cannot establish chat.");
      return; // Stop the function here
    }
    const socket = createSockerConnection();
    // as soon as page load , the socket connection is made and joinChat event is emitted

    socket.emit("joinChat", {
      firstName: user.firstName,
      userId,
      targetUserId,
    });

    socket.on("messageReceived", ({ firstName, lastName, text }) => {
      console.log(firstName + " :  " + text);
      setMessage((messages) => [...messages, { firstName, lastName, text }]); // this set the message
    });

    //when component unmount this will call
    return () => {
      socket.disconnect();
    };
  }, [userId, targetUserId]); // useEffect is called on every userId and targetUserId is changed

  const sendMessage = () => {
    const socket = createSockerConnection();
    const timestamp = new Date(); // Get the current time

    socket.emit("sendMessage", {
      firstName: user.firstName,
      lastName: user.lastName,
      userId,
      targetUserId,
      text: newMessage,
      timestamp: timestamp.toISOString(),
    });
    setNewMessage("");
  };
  const formatTime = (timestamp) => {
    if (!timestamp) return "";
    return new Date(timestamp).toLocaleTimeString([], {
      hour: "2-digit",
      minute: "2-digit",
      hour12: true,
    });
  };

  
  return (
    <div className="w-full max-w-2xl mx-auto mt-8 bg-gradient-to-br from-blue-100 via-white to-indigo-100 shadow-lg rounded-2xl h-[70vh] flex flex-col border border-indigo-300">
      {/* Header */}
      <h1 className="text-xl font-semibold text-indigo-700 p-4 border-b border-indigo-300">
        Chat with {targetUserId || "User"}
      </h1>

      {/* Chat content */}
      <div className="flex-1 overflow-y-auto px-4 py-2 space-y-2 text-black">
        {message.map((msg, index) => {
          // ye loop message k pure array me chal rha h
          return (
            <div
              className={
                "chat " +
                (user.firstName === msg.firstName ? "chat-end" : "chat-start")
              }
            >
              <div className="chat-image avatar"></div>
              <div className="chat-header">
                {`${msg.firstName}  ${msg.lastName}`}
                <time className="text-xs opacity-50 ml-2">
                  {formatTime(msg.timestamp)}
                </time>
              </div>
              <div className="chat-bubble">{msg.text}</div>
              <div className="chat-footer opacity-50">Delivered</div>
            </div>
          );
        })}

        {/* Messages will appear here */}
      </div>

      {/* Input section */}
      <div className="p-4 border-t border-indigo-300 flex items-center gap-3 bg-white rounded-b-2xl">
        <input
          value={newMessage}
          onChange={(e) => setNewMessage(e.target.value)}
          className="flex-1 px-4 py-2 rounded-xl border border-gray-300 focus:outline-none focus:ring-2 focus:ring-indigo-300 text-black"
          placeholder="Type a message..."
        />
        <button
          onClick={sendMessage}
          className="px-4 py-2 rounded-xl bg-indigo-500 text-white hover:bg-indigo-600 transition"
        >
          Send
        </button>
      </div>
    </div>
  );
};

export default Chat;
