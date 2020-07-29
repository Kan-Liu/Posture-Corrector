import React from 'react';
import './App.css';
import { PivotBar } from './components/Pivot.jsx';
import ReactNotifications from 'react-notifications-component';

function App() {
  const [postureEnabled, setPostureEnabled] = React.useState(false);
  const [stagnantEnabled, setStagnantEnabled] = React.useState(false);
  const [postureTime, setPostureTime] = React.useState('Enter a number');
  const [stagnantTime, setStagnantTime] = React.useState('Enter a number');

  return (
    <div className="App">
            <ReactNotifications/>

      <PivotBar 
        setPostureEnabled={setPostureEnabled}
        setStagnantEnabled={setStagnantEnabled}
        setPostureTime={setPostureTime}
        setStagnantTime={setStagnantTime}
        postureEnabled={postureEnabled}
        stagnantEnabled={stagnantEnabled}
        postureTime={postureTime}
        stagnantTime={stagnantTime}
      />
    </div>
  );
}

export default App;
