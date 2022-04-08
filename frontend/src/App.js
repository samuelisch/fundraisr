import React from "react";

import Homepage from "./components/Homepage";
import Navbar from "./components/Navbar";
import Modals from "./components/assets/Modals";

const App = () => {
  return (
    <>
      <Modals />
      <div className="App">
        <Navbar />
        <h1>Hello world!</h1>
        <Homepage />
      </div>
    </>
  );
};

export default App;
