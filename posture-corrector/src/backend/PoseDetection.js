const ml5 = require("ml5");

const model = ml5.poseNet("single", () => {
	console.log("Model successfully loaded.");
});

export async function estimatePose(input) {
	return await model.singlePose(input);
}
