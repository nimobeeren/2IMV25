import { Plane, Sky, Sphere, Text } from '@react-three/drei'
import { useThree } from '@react-three/fiber'
import { DefaultXRControllers, useXRFrame, VRCanvas } from '@react-three/xr'
import React, { useState } from 'react'
import * as THREE from 'three'
import { PositionLogger } from '../components/vr/PositionLogger'
import { getPosePositionOrientation } from '../utils'

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

const texture = new THREE.TextureLoader().load('hole.png')
texture.wrapS = THREE.RepeatWrapping
texture.wrapT = THREE.RepeatWrapping
texture.repeat.set(10, 5)

function Overlay() {
	const [position, setPosition] = useState([0, 0, 0])
	const [rotation, setRotation] = useState([0, 0, 0])
	const { gl } = useThree()

	useXRFrame(async (time, xrFrame) => {
		if (!gl.xr.isPresenting) return

		const referenceSpace = gl.xr.getReferenceSpace()
		const viewerPose = xrFrame.getViewerPose(referenceSpace)

		const { position: pos, orientation: ori } =
			getPosePositionOrientation(viewerPose)

		setPosition([pos.x, pos.y, pos.z])
		setRotation([ori.x, ori.y, ori.z])
	})

	return (
		// @ts-ignore
		<group position={position} rotation={rotation}>
			<Sphere scale={3} position={[0, 0, 0]}>
				<meshBasicMaterial
					transparent={true}
					// opacity={0.5}
					attach='material'
					color='black'
					alphaMap={texture}
					side={THREE.BackSide}
				/>
			</Sphere>
		</group>
	)
}

const VR = React.memo(function VR({ logFile }) {
	return (
		<VRCanvas>
			<Sky sunPosition={[0, 1, 0]} />
			<ambientLight />
			<pointLight position={[10, 10, 10]} />
			<DefaultXRControllers />
			<PositionLogger logFile={logFile} />
			<Overlay />
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
			<VR logFile={logFile} />
		</>
	)
}

export default Experiment
