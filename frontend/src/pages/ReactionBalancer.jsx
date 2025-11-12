import React, { useState } from "react";
import AiAssistant from "../components/AiAssistant";
export default function ReactionBalancer() {
  const [equation, setEquation] = useState("");
  const [aiResponse, setAiResponse] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setAiResponse(null);

    try {
      const res = await fetch("http://localhost:5000/api/ai-balance", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ equation }),
      });

      const data = await res.json();

      if (res.ok) {
        setAiResponse(data);
      } else {
        setError(data.error || "Something went wrong!");
      }
    } catch (err) {
      console.error("Error:", err);
      setError("Failed to connect to server. Please try again later.");
    } finally {
      setLoading(false);
    }
  };

  return (
  <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 flex flex-col items-center justify-center p-6">
    {/* Header Section */}
    <div className="text-center mb-10">
      <h1 className="text-4xl font-extrabold text-blue-700 mb-2">
      AI-Powered Reaction Balancer
      </h1>
      <p className="text-gray-600 max-w-2xl mx-auto text-lg">
        Type any chemical equation below — our AI model will balance it
        automatically and explain how it works in simple language.
      </p>
    </div>

    {/* Input Card */}
    <div className="bg-white shadow-2xl border border-gray-200 rounded-2xl w-full max-w-2xl p-8">
      <form onSubmit={handleSubmit} className="flex flex-col items-center space-y-4">
        <input
          type="text"
          value={equation}
          onChange={(e) => setEquation(e.target.value)}
          placeholder="e.g., Fe + O2 -> Fe2O3"
          className="w-full border-2 border-blue-200 focus:border-blue-500 p-3 rounded-lg text-gray-800 text-lg focus:outline-none"
          required
        />

        <button
          type="submit"
          className="bg-blue-600 text-white text-lg font-semibold px-6 py-2 rounded-lg shadow hover:bg-blue-700 transition-all"
          disabled={loading}
        >
          {loading ? "🤖 Balancing..." : "Balance Equation"}
        </button>
      </form>

      {/* Error message */}
      {error && (
        <div className="mt-4 text-center bg-red-100 text-red-700 py-2 px-3 rounded-lg">
          ⚠️ {error}
        </div>
      )}

      {/* Loading State */}
      {loading && (
        <div className="mt-6 text-center text-blue-600 italic">
          🤔 AI is analyzing molecular ratios and balancing the equation...
        </div>
      )}

      {/* AI Output */}
      {aiResponse && (
        <div className="mt-8 bg-gradient-to-br from-blue-50 to-blue-100 border border-blue-200 rounded-xl p-6">
          <h2 className="text-2xl font-bold text-blue-700 mb-3">
            ✅ Balanced Equation
          </h2>
          <p className="text-xl font-semibold text-gray-800 mb-4">
            {aiResponse.balanced || "Could not identify balanced equation."}
          </p>

          <h3 className="text-lg font-semibold text-blue-700 mb-2">
            🧠 Explanation
          </h3>
          <p className="text-gray-700 leading-relaxed whitespace-pre-line">
            {aiResponse.explanation || "AI didn’t provide an explanation."}
          </p>
        </div>
      )}
    </div>

    {/* Footer */}
    <div className="text-center text-sm text-gray-500 mt-8">
      Powered by <span className="font-semibold text-blue-600">Gemini AI</span>
    </div>
    <AiAssistant/>
  </div>
);

}
