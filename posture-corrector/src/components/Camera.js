import React from "react";
import Webcam from "react-webcam";
import '../App.css';
import Sketch from "react-p5";
import * as PoseDetection from "../backend/PoseDetection";
import { PrimaryButton, CompoundButton, Stack } from 'office-ui-fabric-react';
 
const videoConstraints = {
  facingMode: "user"
};

export const Camera = () => {
  const webcamRef = React.useRef(null);
  const stackTokens = { childrenGap: 40 };
  const [webcamEnabled, setWebcamEnabled] = React.useState(false);
  const [lastImage, setLastImage] = React.useState(null);

  const capture = React.useCallback(async () => {
    console.log("Received user media!");
    const imageSrc = webcamRef.current.getScreenshot();
    setWebcamEnabled(false);
    setLastImage(imageSrc);

    const img = new Image();
    img.src = imageSrc;
    img.onload = async () => {
      console.log("Loaded image!");
      var keypoints = await PoseDetection.returnPose(img);
      console.log(keypoints);
    };
  }, [webcamRef]);

  const onCaptureClick = () => {
    setWebcamEnabled(true);
  };

  return (<>
    <div className="camera-container">
      <Stack horizontal tokens={stackTokens}>
          <CompoundButton onClick={onCaptureClick} secondaryText="The posture you wish to erase">
              Capture your normal pose 
          </CompoundButton>
          <CompoundButton primary onClick={onCaptureClick} secondaryText="Shoulders straight, arms relaxed">
              Capture your desired pose
          </CompoundButton>
      </Stack>

      <div style={{paddingBottom: "3vh"}}></div>

      {webcamEnabled ? (<Webcam
        audio={false}
        screenshotFormat="image/jpeg"
        width={640}
        height={360}
        ref={webcamRef}
        videoConstraints={videoConstraints}
        onUserMedia={() => {
          setTimeout(capture, 200); }}
      />) : (<img src={lastImage} />)}
    </div>

    <div style={{paddingBottom: "3vh"}}></div>

    <PrimaryButton 
      text="Capture Photo"
      onClick={onCaptureClick}
    />
  </>);
};
