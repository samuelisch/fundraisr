import React, { createContext, useEffect, useState } from "react";
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import callApi from "./callApi";
import Homepage from "./components/Homepage";
import Navbar from "./components/Navbar";
import CampaignList from "./components/CampaignList";
import NewCampaign from "./components/NewCampaign";
import SingleCampaign from "./components/SingleCampaign";
import Login from "./components/Login";
import Signup from "./components/Signup";
import ProtectedRoute from "./ProtectedRoute";
import UserProfile from "./components/UserProfile";

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
          window.localStorage.removeItem("loggedUser");
          setLoaded(true);
        });
    } else {
      setLoaded(true);
    }
  }, []);

  if (!loaded) {
    return null;
  }

  return (
    <BrowserRouter>
      <UserContext.Provider value={{ user, setUser }}>
        <Navbar />
        <Routes>
          <Route path="/" element={<Homepage />} />
          <Route path="/login" element={<Login />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/campaigns" element={<CampaignList />} />
          <Route path="/campaigns/:id" element={<SingleCampaign />} />
          <Route
            path="/newcampaign"
            element={
              <ProtectedRoute>
                <NewCampaign />
              </ProtectedRoute>
            }
          />
          <Route
            path="/profile"
            element={
              <ProtectedRoute>
                <UserProfile />
              </ProtectedRoute>
            }
          />
          <Route path="*" element={<Navigate to="/" replace />} />
        </Routes>
      </UserContext.Provider>
    </BrowserRouter>
  );
};

export default App;
