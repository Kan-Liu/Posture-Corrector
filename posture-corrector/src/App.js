import React from 'react';
import './App.css';
import ReactNotifications from 'react-notifications-component';
import { Notifications } from './components/Notifications';
import { PivotBar } from './components/Pivot.tsx';

function App() {
  return (
    <div className="App">
      <ReactNotifications/>
      <PivotBar/>
    </div>
  );
}

export default App;
