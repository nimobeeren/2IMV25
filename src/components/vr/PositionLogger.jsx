import { useFrame, useThree } from '@react-three/fiber'
import { useXREvent } from '@react-three/xr'
import { useEffect, useState } from 'react'

export function PositionLogger({ logFile }) {
	const [headLog, setHeadLog] = useState({
		position: [],
		rotation: []
	})

	const { gl, camera } = useThree()

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

	// Log the head position/rotation on every frame
	useFrame(() => {
		if (!gl.xr.isPresenting) return

		// Append the current head position/rotation to the log
		const newHead = {
			position: [camera.position.x, camera.position.y, camera.position.z],
			rotation: [camera.rotation.x, camera.rotation.y, camera.rotation.z]
		}
		setHeadLog(prevLog => ({
			position: [...prevLog.position, newHead.position],
			rotation: [...prevLog.rotation, newHead.rotation]
		}))
	})

	return null
}
