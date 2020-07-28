import * as React from 'react';
import { Label, ILabelStyles } from 'office-ui-fabric-react/lib/Label';
import { Pivot, PivotItem } from 'office-ui-fabric-react/lib/Pivot';
import { IStyleSet } from 'office-ui-fabric-react/lib/Styling';
import { Camera } from './Camera';

const labelStyles: Partial<IStyleSet<ILabelStyles>> = {
  root: { marginTop: 10 },
};

export const PivotBar: React.FunctionComponent = () => {
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
      <PivotItem headerText="Notifications">
        <Label styles={labelStyles}>Customize reminders</Label>
      </PivotItem>
    </Pivot>
  );
};
