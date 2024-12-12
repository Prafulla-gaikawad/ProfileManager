import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import Home from "./pages/Home";
import AdminPanel from "./components/AdminPanel";


const App = () => {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Home/>} />
        <Route path="/admin" element={<AdminPanel />} />
      </Routes>
    </Router>
  );
};

export default App;
