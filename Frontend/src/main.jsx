import React from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { BrowserRouter } from "react-router-dom";
import App from "./App";
import { ChatProvider } from "./context/ChatContext";
import { Toaster } from "react-hot-toast";

createRoot(document.getElementById("root")).render(
  <React.StrictMode>
    <BrowserRouter>
      <ChatProvider>
        <Toaster position="top-center" />
        <App />
      </ChatProvider>
    </BrowserRouter>
  </React.StrictMode>
);
