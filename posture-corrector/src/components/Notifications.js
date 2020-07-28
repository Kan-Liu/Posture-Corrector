import React from "react";
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import { store } from "react-notifications-component";
import { DefaultButton, PrimaryButton, Stack } from 'office-ui-fabric-react';
import { Dropdown, DropdownMenuItemType } from 'office-ui-fabric-react/lib/Dropdown';
import { TextField } from 'office-ui-fabric-react/lib/TextField';
import { Toggle } from 'office-ui-fabric-react/lib/Toggle';
import { Label } from 'office-ui-fabric-react/lib/Label';

const dropdownStyles = {
  dropdown: { width: 300 },
};

const options = [
  { key: 'minutesHeader', text: 'Minutes', itemType: DropdownMenuItemType.Header },
  { key: 'oneMin', text: '1 minute' },
  { key: 'twoMins', text: '2 minutes' },
  { key: 'threeMins', text: '3 minutes'},
  { key: 'fiveMins', text: '5 minutes' },
  { key: 'fiveMins', text: '10 minutes' },
  { key: 'fiveMins', text: '15 minutes' },
  { key: 'fiveMins', text: '25 minutes' },
  { key: 'fiveMins', text: '30 minutes' },
  { key: 'fiveMins', text: '40 minutes' },
  { key: 'divider_1', text: '-', itemType: DropdownMenuItemType.Divider },
  { key: 'hoursHeader', text: 'Hours', itemType: DropdownMenuItemType.Header },
  { key: 'oneHour', text: '1 hour' },
  { key: 'twoHours', text: '2 hours' },
  { key: 'threeHours', text: '3 hours' },
];

const stackTokens = { childrenGap: 30 };

export class Notifications extends React.Component {
  render() {
    return (
      <div className="notifications-container">
        <DefaultButton>
          Add a custom notification
        </DefaultButton>

        <Stack horizontal tokens={stackTokens} verticalAlign="start" className="notifications">
          <Toggle label="Receive notifications" onText="Yes" offText="No" />
          <TextField label="Notification Title" id={"notification-title"} />
          <Dropdown
            label="Repeat Time"
            options={options}
          />
        </Stack>

        <PrimaryButton
          onClick={() => {
            store.addNotification({
              title: "Dropbox",
              message: "Files were synced",
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
          Add notification
        </PrimaryButton>
      </div>
    );
  }

  setNewRepeatingNotification() {
      setInterval()
  }
}
