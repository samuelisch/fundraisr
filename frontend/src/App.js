import React from 'react';
import Homepage from './components/Homepage';
import Navbar from "./components/Navbar";

const App = () => {
  return (
    <div className="App pl-5">
      <Navbar />
      <h1>Hello world!</h1>
      <Homepage />
    </div>
  );
}

export default App;
