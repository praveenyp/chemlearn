import React from "react";
import { BrowserRouter as Router, Routes, Route, Link } from "react-router-dom";
import PeriodicTable from "./pages/PeriodicTable";

function App() {
  return (
    <Router>
      <nav style={{ padding: "10px", background: "#eee" }}>
        <Link to="/">Home</Link> | <Link to="/elements">Elements</Link>
      </nav>
      <Routes>
        <Route path="/" element={<h1>Welcome to ChemLearn</h1>} />
        <Route path="/elements" element={<PeriodicTable />} />
      </Routes>
    </Router>
  );
}

export default App;
