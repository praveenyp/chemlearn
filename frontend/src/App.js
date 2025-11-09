import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom";
import PeriodicTable from "./pages/PeriodicTable";
import Quiz from "./pages/Quiz";
import ReactionBalancer from "./pages/ReactionBalancer";
import Home from "./pages/Home";

function Navbar() {
  const [open, setOpen] = useState(false);
  const location = useLocation();

  // close mobile menu on navigation
  useEffect(() => {
    setOpen(false);
  }, [location.pathname]);

  const containerStyle = { padding: "10px 12px", background: "#fff", borderBottom: "1px solid #e6e6e6" };
  const innerStyle = { maxWidth: 1000, margin: "0 auto", display: "flex", alignItems: "center", justifyContent: "space-between" };
  const linksStyle = { display: "flex", gap: 12, alignItems: "center" };
  const linkStyle = { color: "#111827", textDecoration: "none", padding: "6px 8px" };
  const brandStyle = { fontWeight: 600, color: "#0ea5e9" };

  return (
    <nav style={containerStyle} className="app-navbar" aria-label="Main navigation">
      <div style={innerStyle}>
        <div style={brandStyle} className="brand">
          <Link to="/" style={{ color: "inherit", textDecoration: "none" }}>ChemLearn</Link>
        </div>

        <div style={linksStyle} className="desktop-links" role="navigation" aria-hidden={open ? "true" : "false"}>
          <Link to="/" style={linkStyle}>Home</Link>
          <Link to="/elements" style={linkStyle}>Elements</Link>
          <Link to="/quizzes" style={linkStyle}>Quizzes</Link>
          <Link to="/reaction" style={linkStyle}>Reaction Balancer</Link>
        </div>

        <button
          onClick={() => setOpen(!open)}
          aria-label="Toggle menu"
          aria-expanded={open}
          aria-controls="mobile-menu"
          style={{ background: "transparent", border: "1px solid #ddd", padding: "6px 10px", borderRadius: 6 }}
          className="mobile-toggle"
        >
          {open ? "Close" : "Menu"}
        </button>
      </div>

      {open && (
        <div id="mobile-menu" className="mobile-menu" role="menu" aria-label="Mobile navigation">
          <Link to="/" onClick={() => setOpen(false)} style={linkStyle} role="menuitem">Home</Link>
          <Link to="/elements" onClick={() => setOpen(false)} style={linkStyle} role="menuitem">Elements</Link>
          <Link to="/quizzes" onClick={() => setOpen(false)} style={linkStyle} role="menuitem">Quizzes</Link>
          <Link to="/reaction" onClick={() => setOpen(false)} style={linkStyle} role="menuitem">Reaction Balancer</Link>
        </div>
      )}
    </nav>
  );
}

function App() {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/home" element={<Home />} />
        <Route path="/elements" element={<PeriodicTable />} />
        <Route path="/quizzes" element={<Quiz/>} />
        <Route path="/reaction" element={<ReactionBalancer />} />
      </Routes>
    </Router>
  );
}

export default App;
