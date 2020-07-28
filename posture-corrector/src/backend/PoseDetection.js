const ml5 = require("ml5");

const model = ml5.poseNet("single", () => {
  console.log("Model successfully loaded.");
});

export async function returnPose(input) {
  var poses = await model.singlePose(input);
  const pose = poses[0].pose;
  const keys = {
    leftShoulder: "left_shoulder",
    rightShoulder: "right_shoulder",
    nose: "nose",
    leftEar: "left_ear",
    rightEar: "right_ear",
    leftEye: "left_eye",
    rightEye: "right_eye"
  };
  var keypoints = {};
  for (var key in keys) {
    keypoints[keys[key]] = pose[key];
  }
  return keypoints;
}
