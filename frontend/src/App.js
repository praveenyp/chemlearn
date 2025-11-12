import React, { useState, useEffect } from "react";
import "./App.css";
import { BrowserRouter as Router, Routes, Route, Link, useLocation } from "react-router-dom";
import PeriodicTable from "./pages/PeriodicTable";
import Quiz from "./pages/Quiz";
import ReactionBalancer from "./pages/ReactionBalancer";
import Home from "./pages/Home";



function App() {
  return (
    <Router>
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
