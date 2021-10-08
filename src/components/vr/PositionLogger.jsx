import { useThree } from '@react-three/fiber'
import { useXRFrame } from '@react-three/xr'
import { Euler, Quaternion } from 'three'

export function PositionLogger({ onUpdate }) {
	const { gl } = useThree()

	// NOTE: I sometimes ran into an error when exiting VR presenting mode, but
	// couldn't reproduce it. It seemed to be caused by this line:
	// https://github.com/pmndrs/react-xr/blob/4e914c17f2a425429bc02f53ac50c607a6d1fdc0/src/XR.tsx#L264
	// and could be fixed by changing the ! to a ?
	useXRFrame(async (time, xrFrame) => {
		if (!gl.xr.isPresenting) return

		const referenceSpace = gl.xr.getReferenceSpace()
		const viewerPose = xrFrame.getViewerPose(referenceSpace)

		// https://developer.mozilla.org/en-US/docs/Web/API/XRView
		const leftEye = viewerPose.views[0].transform
		const rightEye = viewerPose.views[1].transform

		// Get the average position of the two eyes
		const avgEyePosition = DOMPointReadOnly.fromPoint({
			x: (leftEye.position.x + rightEye.position.x) / 2,
			y: (leftEye.position.y + rightEye.position.y) / 2,
			z: (leftEye.position.z + rightEye.position.z) / 2,
			w: (leftEye.position.w + rightEye.position.w) / 2
		})

		// Get the Euler angles, which represent a rotation over the x, y and z axes
		const euler = new Euler().setFromQuaternion(
			new Quaternion(
				leftEye.orientation.x,
				leftEye.orientation.y,
				leftEye.orientation.z,
				leftEye.orientation.w
			)
		)

		if (onUpdate) {
			onUpdate({
				position: [avgEyePosition.x, avgEyePosition.y, avgEyePosition.z],
				orientation: [euler.x, euler.y, euler.z]
			})
		}
	})

	return null
}
