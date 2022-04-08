import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Homepage from "./components/Homepage";
import Navbar from "./components/Navbar";
import LoginModal from "./components/LoginModal";
import SignupModal from "./components/SignupModal";

const App = () => {
  return (
    <div className="App">
      <LoginModal />
      <SignupModal />
      <BrowserRouter>
        <Navbar />
        <Routes>
          <Route path="/" element={<Homepage />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
};

export default App;
