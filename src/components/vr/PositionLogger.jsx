import { useThree } from '@react-three/fiber'
import { useEffect, useState } from 'react'
import { Euler, Quaternion } from 'three'
import { useXRFrame } from '../../hooks/useXRFrame'

export function PositionLogger({ logFile }) {
	const [headLog, setHeadLog] = useState({
		position: [],
		orientation: []
	})

	const { gl } = useThree()

	// When leaving presenting mode, and if a log file exists,
	// write the log to the file
	useEffect(() => {
		if (logFile && !gl.xr.isPresenting && headLog.position.length > 0) {
			const writeLog = async () => {
				try {
					const stream = await logFile.createWritable()
					stream.write(JSON.stringify(headLog))
					stream.close()
					console.info('Wrote log to file')
				} catch (err) {
					console.error(
						'Failed to write log to file with error:\n' + err.toString()
					)
				}
			}
			writeLog()
		}
	}, [logFile, gl.xr.isPresenting, headLog])

	// Warn when starting presenting mode without a log file
	useEffect(() => {
		if (!logFile && gl.xr.isPresenting) {
			console.warn('Starting presenting mode without a log file!')
		}
	}, [logFile, gl.xr.isPresenting])

	// Log the head position/orientation on every frame
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

		// Convert orientation from quaternion to Euler angles, which represent a
		// rotation over the x, y and z axes
		const euler = new Euler().setFromQuaternion(
			new Quaternion(
				leftEye.orientation.x,
				leftEye.orientation.y,
				leftEye.orientation.z,
				leftEye.orientation.w
			)
		)

		// Append the current head position/orientation to the log
		const newHead = {
			position: [avgEyePosition.x, avgEyePosition.y, avgEyePosition.z],
			orientation: [euler.x, euler.y, euler.z]
		}
		setHeadLog(prevLog => ({
			position: [...prevLog.position, newHead.position],
			orientation: [...prevLog.orientation, newHead.orientation]
		}))
	})

	return null
}
