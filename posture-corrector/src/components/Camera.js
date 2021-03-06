import React from "react";
import Webcam from "react-webcam";
import "../App.css";
import Sketch from "react-p5";
import * as PoseDetection from "../backend/PoseDetection";
import { PrimaryButton, CompoundButton, Stack } from "office-ui-fabric-react";
import { Spinner, SpinnerSize } from 'office-ui-fabric-react';
import * as ControlLogic from "./ControlLogic";

const videoConstraints = {
  facingMode: "user",
};

export const Camera = (props) => {
  const {
    postureTime,
    goodReference,
    setGoodReference,
    badReference,
    setBadReference
  } = props;

  const webcamRef = React.useRef(null);
  const stackTokens = { childrenGap: 40 };
  const [webcamEnabled, setWebcamEnabled] = React.useState(false);
  const [lastButton, setLastButton] = React.useState(null);
  const [lastImage, setLastImage] = React.useState(null);
  const [isLoading, setIsLoading] = React.useState(false);
  const [imgTimeout, setImgTimeout] = React.useState(750);

  const capture = React.useCallback(async () => {
    console.log("Received user media!");
    if(!webcamRef || !webcamRef.current) {
      console.warn('called with null webcam ref');
      return;
    }
    const imageSrc = webcamRef.current.getScreenshot();
    setWebcamEnabled(false);
    setLastImage(imageSrc);
    if (!imageSrc) {
      console.log("Timed out, doubling timeout");
      setImgTimeout(imgTimeout * 2);
      setWebcamEnabled(false);
      return setTimeout(() => {
        setWebcamEnabled(true);
      }, 200);
    }

    const img = new Image();
    img.src = imageSrc;
    img.onload = () => {
      console.log("Loaded image!");
      setTimeout(async () => {
        var keypoints = await PoseDetection.returnPose(img);
        console.log(keypoints);
        if (lastButton === "capture") {
          ControlLogic.anti_slouching(goodReference, badReference, keypoints);
          ControlLogic.too_close_to_camera(goodReference, keypoints);
          ControlLogic.forward_leaning(goodReference, badReference, keypoints);
          ControlLogic.tilted_head(goodReference, keypoints);
        } else if (lastButton === "goodReference") {
          setGoodReference(keypoints);
        } else if (lastButton === "badReference") {
          setBadReference(keypoints);
        }
        setIsLoading(false);
      }, 50);
    };
  }, [webcamRef, goodReference, badReference, lastButton]);

  const onCaptureClick = function (type) {
    console.log(type);
    setIsLoading(true);
    setLastButton(type);
    setWebcamEnabled(true);
  };

  let postureIntervalId;

  React.useEffect(() => {
    if(goodReference && badReference && postureTime !== -1) {
      postureIntervalId = setInterval(() => {
        onCaptureClick("capture")
      }
      , postureTime * 1000 * 60);
    }

    return (
      () => clearInterval(postureIntervalId)
    );
  });

  return (
    <>
      <div className="camera-container">
        <Stack horizontal tokens={stackTokens}>
          <CompoundButton
            onClick={() => onCaptureClick("badReference")}
            secondaryText="Hunched shoulders, leaning forward"
          >
            1. Capture your undesired posture
          </CompoundButton>

          {badReference && (
            <CompoundButton
              primary
              onClick={() => onCaptureClick("goodReference")}
              secondaryText="Shoulders straight, arms relaxed"
            >
              2. Capture your desired posture
            </CompoundButton>
          )}
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
              setTimeout(capture, imgTimeout);
            }}
          />
        ) : (
          <img src={lastImage} className={isLoading ? "grayed-out" : ""} />
        )}
        {!webcamEnabled && isLoading && (<>
          <div style={{ paddingBottom: "3vh" }}></div>
          <Spinner size={SpinnerSize.large} label="Processing image..." />
        </>)}
      </div>

      <div style={{ paddingBottom: "3vh" }}></div>

      {(goodReference && badReference) && (
        <PrimaryButton
          text="Process Posture"
          onClick={() => onCaptureClick("capture")}
        />
      )}
    </>
  );
};
