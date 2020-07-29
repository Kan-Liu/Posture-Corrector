import React, { createRef } from "react";
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import { store } from "react-notifications-component";
import { PrimaryButton, Stack } from "office-ui-fabric-react";
import { TextField } from "office-ui-fabric-react/lib/TextField";
import { Toggle } from "office-ui-fabric-react/lib/Toggle";

const stackTokens = { childrenGap: 30 };

export class Notifications extends React.Component {
  constructor(props) {
    super(props);
    this.state = {
      postureEnabled: this.props.postureTime !== -1 ? true : false,
      notificationsPostureTime: "",
    };
  }

  render() {
    return (
      <div className="notifications-container">
        <Stack
          horizontal
          tokens={stackTokens}
          verticalAlign="start"
          className="notifications"
        >
          <Toggle
            checked={this.state.postureEnabled}
            onChange={this.handlePostureToggle}
            label="Receive posture check notifications"
            onText="On"
            offText="Off"
          />
          <div>
            {this.state.postureEnabled ? (
              <TextField
                value={this.state.postureTime}
                onChange={this.handlePostureChange}
                label="Frequency of notifications in minutes"
                id={"posture-notification-title"}
              />
            ) : null}
          </div>
        </Stack>

        <PrimaryButton
          onClick={() => {
            this.generateNotification();
          }}
        >
          Save settings
        </PrimaryButton>
      </div>
    );
  }

  // ev is of type React.MouseEvent<HTMLElement> btw!
  handlePostureToggle = (ev, checked) => {
    this.setState({ postureEnabled: checked });
  };

  handlePostureChange = (event) => {
    this.setState({ notificationsPostureTime: event.target.value });
  };

  generateNotification() {
    var postureTime = this.state.notificationsPostureTime;
    var validTime = true;

    if (this.state.postureEnabled) {
      if (
        !isNaN(postureTime) &&
        Math.floor(postureTime) > 0 &&
        postureTime !== ""
      ) {
        var message = `Setting posture notifications to repeat every ${postureTime} minutes. `;
        this.props.setPostureTime(postureTime);
        this.displayNotification(
          "Updated notification preferences",
          message,
          "default"
        );
      } else {
        this.timeSetError();
      }
    }
  }

  timeSetError() {
    this.displayNotification(
      "Error!",
      "Please specify a valid time in minutes",
      "danger"
    );
  }

  displayNotification(title, message, type) {
    store.addNotification({
      title: title,
      message: message,
      type: type,
      container: "bottom-left",
      animationIn: ["animated", "fadeIn"],
      animationOut: ["animated", "fadeOut"],
      dismiss: {
        duration: 5000,
      },
    });
  }
}
