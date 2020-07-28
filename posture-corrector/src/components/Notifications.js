import React from "react";
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import { store } from "react-notifications-component";
import { DefaultButton, PrimaryButton, Stack } from 'office-ui-fabric-react';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { Toggle } from 'office-ui-fabric-react/lib/Toggle';

const stackTokens = { childrenGap: 30 };

export class Notifications extends React.Component {
  render() {
    return (
      <div className="notifications-container">
        <Stack horizontal tokens={stackTokens} verticalAlign="start" className="notifications">
          <Toggle label="Receive posture check notifications" onText="Yes" offText="No" />
          <TextField label="Frequency of notifications in minutes" id={"posture-notification-title"} />
        </Stack>

        <Stack horizontal tokens={stackTokens} verticalAlign="start" className="notifications">
          <Toggle label="Receive stagnant position notifications" onText="Yes" offText="No" />
          <TextField label="Frequency of notifications in minutes" id={"posture-notification-title"} />
        </Stack>

        <PrimaryButton
          onClick={() => {
            store.addNotification({
              title: "Dropbox",
              message: "Fake notification",
              type: "default", // 'default', 'success', 'info', 'warning'
              container: "bottom-left", // where to position the notifications
              animationIn: ["animated", "fadeIn"], // animate.css classes that's applied
              animationOut: ["animated", "fadeOut"], // animate.css classes that's applied
              dismiss: {
                duration: 3000,
              },
            });
          }}
        >
          Simulate notification
        </PrimaryButton>
      </div>
    );
  }

  setNewRepeatingNotification() {
      setInterval()
  }
}
