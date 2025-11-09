import React, { useState, useEffect } from "react";
import { motion } from "framer-motion";

export default function ElementsPage() {
  const [elements, setElements] = useState([]);
  const [selected, setSelected] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  // ✅ Fetch elements from backend
  useEffect(() => {
    const fetchElements = async () => {
      try {
        const res = await fetch("http://localhost:5000/api/elements");
        const data = await res.json();
        setElements(data);
      } catch (err) {
        console.error("Error fetching elements:", err);
        setError("Failed to load elements. Please try again later.");
      } finally {
        setLoading(false);
      }
    };
    fetchElements();
  }, []);

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-blue-100 flex flex-col items-center p-6">
      {/* Header */}
      <div className="text-center mb-10">
        <h1 className="text-4xl font-extrabold text-blue-700 mb-2">
        Periodic Elements Explorer
        </h1>
        <p className="text-gray-600 max-w-2xl mx-auto text-lg">
          Explore the building blocks of chemistry. Click on any element card
          to learn its key properties and uses.
        </p>
      </div>

      {/* Loading */}
      {loading && (
        <div className="text-blue-600 text-lg font-semibold">
          🔄 Loading elements...
        </div>
      )}

      {/* Error */}
      {error && (
        <div className="text-red-600 bg-red-100 px-4 py-2 rounded-lg">
          {error}
        </div>
      )}

      {/* Elements Grid */}
      {!loading && !error && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          transition={{ duration: 0.5 }}
          className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6 gap-5 w-full max-w-6xl"
        >
          {elements.map((el) => (
            <motion.div
              key={el.atomicNumber}
              whileHover={{ scale: 1.05 }}
              onClick={() => setSelected(el)}
              className="bg-white cursor-pointer shadow-md hover:shadow-xl border border-gray-200 rounded-2xl p-4 text-center transition-all duration-200"
            >
              <h2 className="text-3xl font-bold text-blue-600">{el.symbol}</h2>
              <p className="text-gray-700 font-medium">{el.name}</p>
              <p className="text-sm text-gray-500">
                Atomic No: {el.atomicNumber}
              </p>
            </motion.div>
          ))}
        </motion.div>
      )}

      {/* Element Detail Popup */}
      {selected && (
        <div className="fixed inset-0 bg-black bg-opacity-40 flex justify-center items-center z-50">
          <motion.div
            initial={{ scale: 0.8, opacity: 0 }}
            animate={{ scale: 1, opacity: 1 }}
            transition={{ duration: 0.3 }}
            className="bg-white p-8 rounded-2xl shadow-2xl w-96 text-center relative"
          >
            <button
              onClick={() => setSelected(null)}
              className="absolute top-3 right-3 text-gray-500 hover:text-gray-800"
            >
              ✖
            </button>

            <h2 className="text-4xl font-bold text-blue-700 mb-2">
              {selected.symbol}
            </h2>
            <h3 className="text-xl font-semibold text-gray-800 mb-3">
              {selected.name}
            </h3>
            <p className="text-gray-600 mb-1">
              <span className="font-semibold">Atomic Number:</span>{" "}
              {selected.atomicNumber}
            </p>
            <p className="text-gray-600 mb-1">
              <span className="font-semibold">Atomic Mass:</span>{" "}
              {selected.atomicMass}
            </p>
            <p className="text-gray-600 mb-1">
              <span className="font-semibold">Category:</span>{" "}
              {selected.category}
            </p>
            <p className="text-gray-600 mb-3">
              <span className="font-semibold">Group:</span> {selected.group},{" "}
              <span className="font-semibold">Period:</span> {selected.period}
            </p>

            <h4 className="font-semibold text-gray-800 mt-4 mb-2">Uses:</h4>
            <ul className="text-gray-600 text-sm list-disc list-inside text-left mx-auto w-3/4">
              {selected.uses?.map((use, index) => (
                <li key={index}>{use}</li>
              ))}
            </ul>

            <button
              onClick={() => setSelected(null)}
              className="mt-5 px-6 py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700 transition"
            >
              Close
            </button>
          </motion.div>
        </div>
      )}

      {/* Footer */}
      
    </div>
  );
}
