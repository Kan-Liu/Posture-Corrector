import React from 'react';
import './App.css';
import { PivotBar } from './components/Pivot.jsx';
import ReactNotifications from 'react-notifications-component';

function App() {
	Notification.requestPermission();
	document.title = "Posture Corrector";
  const [postureTime, setPostureTime] = React.useState(-1);   // -1 means notifications not enabled
  
  return (
    <div className="App">
      <ReactNotifications/>

      <PivotBar 
        setPostureTime={setPostureTime}
        postureTime={postureTime}
      />
    </div>
  );
}

export default App;
