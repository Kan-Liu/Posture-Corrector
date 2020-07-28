import React from "react";
import ReactNotification from "react-notifications-component";
import "react-notifications-component/dist/theme.css";
import { store } from "react-notifications-component";

export class Notifications extends React.Component {
  render() {
    return (
      <>
        <button>
          Add a custom notification
        </button>
        <div id="new-notification">
          <label htmlFor="notification-title">Notification Title: </label>
          <input
            type="text"
            id="notification-title"
            name="notification-title"
          ></input>
          <label htmlFor="repeat-time">Repeat Time: </label>
          <select id="repeat-time" name="repeat-time">
              <option value="30mins">Every half hour</option>
              <option value="hourly">Every hour</option>
              <option value="2hourly">Every 2 hours</option>
              <option value="3hourly">Every 3 hours</option>
              <option value="daily">Once a day</option>
          </select>
          <br/>
        </div>
        <div>
        <button
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
        </button>
        </div>
      </>
    );
  }

  setNewRepeatingNotification() {
      setInterval()
  }
}
