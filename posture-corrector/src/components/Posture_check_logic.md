# Posture Corrector Code logic
```
Legends:
  - REye: right eye
  - LEye: left eye
  - REar: right ear
  - LEar: left ear
  - RS: right shoulder
  - LS: left shoulder
  - N: nose
  - x_: x coordinate
  - y_: y coordinate
 ```
- Anti-slouching
  - Eye line/Nose getting closer to shoulder line:
    - (y_Nose - avg(y_RS, y_LS))- -
    - (avg(y_REye, y_LEye) - avg(y_RS, y_LS))- -
- Getting too close to camera
  - Shoulder distance increases by a lot:
    - (x_RS - x_LS)+++
- Foward leaning:
  - Eye distance/shoulder distance ratio increases by a lot:
    - (x_REye - x_LEye)/(x_RS - x_LS)+++
- Tilted head:
  - Ear-shoulder distance unequal on left and right:
    - (y_REar - y_RS) != (y_LEar - y_LS)
- Spending too much time on computer (for customizable time):
    - On computer for too long:
        - no change for too long
    
