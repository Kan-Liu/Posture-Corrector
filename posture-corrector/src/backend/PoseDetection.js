const ml5 = require("ml5");

const model = ml5.poseNet("single", () => {
	console.log("Model successfully loaded.");
});


export async function returnPose(input) {

	var poses =  await model.singlePose(input);
	var keypoints = [];
	
	for (let i = 0; i < poses.length; i++) {
		// For each pose detected, loop through all the keypoints
		let pose = poses[i].pose;
        keypoints.push({
			"left_shoulder": {
				"x": pose.leftShoulder.x,
				"y": pose.leftShoulder.y
			},
			"right_shoulder": {
				"x": pose.rightShoulder.x,
				"y": pose.rightShoulder.y
			},
			"nose": {
				"x": pose.nose.x,
				"y": pose.nose.y
			}});
			
			}
		
		return keypoints;
		}
	




