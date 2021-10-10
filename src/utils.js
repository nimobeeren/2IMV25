import { Euler, Quaternion } from 'three'

export function getPosePositionOrientation(pose) {
  // https://developer.mozilla.org/en-US/docs/Web/API/XRView
  const leftEyeView = pose.views[0]
  const rightEyeView = pose.views[1]

  // Get the average position of the two eyes
  const avgEyePosition = DOMPointReadOnly.fromPoint({
    x: (leftEyeView.transform.position.x + rightEyeView.transform.position.x) / 2,
    y: (leftEyeView.transform.position.y + rightEyeView.transform.position.y) / 2,
    z: (leftEyeView.transform.position.z + rightEyeView.transform.position.z) / 2,
    w: (leftEyeView.transform.position.w + rightEyeView.transform.position.w) / 2
  })

  const position = {
    x: avgEyePosition.x,
    y: avgEyePosition.y,
    z: avgEyePosition.z
  }

  // Get the Euler angles, which represent a rotation over the x, y and z axes
  const euler = new Euler().setFromQuaternion(
    new Quaternion(
      leftEyeView.transform.orientation.x,
      leftEyeView.transform.orientation.y,
      leftEyeView.transform.orientation.z,
      leftEyeView.transform.orientation.w
    )
  )

  const orientation = {
    x: euler.x,
    y: euler.y,
    z: euler.z
  }

  return { position, orientation }
}
