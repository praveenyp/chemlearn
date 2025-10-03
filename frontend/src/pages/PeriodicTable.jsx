import React, { useEffect, useState } from "react";
import axios from "axios";

export default function PeriodicTable() {
  const [elements, setElements] = useState([]);
  const [selectedElement, setSelectedElement] = useState(null); // track clicked element

  useEffect(() => {
    axios
      .get("http://localhost:5000/api/elements")
      .then(res => setElements(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div style={{ padding: "20px" }}>
      <h1>Periodic Table of Elements</h1>
      <div
        style={{
          display: "grid",
          gridTemplateColumns: "repeat(10, 1fr)",
          gap: "10px",
          marginTop: "20px"
        }}
      >
        {elements.map(el => (
          <div
            key={el.atomicNumber}
            style={{
              border: "1px solid #ccc",
              borderRadius: "8px",
              padding: "10px",
              textAlign: "center",
              cursor: "pointer"
            }}
            onClick={() => setSelectedElement(el)} // 👈 click event
          >
            <h3>{el.symbol}</h3>
            <p>{el.name}</p>
            <small>#{el.atomicNumber}</small>
          </div>
        ))}
      </div>

      {/* Simple Popup Modal */}
      {selectedElement && (
        <div
          style={{
            position: "fixed",
            top: 0,
            left: 0,
            width: "100%",
            height: "100%",
            background: "rgba(0,0,0,0.5)",
            display: "flex",
            justifyContent: "center",
            alignItems: "center"
          }}
          onClick={() => setSelectedElement(null)} // close when clicking outside
        >
          <div
            style={{
              background: "#fff",
              padding: "20px",
              borderRadius: "10px",
              width: "400px",
              position: "relative"
            }}
            onClick={(e) => e.stopPropagation()} // prevent close on inner click
          >
            <button
              onClick={() => setSelectedElement(null)}
              style={{ position: "absolute", top: 10, right: 10 }}
            >
              ❌
            </button>
            <h2>{selectedElement.name} ({selectedElement.symbol})</h2>
            <p><b>Atomic Number:</b> {selectedElement.atomicNumber}</p>
            <p><b>Atomic Mass:</b> {selectedElement.atomicMass}</p>
            <p><b>Category:</b> {selectedElement.category}</p>
            <p><b>Group:</b> {selectedElement.group}</p>
            <p><b>Period:</b> {selectedElement.period}</p>
            <p><b>Uses:</b> {selectedElement.uses?.join(", ")}</p>
          </div>
        </div>
      )}
    </div>
  );
}
