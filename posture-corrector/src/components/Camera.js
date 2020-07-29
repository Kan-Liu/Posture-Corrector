import React from "react";
import Webcam from "react-webcam";
import "../App.css";
import Sketch from "react-p5";
import * as PoseDetection from "../backend/PoseDetection";
import { PrimaryButton, CompoundButton, Stack } from "office-ui-fabric-react";
import * as ControlLogic from "./ControlLogic";

const videoConstraints = {
  facingMode: "user",
};

export const Camera = () => {
  const webcamRef = React.useRef(null);
  const stackTokens = { childrenGap: 40 };
  const [webcamEnabled, setWebcamEnabled] = React.useState(false);
  const [goodReference, setGoodReference] = React.useState(null);
  const [badReference, setBadReference] = React.useState(null);
  const [lastButton, setLastButton] = React.useState(null);
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
      if (lastButton === "capture") {
        ControlLogic.anti_slouching(goodReference, badReference, keypoints);
      } else if (lastButton === "goodReference") {
        setGoodReference(keypoints);
      } else if (lastButton === "badReference") {
        setBadReference(keypoints);
      }
    };
  }, [webcamRef, goodReference, badReference, lastButton]);

  const onCaptureClick = function (type) {
    console.log(type);
    setLastButton(type);
    setWebcamEnabled(true);
  };

  return (
    <>
      <div className="camera-container">
        <Stack horizontal tokens={stackTokens}>
          <CompoundButton
            onClick={() => onCaptureClick("badReference")}
            secondaryText="The posture you wish to erase"
          >
            Capture your normal pose
          </CompoundButton>
          <CompoundButton
            primary
            onClick={() => onCaptureClick("goodReference")}
            secondaryText="Shoulders straight, arms relaxed"
          >
            Capture your desired pose
          </CompoundButton>
        </Stack>

        <div style={{ paddingBottom: "3vh" }}></div>

        {webcamEnabled ? (
          <Webcam
            audio={false}
            screenshotFormat="image/jpeg"
            width={640}
            height={360}
            ref={webcamRef}
            videoConstraints={videoConstraints}
            onUserMedia={() => {
              setTimeout(capture, 2000);
            }}
          />
        ) : (
          <img src={lastImage} />
        )}
      </div>

      <div style={{ paddingBottom: "3vh" }}></div>

      <PrimaryButton
        text="Capture Photo"
        onClick={() => onCaptureClick("capture")}
      />
    </>
  );
};
