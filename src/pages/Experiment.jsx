import { Plane, Text } from '@react-three/drei'
import { DefaultXRControllers, VRCanvas } from '@react-three/xr'
import ReactDOM from 'react-dom'
import Head from '../components/Head'
import { PositionLogger } from '../components/vr/PositionLogger'
import '../index.css'

const characterSet1 = ['A', 'K', 'M', 'N', 'V', 'W', 'X', 'Y', 'Z']
const characterSet2 = ['E', 'F', 'H', 'I', 'L', 'T']

function Wall({ color, numTargets = [6, 6], ...restProps }) {
	return (
		<Plane scale={[4, 4, 4]} {...restProps}>
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
							position={[x, y, 0.01]}
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
		</Plane>
	)
}

function RoomObject({ color, ...restProps }) {
	return (
		<Plane scale={10} {...restProps}>
			<meshPhongMaterial attach='material' color={color} />
		</Plane>
	)
}

function App() {
	return (
		<>
			<Head title='Quantifying Immersion Experiment' />
			<VRCanvas>
				<ambientLight />
				<pointLight position={[10, 10, 10]} />
				<DefaultXRControllers />
				<PositionLogger />
				{/* Window left */}
				<RoomObject
					args={[0.1, 0.125]}
					position={[-1.999, 2, -0.75]}
					rotation={[0, Math.PI / 2, 0]}
					color='#00A9F7'
				/>
				{/* Window right */}
				<RoomObject
					args={[0.1, 0.125]}
					position={[1.999, 2, -0.75]}
					rotation={[0, -Math.PI / 2, 0]}
					color='#00A9F7'
				/>
				{/* Door */}
				<RoomObject
					args={[0.125, 0.3]}
					position={[0.75, 1.5, -1.999]}
					rotation={[0, 0, 0]}
					color='#a5774d'
				/>
				{/* Top wall */}
				<Wall
					position={[0, 4, 0]}
					rotation={[Math.PI / 2, 0, 0]}
					color='#ececec'
				/>
				{/* Bottom wall */}
				<Wall
					position={[0, 0, 0]}
					rotation={[-Math.PI / 2, 0, 0]}
					color='#ececec'
				/>
				{/* Back wall */}
				<Wall position={[0, 2, -2]} rotation={[0, 0, 0]} color='#ececec' />
				{/* Right wall */}
				<Wall
					position={[2, 2, 0]}
					rotation={[0, -Math.PI / 2, 0]}
					color='#ececec'
				/>
				{/* Left wall */}
				<Wall
					position={[-2, 2, 0]}
					rotation={[0, Math.PI / 2, 0]}
					color='#ececec'
				/>
				{/* Front wall */}
				<Wall position={[0, 2, 2]} rotation={[0, Math.PI, 0]} color='#ececec' />
			</VRCanvas>
		</>
	)
}

ReactDOM.render(<App />, document.getElementById('root'))
