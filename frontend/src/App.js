import React, { createContext, useEffect, useState } from "react";
import { BrowserRouter, Routes, Route } from "react-router-dom";
import callApi from "./callApi";
import Homepage from "./components/Homepage";
import Navbar from "./components/Navbar";
import CampaignList from "./components/CampaignList";
import NewCampaign from "./components/NewCampaign";
import SingleCampaign from "./components/SingleCampaign";
import Login from "./components/Login";
import Signup from "./components/Signup";

export const UserContext = createContext();

const App = () => {
  const [user, setUser] = useState(null);
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    // initialse user - check if logged in
    let userCredentials = JSON.parse(window.localStorage.getItem("loggedUser"));
    if (userCredentials) {
      callApi.setToken(userCredentials.token);
      callApi
        .singleUser(userCredentials.id)
        .then((user) => {
          setUser(user);
          setLoaded(true);
        })
        .catch((error) => {
          console.error("login error", error);
          window.localStorage.removeItem("loggedUser");
          setLoaded(true);
        });
    } else {
      setLoaded(true);
    }
  }, []);

  useEffect(() => {
    if (user) {
      console.log(`logged in as ${user.name}`);
    }
  }, [user]);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <UserContext.Provider value={{user, setUser}}>
        <Navbar />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/campaigns" element={<CampaignList />} />
          <Route path="/campaigns/:id" element={<SingleCampaign />} />
          <Route path="/newcampaign" element={<NewCampaign />} />
          {/* <Route path="/profile/:id" element={<UserProfile />} /> */}
        </Routes>
      </UserContext.Provider>
    </BrowserRouter>
  );
};

export default App;
