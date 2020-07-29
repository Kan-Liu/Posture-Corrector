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
      notificationsPostureTime: null,
      notificationsStagnantTime: null
    }
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
            label="Frequency of notifications in minutes" id={"stagnant-notification-title"} />
        </Stack>

        <PrimaryButton
          onClick={() => {
            this.generateNotification()
          }}
        >
          Save settings
        </PrimaryButton>
      </div>
    );
  }
  
  // ev is of type React.MouseEvent<HTMLElement> btw!
  handlePostureToggle = (ev, checked) => {
    this.setState({postureEnabled: checked});
  }

  handleStagnantToggle = (ev, checked) => {
    this.setState({stagnantEnabled: checked});
  }

  handlePostureChange = (event) => {
    this.setState({notificationsPostureTime: event.target.value});

  }

  handleStagnantChange = (event) => {
    this.setState({notificationsStagnantTime: event.target.value});

  }

  generateNotification() {
    var message = '';
    var postureTime = this.state.notificationsPostureTime;
    var stagnantTime = this.state.notificationsStagnantTime;
    var validTime = true;

    if (this.state.postureEnabled) {
      if (!isNaN(postureTime) && postureTime !== null) {
        message += `Setting posture notifications to repeat every ${this.state.notificationsPostureTime} minutes. `;
        this.props.setPostureTime(this.state.notificationsPostureTime);
      } else {
        validTime = false;
      }
    } else {
      this.props.setPostureTime(-1);
    }

    if (this.state.stagnantEnabled) {
      if (!isNaN(stagnantTime) && stagnantTime !== null) {
        message += `Setting stagnant notifications to repeat every ${this.state.notificationsStagnantTime} minutes. `;
        this.props.setStagnantTime(this.state.notificationsStagnantTime);
        validTime = true;
      } else {
        validTime = false;
      }
    } else {
      this.props.setStagnantTime(-1);
    }

    if (validTime === false) {
      this.noTimeSpecifiedNotification();
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

  noTimeSpecifiedNotification() {
    store.addNotification({
      title: "Error!",
      message: `Please specify a time in minutes`,
      type: "danger",
      container: "bottom-left",
      animationIn: ["animated", "fadeIn"],
      animationOut: ["animated", "fadeOut"],
      dismiss: {
        duration: 5000,
      },
    });
  }
}
