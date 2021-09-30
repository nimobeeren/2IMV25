import { useThree } from '@react-three/fiber'
import { useXRFrame } from '@react-three/xr'
import { Euler, Quaternion } from 'three'

export function PositionLogger({ onUpdate = undefined }) {
  const { gl } = useThree()

  useXRFrame(async (time, xrFrame) => {
    if (!gl.xr.isPresenting) return

    const referenceSpace = gl.xr.getReferenceSpace()
    const viewerPose = xrFrame.getViewerPose(referenceSpace)

    // https://developer.mozilla.org/en-US/docs/Web/API/XRView
    const leftEyeView = viewerPose.views[0]
    const rightEyeView = viewerPose.views[1]

    // Get the average position of the two eyes
    const avgEyePosition = DOMPointReadOnly.fromPoint({
      x: (leftEyeView.transform.position.x + rightEyeView.transform.position.x) / 2,
      y: (leftEyeView.transform.position.y + rightEyeView.transform.position.y) / 2,
      z: (leftEyeView.transform.position.z + rightEyeView.transform.position.z) / 2,
      w: (leftEyeView.transform.position.w + rightEyeView.transform.position.w) / 2
    })

    // console.log('position', {
    //   x: avgEyePosition.x.toFixed(2),
    //   y: avgEyePosition.y.toFixed(2),
    //   z: avgEyePosition.z.toFixed(2)
    // })

    // Get the Euler angles, which represent a rotation over the x, y and z axes
    const euler = new Euler().setFromQuaternion(
      new Quaternion(
        leftEyeView.transform.orientation.x,
        leftEyeView.transform.orientation.y,
        leftEyeView.transform.orientation.z,
        leftEyeView.transform.orientation.w
      )
    )

    // console.log('orientation', {
    //   x: euler.x.toFixed(2),
    //   y: euler.y.toFixed(2),
    //   z: euler.z.toFixed(2)
    // })

    if (onUpdate) {
      onUpdate({
        position: [avgEyePosition.x, avgEyePosition.y, avgEyePosition.z],
        orientation: [euler.x, euler.y, euler.z]
      })
    }
  })

  return null
}
