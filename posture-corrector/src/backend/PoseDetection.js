const ml5 = require("ml5");


const model = ml5.poseNet("single", () => {
	console.log("Model successfully loaded.");
});


export async function returnPose(input) {

	var poses =  await model.singlePose(input);
	
	
	for (let i = 0; i < poses.length; i++) {
		// For each pose detected, loop through all the keypoints
		let pose = poses[i].pose;
        var keypoints = {
			left_shoulder: {
				x: pose.leftShoulder.x,
				y: pose.leftShoulder.y
			},
			right_shoulder: {
				x: pose.rightShoulder.x,
				y: pose.rightShoulder.y
			},
			nose: {
				x: pose.nose.x,
				y: pose.nose.y
			},
			left_ear: {
				x: pose.leftEar.x,
				y: pose.leftEar.y
			},
			right_ear: {
				x: pose.rightEar.x,
				y: pose.rightEar.y
			},
			left_eye: {
				x: pose.leftEye.x,
				y: pose.leftEye.y,
			},
			right_eye: {
				x: pose.rightEye.x,
				y: pose.rightEye.y,
			},
			}
		};
			
		return keypoints;
		}
	




