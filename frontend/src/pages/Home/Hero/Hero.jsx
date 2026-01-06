import React from "react";
import { motion } from "framer-motion";
import { useNavigate } from "react-router-dom";

const Hero = () => {
  const navigate = useNavigate();

  return (
    <div
      className="min-h-screen bg-cover bg-center relative overflow-hidden"
      style={{
        backgroundImage: 'url("https://i.ibb.co/pJZyS8X/banner-1.gif")',
      }}
    >
      {/* Clean overlay */}
      <div className="absolute inset-0 bg-gradient-to-r from-black via-black/80 to-black/60" />

      <div className="relative min-h-screen flex items-center px-6 md:px-16 lg:px-24">
        <motion.div 
          className="max-w-5xl"
          initial={{ opacity: 0, y: 20 }}
          animate={{ opacity: 1, y: 0 }}
          transition={{ duration: 0.6, ease: "easeOut" }}
        >
          <div className="space-y-8">
            {/* Minimal badge */}
            <motion.div
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              transition={{ delay: 0.2 }}
              className="inline-flex items-center space-x-2 px-4 py-2 rounded-full bg-white/5 border border-white/10 backdrop-blur-sm"
            >
              <span className="w-2 h-2 bg-purple-500 rounded-full animate-pulse"></span>
              <span className="text-sm text-gray-300 font-medium">Live Tournaments</span>
            </motion.div>

            {/* Clean heading */}
            <motion.h1 
              className="text-5xl md:text-7xl lg:text-8xl font-bold text-white leading-tight tracking-tight"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3, duration: 0.6 }}
            >
              Your Esports
              <br />
              <span className="bg-gradient-to-r from-purple-400 via-violet-400 to-purple-500 bg-clip-text text-transparent">
                Quest Begins
              </span>
            </motion.h1>

            {/* Minimal description */}
            <motion.p 
              className="text-lg md:text-xl text-gray-400 max-w-2xl font-light"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.4, duration: 0.6 }}
            >
              Join elite tournaments and compete with the best players worldwide
            </motion.p>

            {/* Clean CTA buttons */}
            <motion.div 
              className="flex flex-wrap items-center gap-4 pt-4"
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.5, duration: 0.6 }}
            >
              <button
                onClick={() => navigate("/register")}
                className="px-8 py-4 bg-gradient-to-r from-purple-600 to-violet-600 rounded-lg font-medium text-white transition-all hover:shadow-lg hover:shadow-purple-500/50 hover:-translate-y-0.5"
              >
                Get Started
              </button>

              <button
                onClick={() => navigate("/classes")}
                className="px-8 py-4 bg-white/5 border border-white/10 rounded-lg font-medium text-white hover:bg-white/10 transition-all backdrop-blur-sm"
              >
                View Tournaments
              </button>
            </motion.div>
          </div>
        </motion.div>
      </div>
    </div>
  );
};

export default Hero;
