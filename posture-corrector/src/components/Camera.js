import React from "react";
import Webcam from "react-webcam";
import '../App.css';
import Sketch from "react-p5";
import * as PoseDetection from "../backend/PoseDetection";
 
const videoConstraints = {
    facingMode: "user"
  };

export const Draw = () => {
let x = 50;
const y = 50;

const setup = (p5, canvasParentRef) => {
    // use parent to render the canvas in this ref
    // (without that p5 will render the canvas outside of your component)
    p5.createCanvas(100, 100).parent(canvasParentRef);
};

const draw = (p5) => {
    p5.background(0);
    p5.ellipse(x, y, 70, 70);
    // NOTE: Do not use setState in the draw function or in functions that are executed
    // in the draw function...
    // please use normal variables or class properties for these purposes
    x++;
};
    return <Sketch setup={setup} draw={draw} />;
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
