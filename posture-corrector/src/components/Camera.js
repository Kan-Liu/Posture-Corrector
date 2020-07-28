import React from "react";
import Webcam from "react-webcam";
import '../App.css';
import Sketch from "react-p5";
import * as PoseDetection from "../backend/PoseDetection";
 
const videoConstraints = {
    facingMode: "user"
  };


export const Camera = () => {
    const webcamRef = React.useRef(null);

    const capture = React.useCallback(
        async () => {
            // const imageSrc = webcamRef.current.getScreenshot();
            const cameraElement = document.getElementsByClassName("Camera")[0].firstChild;
            var keypoints = await PoseDetection.returnPose(cameraElement);
            console.log(keypoints);
            
            
            // console.log(webcamRef.current);
            // console.log(imageSrc);

           
        },
        [webcamRef]
    );

    return (
    <div className="Camera">
        <Webcam
            audio={false}
            ref={webcamRef}
            screenshotFormat="image/jpeg"
            width={360}
            height={360}
            videoConstraints={videoConstraints}
        />
        <button onClick={capture}>Capture photo</button>
    
    </div>
);
  };



// export default Camera;
