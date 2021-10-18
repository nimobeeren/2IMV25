import { animated, useSpring } from '@react-spring/three'
import { Plane, Sphere, Text, useTexture } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import { DefaultXRControllers, useXREvent, VRCanvas } from '@react-three/xr'
import React, { useState } from 'react'
import * as THREE from 'three'
import { PositionLogger } from '../components/vr/PositionLogger'

import { EXPERIMENT_ROUNDS } from '../constants'

const characterSet1 = ['A', 'K', 'M', 'N', 'V', 'W', 'X', 'Y', 'Z']
const characterSet2 = ['E', 'F', 'H', 'I', 'L', 'T']
const numberOfTargets = 6
const roomSize = 1
const letterSize = roomSize / numberOfTargets
const hasOverlay = true

const radiusInnerFloor = 0.25
const radiusOuterFloor = 0.4
const radiusInnerCeiling = 0.25
const radiusOuterCeiling = 0.4
const outerPositionsFloor = [3, 8, 9, 14, 19, 20]
const outerPositionsCeiling = [1, 2, 3, 7, 8, 12, 13, 17, 18]

/**
 * Returns the door on the back wall.
 */
function Door({ round }) {
	const [doorColor, setDoorColor] = useState('#8B4513')

	useXREvent('squeeze', (e) => {
		setDoorColor('#000000')
	})

	return (
		<Plane
			args={[letterSize * 1.75, roomSize / 2]}
			key={`door`}
			position={[letterSize, -roomSize / 4, 0.011]}
		>
			<Text
				key={`round-name`}
				position={[0, 0.1, 0.0001]}
				fontSize={0.05}
				color='#000000'
				anchorX='center'
				anchorY='middle'
			>Round: {round.round}</Text>
			{ round.paused &&
				<Text
					key={`round-paused`}
					position={[0, 0, 0.0001]}
					fontSize={0.05}
					color='#000000'
					anchorX='center'
					anchorY='middle'
				>Paused</Text>
			}
			<meshPhongMaterial attach='material' color='#8B4513' />
		</Plane>
	)
}

/**
 * Returns the window on one of the walls.
 *
 * @param {string} side The side of the room where the window should be rendered.
 */
function Window(side) {
	const direction = side === 'left' ? -1 : 1
	return (
		<Plane
			args={[letterSize, letterSize * 2]}
			key={`window-${side}`}
			position={[letterSize * 1.5 * direction, -letterSize, 0.011]}
		>
			<meshPhongMaterial attach='material' color={'#87CEEB'} />
		</Plane>
	)
}

/**
 * Returns a wall of the Pausch room.
 */
function Wall({
	color,
	numTargets = [numberOfTargets, numberOfTargets],
	side = 'regular',
	round,
	...restProps
}) {
	return (
		<Plane scale={4} {...restProps}>
			<meshPhongMaterial attach='material' color={color} />
			{Array.from(Array(numTargets[0]).keys()).flatMap(i =>
				Array.from(Array(numTargets[1]).keys()).map(j => {
					const letter =
						characterSet1[Math.floor(Math.random() * characterSet1.length)]
					const x = (i / (numTargets[0] - 1)) * 0.8 - 0.4
					const y = (j / (numTargets[1] - 1)) * 0.8 - 0.4
					return (
						<Text
							key={`target-${i}-${j}`}
							position={[x, y, 0.0001]}
							fontSize={0.15}
							color='#000000'
							anchorX='center'
							anchorY='middle'
						>
							{letter}
						</Text>
					)
				})
			)}
			{side === 'back' && Door({ round })}
			{(side === 'right' || side === 'left') && Window(side)}
		</Plane>
	)
}

/**
 * Returns the floor of the Pausch room.
 */
function Floor({
	color,
	numTargets = [11, 22],
	side = 'regular',
	...restProps
}) {
	return (
		<Plane scale={4} {...restProps}>
			<meshPhongMaterial attach='material' color={color} />
			{Array.from(Array(numTargets[0]).keys()).map(i => {
				const letter =
					characterSet1[Math.floor(Math.random() * characterSet1.length)]
				const a = (2 * Math.PI) / numTargets[0]
				const x = radiusInnerFloor * Math.cos(i * a)
				const y = radiusInnerFloor * Math.sin(i * a)
				const rotationFloor = i * ((2 * Math.PI) / numTargets[0]) - Math.PI / 2
				return (
					<Text
						key={`target-${i}`}
						position={[x, y, 0.0001]}
						fontSize={0.15}
						color='#000000'
						anchorX='center'
						anchorY='middle'
						rotation={[0, 0, rotationFloor]}
					>
						{letter}
					</Text>
				)
			})}
			{Array.from(Array(numTargets[1]).keys()).map(i => {
				const letter =
					characterSet1[Math.floor(Math.random() * characterSet1.length)]
				const a = (2 * Math.PI) / numTargets[1]
				const x = radiusOuterFloor * Math.cos(i * a)
				const y = radiusOuterFloor * Math.sin(i * a)
				const rotationFloor = i * ((2 * Math.PI) / numTargets[1]) - Math.PI / 2

				if (outerPositionsFloor.includes(i)) {
					return (
						<Text
							key={`target-${i}`}
							position={[x, y, 0.0001]}
							fontSize={0.15}
							color='#000000'
							anchorX='center'
							anchorY='middle'
							rotation={[0, 0, rotationFloor]}
						>
							{letter}
						</Text>
					)
				}
			})}
		</Plane>
	)
}

