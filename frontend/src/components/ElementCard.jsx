import React from "react";

export default function ElementCard({ element, onClick }) {
  return (
    <div
      onClick={() => onClick(element)}
      className="cursor-pointer bg-white/70 backdrop-blur-md shadow-lg rounded-2xl p-4 hover:shadow-xl hover:scale-105 transform transition-all duration-200 border border-gray-200"
    >
      <h2 className="text-2xl font-bold text-blue-700">{element.symbol}</h2>
      <p className="text-gray-600">{element.name}</p>
      <p className="text-sm text-gray-500 mt-2">Atomic No: {element.atomicNumber}</p>
    </div>
  );
}
