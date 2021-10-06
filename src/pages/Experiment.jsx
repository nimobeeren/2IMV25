import { Plane, Sky, Text } from '@react-three/drei'
import { DefaultXRControllers, VRCanvas } from '@react-three/xr'
import Head from '../components/Head'
import { PositionLogger } from '../components/vr/PositionLogger'
import '../index.css'

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

function Experiment() {
	return (
		<>
			<Head title='Quantifying Immersion Experiment' />
			<VRCanvas>
				<Sky sunPosition={[0, 1, 0]} />
				<ambientLight />
				<pointLight position={[10, 10, 10]} />
				<DefaultXRControllers />
				<PositionLogger />
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
		</>
	)
}

export default Experiment
