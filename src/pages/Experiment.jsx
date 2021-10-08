import { Plane, Sky, Text } from '@react-three/drei'
import { DefaultXRControllers, VRCanvas } from '@react-three/xr'
import React, { useEffect, useState } from 'react'
import { PositionLogger } from '../components/vr/PositionLogger'

function Floor(props) {
	return (
		<Plane rotation={[-Math.PI / 2, 0, 0]} scale={10} {...props}>
			<meshPhongMaterial attach='material' color='#666' />
		</Plane>
	)
}

function Wall({ color, numTargets = [10, 10], ...restProps }) {
	return (
		<Plane scale={10} {...restProps}>
			<meshPhongMaterial attach='material' color={color} />
			{Array.from(Array(numTargets[0]).keys()).flatMap(i =>
				Array.from(Array(numTargets[1]).keys()).map(j => {
					const letter = String.fromCharCode(
						Math.floor(Math.random() * 26) + 65
					)
					const x = (i / (numTargets[0] - 1)) * 0.8 - 0.4
					const y = (j / (numTargets[1] - 1)) * 0.8 - 0.4
					return (
						<Text
							key={`target-${i}-${j}`}
							position={[x, y, 0.01]}
							fontSize={0.05}
							color='#000'
							anchorX='center'
							anchorY='middle'
						>
							{letter}
						</Text>
					)
				})
			)}
		</Plane>
	)
}

const VR = React.memo(function VR({ onUpdate }) {
	return (
		<VRCanvas>
			<Sky sunPosition={[0, 1, 0]} />
			<ambientLight />
			<pointLight position={[10, 10, 10]} />
			<DefaultXRControllers />
			<PositionLogger onUpdate={onUpdate} />
			<Floor position={[0, -5, 0]} />
			<Wall position={[0, 0, -5]} color='#00aa00' />
			<Wall
				position={[5, 0, 0]}
				rotation={[0, -Math.PI / 2, 0]}
				color='#aaaa00'
			/>
			<Wall
				position={[-5, 0, 0]}
				rotation={[0, Math.PI / 2, 0]}
				color='#aa0000'
			/>
			<Wall
				position={[0, 0, 5]}
				rotation={[0, Math.PI, 0]}
				color='#0000aa'
				numTargets={[0, 0]}
			/>
		</VRCanvas>
	)
})

function Experiment() {
	const [headLog, setHeadLog] = useState({
		position: [],
		orientation: []
	})
	const [currentHead, setCurrentHead] = useState(null)
	const [isLogging, setIsLogging] = useState(false)

	// Every time currentHead changes, append it to the log.
	// It seems easier to set the state directly in the onUpdate callback instead,
	// of in a useEffect, but that caused problems with re-rendering the VR
	// component when isLogging was changed (because the onUpdate callback depends
	// on the value of isLogging).
	useEffect(() => {
		if (isLogging) {
			setHeadLog(prevLog => {
				if (currentHead) {
					return {
						position: [...prevLog.position, currentHead.position],
						orientation: [...prevLog.orientation, currentHead.orientation]
					}
				} else {
					return prevLog
				}
			})
		}
	}, [isLogging, currentHead])

	return (
		<>
			<div className='fixed bottom-4 right-4 z-10 flex gap-2 items-center'>
				<button
					className='flex justify-center bg-gray-800  hover:bg-gray-500 text-gray-100 p-3  rounded-full tracking-wide font-semibold  shadow-lg cursor-pointer transition ease-in duration-200'
					onClick={() => {
						setIsLogging(prev => !prev)
					}}
				>
					{isLogging ? 'Stop logging' : 'Start logging'}
				</button>
				<a
					className='flex justify-center bg-gray-800  hover:bg-gray-500 text-gray-100 p-3  rounded-full tracking-wide font-semibold  shadow-lg cursor-pointer transition ease-in duration-200'
					href={`data:application/json;charset=utf-8,${JSON.stringify(
						headLog
					)}`}
					download='log.json'
				>
					Download log
				</a>
			</div>
			{/* Because the identity of the setState function is stable, the VR
			component doesn't re-render when this one does. */}
			<VR onUpdate={setCurrentHead} />
		</>
	)
}

export default Experiment
