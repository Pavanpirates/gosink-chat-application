import React from "react";
import { useNavigate } from "react-router-dom";
import { MessageCircle, Users, Zap } from "lucide-react";
import chatIcon from "../assets/chat.png";

function LandingPage() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-black text-white">
      {/* Hero Section */}
      <div className="container mx-auto px-4 py-16">
        <div className="max-w-4xl mx-auto text-center">
          {/* Chat Icon */}
          <img
            src={chatIcon}
            className="w-20 h-20 mx-auto rounded-full object-cover drop-shadow-[0_0_10px_#ff6600cc] border-1 border-orange-500"
            alt="Chat Icon"
          />

          {/* Main Heading */}
          <h1 className="text-5xl font-bold mb-6 text-orange-500 drop-shadow-[0_0_10px_#ff6600aa]">
            Welcome to ChatRoom
          </h1>

          {/* Subtitle */}
          <p className="mb-12 text-gray-300 max-w-2xl mx-auto">
            Create your own chat rooms, connect with friends, and experience
            real-time conversations in a secure and intuitive environment.
          </p>

          {/* CTA Button */}
          <button
            onClick={() => navigate("/join")}
            className="bg-orange-600 hover:bg-orange-700 text-white px-12 py-4 rounded-full text-lg font-semibold shadow-[0_0_20px_#ff6600aa] hover:shadow-[0_0_30px_#ff6600dd] transition-all duration-300"
          >
            Start Chatting
          </button>

          {/* Features Grid */}
          <div className="grid md:grid-cols-3 gap-8 mt-20">
            {/* Feature 1 */}
            <div className="p-6 rounded-lg bg-gradient-to-b from-orange-950/30 to-black border border-orange-900/30 hover:border-orange-600/50 transition-all duration-300">
              <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-orange-600/20 flex items-center justify-center">
                <Users className="w-6 h-6 text-orange-500" />
              </div>
              <h3 className="mb-2 text-orange-400 font-semibold">
                Create Rooms
              </h3>
              <p className="text-gray-400 text-sm">
                Set up custom chat rooms for your team, friends, or community in
                seconds.
              </p>
            </div>

            {/* Feature 2 */}
            <div className="p-6 rounded-lg bg-gradient-to-b from-orange-950/30 to-black border border-orange-900/30 hover:border-orange-600/50 transition-all duration-300">
              <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-orange-600/20 flex items-center justify-center">
                <MessageCircle className="w-6 h-6 text-orange-500" />
              </div>
              <h3 className="mb-2 text-orange-400 font-semibold">
                Real-time Chat
              </h3>
              <p className="text-gray-400 text-sm">
                Experience instant messaging with lightning-fast delivery and
                seamless conversations.
              </p>
            </div>

            {/* Feature 3 */}
            <div className="p-6 rounded-lg bg-gradient-to-b from-orange-950/30 to-black border border-orange-900/30 hover:border-orange-600/50 transition-all duration-300">
              <div className="w-12 h-12 mx-auto mb-4 rounded-full bg-orange-600/20 flex items-center justify-center">
                <Zap className="w-6 h-6 text-orange-500" />
              </div>
              <h3 className="mb-2 text-orange-400 font-semibold">
                Instant Setup
              </h3>
              <p className="text-gray-400 text-sm">
                No complex configuration needed. Jump in and start chatting
                immediately.
              </p>
            </div>
          </div>
        </div>
      </div>

      {/* Footer */}
      <div className="border-t border-orange-900/30 mt-20">
        <div className="container mx-auto px-4 py-8 text-center text-gray-500 text-sm">
          <p>© 2025 goSink. Connect, Chat, Collaborate.</p>
        </div>
      </div>
    </div>
  );
}

export default LandingPage;
