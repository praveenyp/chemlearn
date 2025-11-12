import React from "react";
import { useNavigate } from "react-router-dom";
import AiAssistant from "../components/AiAssistant";

export default function Home() {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-[#f0f9ff] via-[#e0f7ff] to-[#faffff] text-gray-800 font-inter flex flex-col">
      {/* ---------------- NAVBAR ---------------- */}
      <nav className="backdrop-blur-md bg-white/70 border-b border-[#90e0ef]/40 sticky top-0 z-50">
        <div className="flex justify-between items-center px-10 py-4">
          <h1
            onClick={() => navigate("/")}
            className="text-2xl font-bold text-transparent bg-clip-text bg-gradient-to-r from-[#0077b6] to-[#00b4d8] cursor-pointer"
          >
            ChemLearn
          </h1>
          <ul className="flex gap-6 text-[#0077b6] font-medium">
            <li
              onClick={() => navigate("/")}
              className="cursor-pointer hover:text-[#0096c7] transition"
            >
              Home
            </li>
            <li
              onClick={() => navigate("/elements")}
              className="cursor-pointer hover:text-[#0096c7] transition"
            >
              Elements
            </li>
            <li
              onClick={() => navigate("/quizzes")}
              className="cursor-pointer hover:text-[#0096c7] transition"
            >
              Quiz
            </li>
            <li
              onClick={() => navigate("/reaction")}
              className="cursor-pointer hover:text-[#0096c7] transition"
            >
              AI Balancer
            </li>
           
          </ul>
        </div>
      </nav>

      {/* ---------------- HERO SECTION ---------------- */}
      <header className="text-center py-16 px-6">
        <h1 className="text-6xl font-extrabold text-transparent bg-clip-text bg-gradient-to-r from-[#0077b6] to-[#00b4d8]">
          Explore. Learn. Balance. ⚗️
        </h1>
        <p className="text-lg text-gray-600 mt-4 max-w-3xl mx-auto">
          A futuristic chemistry learning platform that combines interactive
          visuals, AI-based insights, and smart tools to make learning science
          effortless and engaging.
        </p>

        <div className="mt-8 flex justify-center gap-6 flex-wrap">
          <button
            onClick={() => navigate("/elements")}
            className="bg-[#00b4d8] hover:bg-[#0096c7] text-white font-medium px-6 py-3 rounded-full shadow-md hover:shadow-lg transition"
          >
            🔬 Explore Elements
          </button>
          <button
            onClick={() => navigate("/quiz")}
            className="bg-[#90e0ef] hover:bg-[#48cae4] text-[#023e8a] font-medium px-6 py-3 rounded-full shadow-md hover:shadow-lg transition"
          >
            🧠 Take Quiz
          </button>
        </div>
      </header>

      {/* ---------------- MODULES SECTION ---------------- */}
      <main className="flex flex-wrap justify-center gap-10 px-8 pb-16">
        {/* Elements Module */}
        <div
          onClick={() => navigate("/elements")}
          className="cursor-pointer bg-white/80 backdrop-blur-lg border border-[#90e0ef]/60 hover:border-[#00b4d8] transition-all duration-300 hover:scale-105 hover:shadow-lg p-8 rounded-3xl text-center w-72"
        >
          <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-[#00b4d8] to-[#48cae4] rounded-full flex items-center justify-center text-white text-3xl font-bold">
            E
          </div>
          <h2 className="text-2xl font-bold text-[#0077b6]">
            Elements Explorer
          </h2>
          <p className="text-sm text-gray-600 mt-2">
            View all periodic elements, and explore real-time AI insights about
            each one.
          </p>
        </div>

        {/* Quiz Module */}
        <div
          onClick={() => navigate("/quizzes")}
          className="cursor-pointer bg-white/80 backdrop-blur-lg border border-[#90e0ef]/60 hover:border-[#00b4d8] transition-all duration-300 hover:scale-105 hover:shadow-lg p-8 rounded-3xl text-center w-72"
        >
          <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-[#00b4d8] to-[#90e0ef] rounded-full flex items-center justify-center text-white text-3xl font-bold">
            Q
          </div>
          <h2 className="text-2xl font-bold text-[#0077b6]">Quiz Arena</h2>
          <p className="text-sm text-gray-600 mt-2">
            Sharpen your knowledge with interactive quizzes and AI-powered hints.
          </p>
        </div>

        {/* Reaction Balancer */}
        <div
          onClick={() => navigate("/reaction")}
          className="cursor-pointer bg-white/80 backdrop-blur-lg border border-[#90e0ef]/60 hover:border-[#00b4d8] transition-all duration-300 hover:scale-105 hover:shadow-lg p-8 rounded-3xl text-center w-72"
        >
          <div className="w-16 h-16 mx-auto mb-4 bg-gradient-to-br from-[#0077b6] to-[#48cae4] rounded-full flex items-center justify-center text-white text-3xl font-bold">
            R
          </div>
          <h2 className="text-2xl font-bold text-[#0077b6]">
            AI Reaction Balancer
          </h2>
          <p className="text-sm text-gray-600 mt-2">
            Let AI balance complex equations with accurate step-by-step reasoning.
          </p>
        </div>
      </main>

      {/* ---------------- ABOUT SECTION ---------------- */}
      <section className="bg-white/70 py-12 border-t border-[#caf0f8]/60 text-center px-6">
        <h2 className="text-3xl font-bold text-[#0077b6] mb-3">Why ChemLearn?</h2>
        <p className="max-w-3xl mx-auto text-gray-600 leading-relaxed">
          ChemLearn is built for students, educators, and enthusiasts who want
          to make chemistry more interactive. Whether you’re identifying
          elements, practicing reactions, or testing your skills, our AI-based
          approach helps you understand science more intuitively.
        </p>
      </section>

      {/* ---------------- FOOTER ---------------- */}
      <footer className="text-center py-6 text-gray-500 text-sm border-t border-[#caf0f8]/50 bg-white/60">
        © {new Date().getFullYear()} ChemLearn | Empowering Future Scientists ⚗️
      </footer>
      <AiAssistant/>
    </div>
  );
}
