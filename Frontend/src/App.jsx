import React from "react";
import AppRoutes from "./config/Routes";
import { Toaster } from "react-hot-toast";

function App() {
  return (
    <div className="min-h-screen bg-black text-white">
      <Toaster position="top-center" />
      <AppRoutes />
    </div>
  );
}

export default App;