/**
 * Returns the ceiling of the Pausch room.
 */
function Ceiling({
	color,
	numTargets = [12, 20],
	side = 'regular',
	...restProps
}) {
	return (
		<Plane scale={4} {...restProps}>
			<meshPhongMaterial attach='material' color={color} />
			{Array.from(Array(numTargets[0]).keys()).map(i => {
				const letter =
					characterSet1[Math.floor(Math.random() * characterSet1.length)]
				const a = (2 * Math.PI) / numTargets[0]
				const x = radiusInnerCeiling * Math.cos(i * a)
				const y = radiusInnerCeiling * Math.sin(i * a)
				const rotationCeiling =
					i * ((2 * Math.PI) / numTargets[0]) + Math.PI / 2
				return (
					<Text
						key={`target-${i}`}
						position={[x, y, 0.0001]}
						fontSize={0.15}
						color='#000000'
						anchorX='center'
						anchorY='middle'
						rotation={[0, 0, rotationCeiling]}
					>
						{letter}
					</Text>
				)
			})}
			{Array.from(Array(numTargets[1]).keys()).map(i => {
				const letter =
					characterSet1[Math.floor(Math.random() * characterSet1.length)]
				const a = (2 * Math.PI) / numTargets[1]
				const x = radiusOuterCeiling * Math.cos(i * a)
				const y = radiusOuterCeiling * Math.sin(i * a)
				const rotationCeiling =
					i * ((2 * Math.PI) / numTargets[1]) + Math.PI / 2

				if (outerPositionsCeiling.includes(i)) {
					return (
						<Text
							key={`target-${i}`}
							position={[x, y, 0.0001]}
							fontSize={0.15}
							color='#000000'
							anchorX='center'
							anchorY='middle'
							rotation={[0, 0, rotationCeiling]}
						>
							{letter}
						</Text>
					)
				}
			})}
		</Plane>
	)
}

const ASphere = animated(Sphere)

function Overlay() {
	const [position, setPosition] = useState([0, 0, 0])
	const [rotation, setRotation] = useState([0, 0, 0])
	const { rotation: interpRotation } = useSpring({
		to: { rotation },
		config: { duration: 50 }
	})

	const { camera } = useThree()

	const texture = useTexture('hole4.png')
	texture.repeat.set(10, 5)
	texture.offset.set(-7, -2)

	useFrame(() => {
		setPosition([camera.position.x, camera.position.y, camera.position.z])
		setRotation([camera.rotation.x, camera.rotation.y, camera.rotation.z])
	})

	return (
		<ASphere position={position} rotation={interpRotation}>
			<meshBasicMaterial
				transparent
				attach='material'
				color='black'
				alphaMap={texture}
				side={THREE.BackSide}
			/>
		</ASphere>
	)
}

const VR = React.memo(function VR({ logFile }) {
	const [round, setRound] = useState({
		round: 0,
		paused: false
	})

	useXREvent('squeeze', (e) => {
		if (round.paused) {
			const newRound = (round.round + 1) % EXPERIMENT_ROUNDS.length
			setRound({
				round: newRound,
				paused: false
			})
		} else {
			setRound({
				round: round.round,
				paused: true
			})
		}
	})

	return (
		<>
			<DefaultXRControllers />
			<PositionLogger logFile={logFile} />

			<pointLight position={[1, 3, 0]} intensity={0.8}/>
			<pointLight position={[-1, 3, 0]} intensity={0.8}/>

			{ hasOverlay && <Overlay /> }

			{/* Top wall */}
			<Ceiling
				position={[0, 4, 0]}
				rotation={[Math.PI / 2, 0, 0]}
				color='#ececec'
			/>
			{/* Bottom wall */}
			<Floor
				position={[0, 0, 0]}
				rotation={[-Math.PI / 2, 0, 0]}
				color='#ececec'
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
			/>
			{/* Left wall */}
			<Wall
				position={[-2, 2, 0]}
				rotation={[0, Math.PI / 2, 0]}
				color='#ececec'
				side='left'
			/>
			{/* Front wall */}
			<Wall position={[0, 2, 2]} rotation={[0, Math.PI, 0]} color='#ececec' />
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
