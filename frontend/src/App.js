import React from 'react';
import callApi from './callapi'
import Homepage from './components/Homepage';


const App = () => {
  return (
    <div className="App">
      <h1>Hello world!</h1>
      <Homepage/>
    </div>
  );
}

export default App;
