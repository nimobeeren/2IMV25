import { DefaultXRControllers, useXREvent, VRCanvas } from '@react-three/xr'
import React, { useState } from 'react'

import { PositionLogger } from '../components/vr/PositionLogger'
import { Floor } from '../components/vr/Floor'
import { Ceiling } from '../components/vr/Ceiling'
import { Wall } from '../components/vr/Wall'
import { Overlay } from '../components/vr/Overlay'
import { EXPERIMENT_ROUNDS } from '../constants'
import { useThree } from '@react-three/fiber'

const VR = React.memo(function VR({ logFile }) {
	const { gl } = useThree()

	const [round, setRound] = useState({
		...EXPERIMENT_ROUNDS[0],
		n: 0,
		paused: false
	})

	useXREvent('squeeze', () => {
		if (round.paused) {
			const n = round.n + 1

			// Exit the session after the last round.
			if (n >= EXPERIMENT_ROUNDS.length) {
				gl.xr.getSession().end()
				return
			}

			setRound({
				n,
				paused: false,
				...EXPERIMENT_ROUNDS[n],
			})
		} else {
			setRound({
				...round,
				displayLetters: false,
				paused: true,
			})
		}
	})

	return (
		<>
			<DefaultXRControllers />
			<PositionLogger logFile={logFile} />

			<pointLight position={[1, 3, 0]} intensity={0.8}/>
			<pointLight position={[-1, 3, 0]} intensity={0.8}/>

			{ round.overlay && <Overlay /> }

			{/* Top wall */}
			<Ceiling
				position={[0, 4, 0]}
				rotation={[Math.PI / 2, 0, 0]}
				color='#ececec'
				round={round}
			/>
			{/* Bottom wall */}
			<Floor
				position={[0, 0, 0]}
				rotation={[-Math.PI / 2, 0, 0]}
				color='#ececec'
				round={round}
			/>
			{/* Back wall */}
			<Wall
				position={[0, 2, -2]}
				rotation={[0, 0, 0]}
				color='#ececec'
				side='back'
				round={round}
			/>
			{/* Right wall */}
			<Wall
				position={[2, 2, 0]}
				rotation={[0, -Math.PI / 2, 0]}
				color='#ececec'
				side='right'
				round={round}
			/>
			{/* Left wall */}
			<Wall
				position={[-2, 2, 0]}
				rotation={[0, Math.PI / 2, 0]}
				color='#ececec'
				side='left'
				round={round}
			/>
			{/* Front wall */}
			<Wall
				position={[0, 2, 2]}
				rotation={[0, Math.PI, 0]}
				color='#ececec'
				side='front'
				round={round} />
		</>
	)
})

function Experiment() {
	const [logFile, setLogFile] = useState(null)

	return (
		<>
			<div className='fixed bottom-4 right-4 z-10 flex gap-2 items-center'>
				<button
					className='flex justify-center bg-gray-800  hover:bg-gray-500 text-gray-100 p-3  rounded-full tracking-wide font-semibold  shadow-lg cursor-pointer transition ease-in duration-200'
					onClick={async () => {
						try {
							const fileHandle = await showSaveFilePicker({
								suggestedName: 'log.json',
								startIn: 'desktop',
								types: [
									{
										description: 'JSON log file',
										accept: {
											'application/json': ['.json']
										}
									}
								]
							})
							setLogFile(fileHandle)
							console.info('Set log location')
						} catch (err) {
							console.error(
								'Failed to set log location with error\n' + err.toString()
							)
						}
					}}
				>
					Set log location
				</button>
			</div>
			<VRCanvas>
				<VR logFile={logFile} />
			</VRCanvas>
		</>
	)
}

export default Experiment
