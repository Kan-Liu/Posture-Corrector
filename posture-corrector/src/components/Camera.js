import React from "react";
import Webcam from "react-webcam";
import '../App.css';
import Sketch from "react-p5";
import * as PoseDetection from "../backend/PoseDetection";
import { CompoundButton, Stack } from 'office-ui-fabric-react';
 
const videoConstraints = {
    facingMode: "user"
  };


export const Camera = () => {
    const webcamRef = React.useRef(null);
    const stackTokens = { childrenGap: 40 };

    const capture = React.useCallback(
        async () => {
            const cameraElement = document.getElementsByClassName("Camera")[0].firstChild;
            var keypoints = await PoseDetection.returnPose(cameraElement);
            console.log(keypoints);
        },
        [webcamRef]
    );

    return (
    <div className="camera-container">
        <Stack horizontal tokens={stackTokens}>
            <CompoundButton onClick={capture} secondaryText="The posture you wish to erase">
                Capture your normal pose 
            </CompoundButton>
            <CompoundButton primary onClick={capture} secondaryText="Shoulders straight, arms relaxed">
                Capture your desired pose
            </CompoundButton>
        </Stack>
            
        <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            width={360}
            height={360}
            videoConstraints={videoConstraints}
        />
    </div>
);
  };
