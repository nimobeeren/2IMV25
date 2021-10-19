import { useFrame, useThree } from '@react-three/fiber'
import { useEffect, useState } from 'react'
import { storePinata  } from '../../pinata'

async function writeLog (data, round) {
	try {
		console.info(`Writing log file for round ${round}`)
		await storePinata({
			content: data,
			name: `2IMV25 ${new Date().toISOString()} Round ${round}.json`
		})
		console.info(`Wrote log file for round ${round}`)
	} catch (err) {
		console.error(`Failed to write log file for round ${round}: ${err.toString()}`)
	}
}

export function PositionLogger({ round }) {
	const [headLog, setHeadLog] = useState([])
	const { gl, camera } = useThree()

	useEffect(async () => {
		// Only log when the round is not 0 and when pauses start.
		if (round.n === 0 || !round.paused) return

		// Do not log empty logs.
		if (headLog.length === 0) return

		const n = round.n

		// Get current round log by filtering and then removing the
		// round number to reduce the size.
		const roundLog = headLog
			.filter(([r]) => r === n)
			.map(([_, pos, rot]) => [pos, rot])
	
		// Write the log.
		await writeLog(roundLog, n)
		
		// Remove this round's log data from headLog.
		setHeadLog(prevLog => prevLog.filter(([r]) => r !== n))
	}, [round.n, round.paused])

	// Log the head position/rotation on every frame
	useFrame(() => {
		if (!gl.xr.isPresenting || round.paused || round.n === 0) return

		// Append the current head position/rotation to the log
		const newHead = [
			round.n,
			[camera.position.x, camera.position.y, camera.position.z],
			[camera.rotation.x, camera.rotation.y, camera.rotation.z]
		]

		setHeadLog(prevLog => [...prevLog, newHead])
	})

	return null
}
