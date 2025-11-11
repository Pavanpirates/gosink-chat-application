import React from "react";
import { Routes, Route } from "react-router-dom"; // ✅ from react-router-dom
import LandingPage from "../components/LandingPage";
import JoinCreateChat from "../components/JoinCreateChat";
import ChatPage from "../components/ChatPage";

const AppRoutes = () => {
  return (
    <Routes>
      <Route path="/" element={<LandingPage />} />
      <Route path="/join" element={<JoinCreateChat />} />
      <Route path="/chat" element={<ChatPage />} />
      <Route path="*" element={<h1>404 Page Not Found</h1>} />
    </Routes>
  );
};

export default AppRoutes;
