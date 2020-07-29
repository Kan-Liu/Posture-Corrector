import React, { createRef } from "react";
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import { store } from "react-notifications-component";
import { DefaultButton, PrimaryButton, Stack } from 'office-ui-fabric-react';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { Toggle } from 'office-ui-fabric-react/lib/Toggle';

const stackTokens = { childrenGap: 30 };

export class Notifications extends React.Component {

  constructor(props) {
    super(props);

    this.state = {
      postureEnabled: false,
      stagnantEnabled: false,
      postureTime: 'Enter a number',
      stagnantTime: 'Enter a number',
    };
  }

  render() {
    return (
      <div className="notifications-container">
        <Stack horizontal tokens={stackTokens} verticalAlign="start" className="notifications">
          <Toggle 
            onChange={this.handlePostureToggle}
            label="Receive posture check notifications" 
            onText="Yes" offText="No" />
          <TextField 
            value={this.state.postureTime}
            onChange={this.handlePostureChange}
            onClick={this.handlePostureClick}
            label="Frequency of notifications in minutes" 
            id={"posture-notification-title"} />
        </Stack>

        <Stack horizontal tokens={stackTokens} verticalAlign="start" className="notifications">
          <Toggle 
            onChange={this.handleStagnantToggle}
            label="Receive stagnant position notifications" 
            onText="Yes" offText="No" />
          <TextField
            value={this.state.stagnantTime}
            onChange={this.handleStagnantChange}
            onClick={this.handleStagnantClick}
            label="Frequency of notifications in minutes" id={"stagnant-notification-title"} />
        </Stack>

        <PrimaryButton
          onClick={() => {
            this.generateNotification()
          }}
        >
          Simulate notification
        </PrimaryButton>
      </div>
    );
  }

  _onChange(ev, checked) {
    console.log('toggle is ' + (checked ? 'checked' : 'not checked'));
  }
  
  // ev is of type React.MouseEvent<HTMLElement> btw!
  handlePostureToggle = (ev, checked) => {
    this.setState({
      postureEnabled: checked,
    });
  }

  handleStagnantToggle = (ev, checked) => {
    this.setState({
      stagnantEnabled: checked,
    });  
  }

  handlePostureChange = (event) => {
    this.setState({
      postureTime: event.target.value,
    });
  }

  handleStagnantChange = (event) => {
    this.setState({
      stagnantTime: event.target.value,
    })
  }

  handlePostureClick = () => {
    this.setState({
      postureTime:'',
    });
  }

  handleStagnantClick = () => {
    this.setState({
      stagnantTime:'',
    })
  }

  generateNotification() {
    var message = '';
    if (this.state.postureEnabled) {
      message += `Setting posture notifications to repeat every ${this.state.postureTime} minutes. `;
    }
    if (this.state.stagnantEnabled) {
      message += `Setting stagnant notifications to repeat every ${this.state.stagnantTime} minutes. `;
    }
    if (message !== '') {
      store.addNotification({
        title: "Updated notification preferences",
        message: `${message}`,
        type: "default",
        container: "bottom-left",
        animationIn: ["animated", "fadeIn"],
        animationOut: ["animated", "fadeOut"],
        dismiss: {
          duration: 5000,
        },
      });
      const newNot = new Notification(`We've updated your notifications for the Posture App`, 
        {body: `You will now receive posture notifications...`});
    }
  }
}