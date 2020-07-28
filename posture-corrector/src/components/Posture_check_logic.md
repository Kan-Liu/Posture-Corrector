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
Left:x > Right:x
Shoulder:y > Nose:y > Eye:y
```

- Anti-slouching
  - Eye line/Nose getting closer to shoulder line:
    - (avg(y_RS, y_LS) - y_Nose)--
    - (avg(y_RS, y_LS) - avg(y_REye, y_LEye))--
- Getting too close to camera
  - Shoulder distance increases by a lot:
    - (x_LS - x_RS)+++
- Foward leaning:
  - Eye distance/shoulder distance ratio increases by a lot:
    - (x_LEye - x_REye)/(x_LS - x_RS)+++
- Tilted head:
  - Ear-shoulder distance unequal on left and right:
    - (y_RS - y_REar) != (y_LS - y_LEar)
- Spending too much time on computer (for customizable time):
  - On computer for too long:
    - no change for too long
