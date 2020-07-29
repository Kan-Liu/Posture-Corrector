import { store } from "react-notifications-component";

const ANTI_SLOUCHING_THRESHOLD = 0.1;
const TOO_CLOSE_TO_CAMERA_THRESHOLD = 0.1;
const FORWARD_LEANING_THRESHOLD = 0.1;
const TILTED_HEAD_THRESHOLD = 0.1;
const LONG_SCREEN_TIME_THRESHOLD = 0.1;

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
  var good_bad_threshold = (good_reference_score + bad_reference_score) / 2;

  console.log(
    good_reference_score,
    bad_reference_score,
    current_score,
    good_bad_threshold
  );

  if (current_score < good_bad_threshold) {
    trigger_notification(
      "Anti-slouching Warning",
      "Slouching detected. Please sit up straight!"
    );
  }
}

export function too_close_to_camera(good_reference, current) {
  // Larger score is worse
  var calculate_score = (keypoints) => {
    return keypoints.leftShoulder.x - keypoints.rightShoulder.x;
  };
  var good_reference_score = calculate_score(good_reference);
  var current_score = calculate_score(current);
  var good_bad_threshold =
    good_reference_score * (1 + TOO_CLOSE_TO_CAMERA_THRESHOLD);

  console.log(good_reference_score, current_score, good_bad_threshold);

  if (current_score > good_bad_threshold) {
    trigger_notification(
      "Too Close To Camera Warning",
      "Getting too close to camera detected. Please move back!"
    );
  }
}

export function forward_leaning(good_reference, bad_reference, current) {
  // Larger score is worse
  var calculate_score = (keypoints) => {
    return (
      (keypoints.leftEye - keypoints.rightEye) /
      (keypoints.leftShoulder.x - keypoints.rightShoulder.x)
    );
  };
  var good_reference_score = calculate_score(good_reference);
  var bad_reference_score = calculate_score(bad_reference);
  var current_score = calculate_score(current);
  var good_bad_threshold = (good_reference_score + bad_reference_score) / 2;

  console.log(
    good_reference_score,
    bad_reference_score,
    current_score,
    good_bad_threshold
  );

  if (current_score > good_bad_threshold) {
    trigger_notification(
      "Forward-leaning Warning",
      "Forward-leaning detected. Please lean back!"
    );
  }
}

export function tilted_head(good_reference, current) {
  // More unequal is worse
  var calculate_score = (keypoints) => {
    var right_score = current.rightShoulder.y - reference.rightEar.y;
    var left_score = current.leftShoulder.y - current.leftEar.y;
    return Math.abs(right_score - left_score);
  };

  var good_reference_score = calculate_score(good_reference);
  var current_score = calculate_score(current);
  var good_bad_threshold = good_reference_score * (1 + TILTED_HEAD_THRESHOLD);

  console.log(
    good_reference_score,
    bad_reference_score,
    current_score,
    good_bad_threshold
  );

  if (current_score > good_bad_threshold) {
    trigger_notification(
      "Tilted-head Warning",
      "Tilted-head detected. Please place your head straight!"
    );
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
