import React, { useEffect, useRef, useState } from "react";
import { MdAttachFile, MdSend } from "react-icons/md";
import useChatContext from "../context/ChatContext";
import { useNavigate } from "react-router-dom";
import SockJS from "sockjs-client";
import { Stomp } from "@stomp/stompjs";
import toast from "react-hot-toast";
import { baseURL } from "../config/AxiosHelper";
import { getMessagess } from "../services/RoomService";
import { timeAgo } from "../config/helper";

const ChatPage = () => {
  const {
    roomId,
    currentUser,
    connected,
    setConnected,
    setRoomId,
    setCurrentUser,
  } = useChatContext();

  const navigate = useNavigate();
  const [messages, setMessages] = useState([]);
  const [input, setInput] = useState("");
  const chatBoxRef = useRef(null);
  const [stompClient, setStompClient] = useState(null);

  // Redirect if not connected
  useEffect(() => {
    if (!connected) {
      navigate("/");
    }
  }, [connected, roomId, currentUser, navigate]);

  // Load previous messages
  useEffect(() => {
    async function loadMessages() {
      try {
        const msgs = await getMessagess(roomId);
        setMessages(msgs);
      } catch (error) {
        console.error("Error loading messages:", error);
      }
    }
    if (connected) {
      loadMessages();
    }
  }, [connected, roomId]);

  // Auto-scroll to bottom on new messages
  useEffect(() => {
    if (chatBoxRef.current) {
      chatBoxRef.current.scroll({
        top: chatBoxRef.current.scrollHeight,
        behavior: "smooth",
      });
    }
  }, [messages]);

  // WebSocket connection setup
  useEffect(() => {
    const connectWebSocket = () => {
      const sock = new SockJS(`${baseURL}/chat`);
      const client = Stomp.over(sock);

      client.connect({}, () => {
        setStompClient(client);
        toast.success("Connected to chat!");

        client.subscribe(`/topic/room/${roomId}`, (message) => {
          const newMessage = JSON.parse(message.body);
          setMessages((prev) => [...prev, newMessage]);
        });
      });
    };

    if (connected) {
      connectWebSocket();
    }
  }, [roomId, connected]);

  // Send message
  const sendMessage = async () => {
    if (stompClient && connected && input.trim()) {
      const message = {
        sender: currentUser,
        content: input,
        roomId: roomId,
      };

      stompClient.send(
        `/app/sendMessage/${roomId}`,
        {},
        JSON.stringify(message)
      );
      setInput("");
    }
  };

  // Leave room
  const handleLogout = () => {
    if (stompClient) stompClient.disconnect();
    setConnected(false);
    setRoomId("");
    setCurrentUser("");
    navigate("/");
  };

  return (
    <div className="bg-[#0b0b0b] text-gray-100 min-h-screen flex flex-col">
      {/* Header */}
      <header className="fixed w-full bg-gradient-to-r from-[#1a1a1a] via-[#222222] to-[#1a1a1a] py-4 shadow-md border-b border-[#ff6a00]/30 flex justify-between items-center px-6 sm:px-10 z-10">
        <h1 className="text-lg font-semibold text-[#ff8800]">
          Room: <span className="text-gray-200">{roomId}</span>
        </h1>
        <h1 className="text-lg font-semibold text-[#ff8800]">
          User: <span className="text-gray-200">{currentUser}</span>
        </h1>
        <button
          onClick={handleLogout}
          className="bg-[#ff5500] hover:bg-[#ff3300] px-4 py-2 rounded-full text-sm font-semibold text-white transition-all"
        >
          Leave Room
        </button>
      </header>

      {/* Chat Box */}
      <main
        ref={chatBoxRef}
        className="pt-24 pb-28 px-4 sm:px-6 w-full sm:w-2/3 bg-gradient-to-b from-[#0d0d0d] to-[#1a1a1a] mx-auto h-screen overflow-auto rounded-md shadow-inner"
      >
        {messages.map((message, index) => (
          <div
            key={index}
            className={`flex ${
              message.sender === currentUser ? "justify-end" : "justify-start"
            }`}
          >
            <div
              className={`my-2 px-4 py-3 max-w-xs sm:max-w-sm rounded-2xl shadow-md ${
                message.sender === currentUser
                  ? "bg-[#ff6a00]/80 text-white rounded-tr-none"
                  : "bg-[#222222] text-gray-200 rounded-tl-none"
              }`}
            >
              <div className="flex flex-row gap-3 items-start">
                <img
                  className="h-10 w-10 rounded-full border border-[#ff8800]/40"
                  src="https://api.dicebear.com/9.x/lorelei/svg"
                  alt="avatar"
                />
                <div className="flex flex-col gap-1">
                  <p className="text-sm font-semibold text-[#ff8800]">
                    {message.sender}
                  </p>
                  <p className="text-base">{message.content}</p>
                  <p className="text-xs text-gray-400 italic">
                    {timeAgo(message.timeStamp)}
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </main>

      {/* ✅ Perfectly aligned Input Box */}
      <div className="fixed bottom-0 inset-x-0 px-3 pb-[env(safe-area-inset-bottom)] bg-[#0b0b0b]">
        <div className="flex items-center gap-2 bg-[#111111] border border-[#ff8800]/40 rounded-full px-3 py-2 shadow-lg max-w-md mx-auto w-full">
          <input
            value={input}
            onChange={(e) => setInput(e.target.value)}
            onKeyDown={(e) => {
              if (e.key === "Enter") sendMessage();
            }}
            type="text"
            placeholder="Type your message..."
            className="flex-1 bg-transparent text-gray-200 px-2 py-2 outline-none placeholder-gray-500 text-sm"
          />
          <button
            className="bg-[#222222] hover:bg-[#333333] text-[#ff8800] h-10 w-10 rounded-full flex justify-center items-center transition-transform transform hover:scale-110 active:scale-95 flex-shrink-0"
          >
            <MdAttachFile size={20} />
          </button>
          <button
            onClick={sendMessage}
            className="bg-[#ff6a00] hover:bg-[#ff3300] h-10 w-10 rounded-full flex justify-center items-center text-white transition-transform transform hover:scale-110 active:scale-95 flex-shrink-0"
          >
            <MdSend size={20} />
          </button>
        </div>
      </div>
    </div>
  );
};

export default ChatPage;
