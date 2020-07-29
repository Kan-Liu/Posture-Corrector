import { store } from "react-notifications-component";

const ANTI_SLOUCHING_THRESHOLD = 10;
const TOO_CLOSE_TO_CAMERA_THRESHOLD = 10;
const FORWARD_LEANING_THRESHOLD = 10;
const TILTED_HEAD_THRESHOLD = 10;
const LONG_SCREEN_TIME_THRESHOLD = 10;

// Left:x > Right:x
// Shoulder:y > Nose:y

export function anti_slouching(good_reference, bad_reference, current) {
  // Smaller score is worse
  var calculate_score = (keypoints) => {
    return (
      (keypoints.rightShoulder.y + keypoints.leftShoulder.y) / 2 -
      keypoints.nose.y
    );
  };
  var good_reference_score = calculate_score(good_reference);
  var bad_reference_score = calculate_score(bad_reference);
  var current_score = calculate_score(current);
  var good_bad_midpoint = (good_reference_score + bad_reference_score) / 2;

  console.log(
    good_reference_score,
    bad_reference_score,
    current_score,
    good_bad_midpoint
  );

  if (current_score < good_bad_midpoint) {
    trigger_notification(
      "Anti-slouching Warning",
      "Slouching detected. Please sit up straight!"
    );
  }
}

function too_close_to_camera(reference, current) {
  var reference_score = reference.leftShoulder.x - reference.rightShoulder.x;
  var current_score = current.leftShoulder.x - current.rightShoulder.x;
  if (current_score - reference_score > TOO_CLOSE_TO_CAMERA_THRESHOLD) {
    return true;
  } else {
    return false;
  }
}

function forward_leaning(reference, current) {
  var reference_score =
    (reference.leftEye - reference.rightEye) /
    (reference.leftShoulder.x - reference.rightShoulder.x);
  var current_score =
    (current.leftEye - current.rightEye) /
    (current.leftShoulder.x - current.rightShoulder.x);
  if (current_score - reference_score > TOO_CLOSE_TO_CAMERA_THRESHOLD) {
    return true;
  } else {
    return false;
  }
}

function tilted_head(reference, current) {
  var right_score = current.rightShoulder.y - reference.rightEar.y;
  var left_score = current.leftShoulder.y - current.leftEar.y;
  if (Math.abs(right_score - left_score) > TILTED_HEAD_THRESHOLD) {
    return true;
  } else {
    return false;
  }
}

function long_screen_time(reference, current) {}

function trigger_notification(title, reason, type) {
  type = type || "warning";
  store.addNotification({
    title: title,
    message: reason,
    type: type, // 'default', 'success', 'info', 'warning'
    container: "bottom-left", // where to position the notifications
    animationIn: ["animated", "fadeIn"], // animate.css classes that's applied
    animationOut: ["animated", "fadeOut"], // animate.css classes that's applied
    dismiss: {
      duration: 7500,
    },
  });
}
