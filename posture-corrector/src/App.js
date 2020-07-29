import React from 'react';
import './App.css';
import { PivotBar } from './components/Pivot.jsx';
import ReactNotifications from 'react-notifications-component';

function App() {
  const [postureTime, setPostureTime] = React.useState(-1); // -1 means notifications not enabled
  const [stagnantTime, setStagnantTime] = React.useState(-1);
  
  return (
    <div className="App">
      <ReactNotifications/>

      <PivotBar 
        setPostureTime={setPostureTime}
        setStagnantTime={setStagnantTime}
        postureTime={postureTime}
        stagnantTime={stagnantTime}
      />
    </div>
  );
}

export default App;
