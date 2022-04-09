import React from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import Homepage from "./components/Homepage";
import Navbar from "./components/Navbar";
import LoginModal from "./components/LoginModal";
import SignupModal from "./components/SignupModal";
import CampaignList from "./components/CampaignList";

const App = () => {
  return (
    <BrowserRouter>
      <LoginModal />
      <SignupModal />
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/campaigns" element={<CampaignList />} />
        {/* <Route path="/campaigns/:id" element={<SingleCampaign />} /> */}
        {/* <Route path="/newcampaign" element={<NewCampaignForm />} /> */}
      </Routes>
    </BrowserRouter>
  );
};

export default App;
