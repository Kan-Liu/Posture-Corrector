import React from "react";
import Webcam from "react-webcam";
import '../App.css';
 
const videoConstraints = {
    facingMode: "user"
  };
   
export const Camera = () => {
    const webcamRef = React.useRef(null);

    const capture = React.useCallback(
        () => {
        const imageSrc = webcamRef.current.getScreenshot();
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