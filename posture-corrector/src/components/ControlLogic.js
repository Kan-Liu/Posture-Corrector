const ANTI_SLOUCHING_THRESHOLD = 10;
const TOO_CLOSE_TO_CAMERA_THRESHOLD = 10;
const FORWARD_LEANING_THRESHOLD = 10;
const TILTED_HEAD_THRESHOLD = 10;
const LONG_SCREEN_TIME_THRESHOLD = 10;

// Left:x > Right:x
// Shoulder:y > Nose:y

function anti_slouching(reference, current) {
  var reference_score =
    (reference.rightShoulder.y + reference.leftShoulder.y) / 2 -
    reference.nose.y;
  var current_score =
    (current.rightShoulder.y + current.leftShoulder.y) / 2 - current.nose.y;
  if (reference_score - current_score > ANTI_SLOUCHING_THRESHOLD) {
    return true;
  } else {
    return false;
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

function tilted_head(current) {
  var right_score = current.rightShoulder.y - reference.rightEar.y;
  var left_score = current.leftShoulder.y - current.leftEar.y;
  if (Math.abs(right_score - left_score) > TILTED_HEAD_THRESHOLD) {
    return true;
  } else {
    return false;
  }
}

function long_screen_time(reference, current) {}
