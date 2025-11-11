import React, { useState } from "react";
import chatIcon from "../assets/chat.png";
import toast from "react-hot-toast";
import { createRoomApi, joinChatApi } from "../services/RoomService";
import useChatContext from "../context/ChatContext";
import { useNavigate } from "react-router-dom";

const JoinCreateChat = () => {
  const [detail, setDetail] = useState({
    roomId: "",
    userName: "",
  });

  const { setRoomId, setCurrentUser, setConnected } = useChatContext();
  const navigate = useNavigate();

  function handleFormInputChange(event) {
    setDetail({
      ...detail,
      [event.target.name]: event.target.value,
    });
  }

  function validateForm() {
    if (detail.roomId === "" || detail.userName === "") {
      toast.error("Invalid Input !!");
      return false;
    }
    return true;
  }

  async function joinChat() {
    if (validateForm()) {
      try {
        const room = await joinChatApi(detail.roomId);
        toast.success("Joined successfully!");
        setCurrentUser(detail.userName);
        setRoomId(room.roomId);
        setConnected(true);
        navigate("/chat");
      } catch (error) {
        if (error.status === 400) {
          toast.error(error.response.data);
        } else {
          toast.error("Error in joining room");
        }
      }
    }
  }

  async function createRoom() {
    if (validateForm()) {
      try {
        const response = await createRoomApi(detail.roomId);
        toast.success("Room Created Successfully!");
        setCurrentUser(detail.userName);
        setRoomId(response.roomId);
        setConnected(true);
        navigate("/chat");
      } catch (error) {
        if (error.status === 400) {
          toast.error("Room already exists!");
        } else {
          toast.error("Error in creating room");
        }
      }
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-b from-[#0b0b0b] to-[#151515] text-gray-200">
      <div className="p-10 border border-orange-600/30 w-full flex flex-col gap-5 max-w-md rounded-2xl bg-[#111111]">
        <div>
          <img
            src={chatIcon}
            className="w-20 h-20 mx-auto rounded-full object-cover border border-orange-500"
            alt="Chat Icon"
          />
        </div>

        <h1 className="text-2xl font-semibold text-center text-orange-500">
          Join or Create a Room
        </h1>

        {/* Username Field */}
        <div>
          <label htmlFor="userName" className="block font-medium mb-2 text-orange-400">
            Your Name
          </label>
          <input
            onChange={handleFormInputChange}
            value={detail.userName}
            type="text"
            id="userName"
            name="userName"
            placeholder="Enter your name"
            className="w-full bg-[#1a1a1a] text-gray-100 px-4 py-2 border border-orange-500/30 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all duration-200"
          />
        </div>

        {/* Room ID Field */}
        <div>
          <label htmlFor="roomId" className="block font-medium mb-2 text-orange-400">
            Room ID / New Room ID
          </label>
          <input
            name="roomId"
            onChange={handleFormInputChange}
            value={detail.roomId}
            type="text"
            id="roomId"
            placeholder="Enter the room ID"
            className="w-full bg-[#1a1a1a] text-gray-100 px-4 py-2 border border-orange-500/30 rounded-full focus:outline-none focus:ring-2 focus:ring-orange-500 transition-all duration-200"
          />
        </div>

        {/* Buttons */}
        <div className="flex justify-center gap-3 mt-4">
          <button
            onClick={joinChat}
            className="px-4 py-2 bg-orange-600 hover:bg-orange-700 rounded-full font-medium text-white transition-all duration-300"
          >
            Join Room
          </button>
          <button
            onClick={createRoom}
            className="px-4 py-2 bg-red-600 hover:bg-red-700 rounded-full font-medium text-white transition-all duration-300"
          >
            Create Room
          </button>
        </div>
      </div>
    </div>
  );
};

export default JoinCreateChat;
