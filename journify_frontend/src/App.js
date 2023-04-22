import logo from "./logo.svg";
import "./App.css";
import { useState } from "react";
import APIService from "./component/APIService";
import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import HomePage from "./pages/HomePage/HomePage";
import Navbar from "./components/Navbar/Navbar";

function App() {
  const [title, setTitle] = useState("THIS IS TITLE");
  const [body, setBody] = useState("THIS IS BODY");

  //title and body are temp, can be collected from form using useSTate
  //use APIService component to call backend
  APIService.InsertArticle({ title, body });

  return (
    <Router>
      <Routes>
        <Route exact path="/" element={<HomePage />} />
      </Routes>
    </Router>
  );
}

export default App;
