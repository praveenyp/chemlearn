import React, { useEffect, useState } from "react";
import ElementCard from "../components/ElementCard";
import { useNavigate } from "react-router-dom";
import AiAssistant from "../components/AiAssistant";

export default function ElementsPage() {
  const [elements, setElements] = useState([]);
  const [search, setSearch] = useState("");
  const [filter, setFilter] = useState("All");
  const [selectedElement, setSelectedElement] = useState(null);
  const [aiFact, setAiFact] = useState("");

  // ✅ Fetch elements from backend
  useEffect(() => {
    fetch("http://localhost:5000/api/elements")
      .then((res) => res.json())
      .then((data) => setElements(data))
      .catch((err) => console.error("Error fetching elements:", err));
  }, []);

  // ✅ Handle Filter Logic
  const filteredElements = elements.filter((el) => {
    const matchSearch = [el.name, el.symbol, el.category]
      .join(" ")
      .toLowerCase()
      .includes(search.toLowerCase());
    const matchFilter =
      filter === "All" || el.category?.toLowerCase().includes(filter.toLowerCase());
    return matchSearch && matchFilter;
  });

  // ✅ AI Fun Fact (call backend)
  const getAiFact = async (elementName) => {
    try {
      const res = await fetch("http://localhost:5000/api/ai-fact", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ element: elementName }),
      });
      const data = await res.json();
      setAiFact(data.fact || "No fact available right now.");
    } catch {
      setAiFact("AI fact unavailable at the moment.");
    }
  };

  // ✅ When popup opens, fetch AI fact
  const handleOpenElement = (el) => {
    setSelectedElement(el);
    setAiFact("Fetching fun fact...");
    getAiFact(el.name);
  };

  const filters = ["All", "Metal", "Nonmetal", "Gas", "Noble Gas", "Halogen"];
const navigate = useNavigate();
  return (
    
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 p-6">
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
      <h1 className="text-4xl font-extrabold text-center text-blue-700 mb-6">
        🔬 ChemLearn – Elements Explorer
      </h1>

      {/* 🔍 Search Bar */}
      <div className="flex justify-center mb-4">
        <input
          type="text"
          placeholder="Search by name, symbol, or category..."
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          className="w-full max-w-md p-3 border rounded-xl shadow-sm focus:ring-2 focus:ring-blue-500 outline-none"
        />
      </div>

      {/* 🧭 Filter Buttons */}
      <div className="flex flex-wrap justify-center gap-2 mb-6">
        {filters.map((f) => (
          <button
            key={f}
            onClick={() => setFilter(f)}
            className={`px-4 py-2 rounded-full text-sm font-medium shadow-sm transition-all ${
              filter === f
                ? "bg-blue-600 text-white"
                : "bg-white text-blue-600 border border-blue-300 hover:bg-blue-100"
            }`}
          >
            {f}
          </button>
        ))}
      </div>

      {/* 🧪 Element Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-4">
        {filteredElements.map((el) => (
          <ElementCard key={el._id} element={el} onClick={handleOpenElement} />
        ))}
      </div>

      {/* 🧠 Popup Modal */}
      {selectedElement && (
        <div className="fixed inset-0 bg-black/50 flex justify-center items-center z-50">
          <div className="bg-white rounded-2xl shadow-xl p-6 w-11/12 max-w-lg relative">
            <button
              onClick={() => setSelectedElement(null)}
              className="absolute top-2 right-3 text-gray-500 hover:text-red-500 text-xl"
            >
              ✖
            </button>

            <h2 className="text-3xl font-bold text-blue-700 mb-2">
              {selectedElement.name} ({selectedElement.symbol})
            </h2>
            <p className="text-gray-600 mb-3">
              Atomic Number: {selectedElement.atomicNumber}
            </p>
            <p className="text-gray-700">
              <strong>Group:</strong> {selectedElement.group} |{" "}
              <strong>Period:</strong> {selectedElement.period}
            </p>
            <p className="mt-3 text-gray-700">
              <strong>Category:</strong> {selectedElement.category}
            </p>
            <p className="mt-3 text-gray-700">
              <strong>Atomic Mass:</strong> {selectedElement.atomicMass}
            </p>
            <p className="mt-3 text-gray-700">
              <strong>Uses:</strong>{" "}
              {selectedElement.uses && selectedElement.uses.join(", ")}
            </p>

            {/* 🤖 AI Fun Fact */}
            <div className="mt-4 p-3 bg-blue-50 border-l-4 border-blue-600 rounded">
              <p className="text-blue-700 italic">
                <strong>AI Fact:</strong> {aiFact}
              </p>
            </div>
          </div>
        </div>
      )}
      <AiAssistant/>
    </div>
  );
}
