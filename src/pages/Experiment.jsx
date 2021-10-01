import { Plane, Text } from '@react-three/drei'
import { DefaultXRControllers, VRCanvas } from '@react-three/xr'
import ReactDOM from 'react-dom'
import Head from '../components/Head'
import { PositionLogger } from '../components/vr/PositionLogger'
import '../index.css'

const characterSet1 = ['A', 'K', 'M', 'N', 'V', 'W', 'X', 'Y', 'Z'];
const characterSet2 = ['E', 'F', 'H', 'I', 'L', 'T'];  
const developMode = true;
const numberOfTargets = 6;
const roomSize = 1;
const letterSize = roomSize / numberOfTargets;

function Door() {
  return (
    <Plane 
      args={[(letterSize * 2), roomSize / 2]}
			key={`door`}
			position={[letterSize, -roomSize / 4, 0.011]}
		>
      <meshPhongMaterial attach='material' color={'#ff0000'} />
		</Plane>
  )
}

function Window(side) {
  const direction = side === 'left' ? -1 : 1;
  return (
    <Plane 
      args={[letterSize, (letterSize * 2)]}
			key={`window`}
			position={[(letterSize * 1.5) * direction, -letterSize, 0.011]}
		>
      <meshPhongMaterial attach='material' color={'#ff0000'} /> 
		</Plane>
  )
}

function Wall({ color, numTargets = [numberOfTargets, numberOfTargets], side='regular', ...restProps }) {
	return (
		<Plane scale={10} {...restProps}>
			<meshPhongMaterial attach='material' color={color} />
			{Array.from(Array(numTargets[0]).keys()).flatMap(i =>
				Array.from(Array(numTargets[1]).keys()).map(j => {
					const letter = characterSet1[Math.floor(Math.random() * characterSet1.length)];
					const x = (i / (numTargets[0] - 1)) * 0.8 - 0.4;
					const y = (j / (numTargets[1] - 1)) * 0.8 - 0.4;
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
			)},
      {side === 'back' && Door()}
      {(side === 'right' || side === 'left') && Window(side)}
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
        {/* Top wall */}
				<Wall 
          position={developMode ? [0, 5, -5] : [0, 5, 0]} 
          rotation={[Math.PI / 2, 0, 0]} 
          color='#ececec'  
        />
        {/* Bottom wall */}
        <Wall 
          position={developMode ? [0, -5, -5] : [0, -5, 0]}  
          rotation={[-Math.PI / 2, 0, 0]} 
          color='#00ff00' 
        />
        {/* Back wall */}
				<Wall 
          position={developMode ? [0, 0, -10] : [0, 0, -5]}
          rotation={[0, 0, 0]}  
          color='#ececec'
          side='back' />
        {/* Right wall */}
				<Wall
          position={developMode ? [5, 0, -5] : [5, 0, 0]}
					rotation={[0, -Math.PI / 2, 0]}
					color='#ececec'
          side='right'
				/>
        {/* Left wall */}
				<Wall
          position={developMode ? [-5, 0, -5] : [-5, 0, 0]}
					rotation={[0, Math.PI / 2, 0]}
					color='#ececec'
          side='left'
				/>
        {/* Front wall */}
				<Wall
          position={developMode ? [0, 0, 5] : [0, 0, 5]}
					rotation={[0, Math.PI, 0]}
					color='#ececec'
				/>
			</VRCanvas>
		</>
	)
}

ReactDOM.render(<App />, document.getElementById('root'))
