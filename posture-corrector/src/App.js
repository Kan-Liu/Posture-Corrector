import React from 'react';
import './App.css';
import { PivotBar } from './components/Pivot.jsx';
import ReactNotifications from 'react-notifications-component';

function App() {
	document.title = "Posture Corrector";
  const [postureTime, setPostureTime] = React.useState(-1);   // -1 means notifications not enabled
  const [goodReference, setGoodReference] = React.useState(null);
  const [badReference, setBadReference] = React.useState(null);

  return (
    <div className="App">
      <ReactNotifications/>

      <PivotBar 
        setPostureTime={setPostureTime}
        postureTime={postureTime}
        goodReference={goodReference}
        setGoodReference={setGoodReference}
        badReference={badReference}
        setBadReference={setBadReference}
      />
    </div>
  );
}

export default App;
