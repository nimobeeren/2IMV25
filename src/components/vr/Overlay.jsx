import { animated, useSpring } from '@react-spring/three'
import { Sphere, useTexture } from '@react-three/drei'
import { useFrame, useThree } from '@react-three/fiber'
import React, { useState } from 'react'
import * as THREE from 'three'

const ASphere = animated(Sphere)

export function Overlay() {
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
