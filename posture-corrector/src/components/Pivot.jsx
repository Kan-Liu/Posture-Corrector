import * as React from 'react';
import { Label } from 'office-ui-fabric-react/lib/Label';
import { Pivot, PivotItem } from 'office-ui-fabric-react/lib/Pivot';
import {Camera} from './Camera';
import { Notifications } from './Notifications';

const labelStyles = {
  root: { marginTop: 10 },
};

export const PivotBar = (props) => {
  const {
    setPostureEnabled,
    setStagnantEnabled,
    setPostureTime,
    setStagnantTime,
    postureEnabled,
    stagnantEnabled,
    postureTime,
    stagnantTime
  } = props;

  return (
    <Pivot aria-label="Menu Pivot">
      <PivotItem
        headerText="Posture Camera"
        headerButtonProps={{
          'data-order': 1,
          'data-title': 'Posture Camera Title',
        }}
      >
        <Camera/>
      </PivotItem>
      <PivotItem headerText="Notifications Preferences">
        <Label styles={labelStyles}>Choose which reminders you want to receive</Label>
        <Notifications 
          setPostureEnabled={setPostureEnabled}
          setStagnantEnabled={setStagnantEnabled}
          setPostureTime={setPostureTime}
          setStagnantTime={setStagnantTime}
          postureEnabled={postureEnabled}
          stagnantEnabled={stagnantEnabled}
          postureTime={postureTime}
          stagnantTime={stagnantTime}
        />
      </PivotItem>
    </Pivot>
  );
};
