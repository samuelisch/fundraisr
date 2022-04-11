import React, { useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import callApi from './callApi'
import Homepage from "./components/Homepage";
import Navbar from "./components/Navbar";
import LoginModal from "./components/LoginModal";
import SignupModal from "./components/SignupModal";
import CampaignList from "./components/CampaignList";
import NewCampaign from "./components/NewCampaign";
import SingleCampaign from "./components/SingleCampaign";

const App = () => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    // initialse user - check if logged in
    let userCredentials = JSON.parse(window.localStorage.getItem('loggedUser'))
    if (userCredentials) {
      callApi.setToken(userCredentials.token);
      callApi
        .singleUser(userCredentials.id)
        .then(user => {
          setUser(user)
        })
    }
  }, [])

  useEffect(() => {
    if (user) {
      console.log(`logged in as ${user.name}`)
    }
  }, [user])

  return (
    <BrowserRouter>
      <LoginModal />
      <SignupModal />
      <Navbar />
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/campaigns" element={<CampaignList />} />
        <Route path="/campaigns/:id" element={<SingleCampaign />} />
        <Route path="/newcampaign" element={<NewCampaign />} />
      </Routes>
    </BrowserRouter>
  );
};

export default App;
