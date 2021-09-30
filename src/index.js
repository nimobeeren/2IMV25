import { Plane, Sky, Text } from '@react-three/drei'
import { DefaultXRControllers, VRCanvas } from '@react-three/xr'
import { useState } from 'react'
import ReactDOM from 'react-dom'
import { PositionLogger } from './components/PositionLogger'
import './styles.css'

function Floor(props) {
  return (
    <Plane rotation={[-Math.PI / 2, 0, 0]} scale={10} {...props}>
      <meshPhongMaterial attach="material" color="#666" />
    </Plane>
  )
}

function Wall({ color, numTargets = [10, 10], ...restProps }) {
  return (
    <Plane scale={10} {...restProps}>
      <meshPhongMaterial attach="material" color={color} />
      {Array.from(Array(numTargets[0]).keys()).flatMap((i) =>
        Array.from(Array(numTargets[1]).keys()).map((j) => {
          const letter = String.fromCharCode(Math.floor(Math.random() * 26) + 65)
          const x = (i / (numTargets[0] - 1)) * 0.8 - 0.4
          const y = (j / (numTargets[1] - 1)) * 0.8 - 0.4
          return (
            <Text
              key={`target-${i}-${j}`}
              position={[x, y, 0.01]}
              fontSize={0.05}
              color="#000"
              anchorX="center"
              anchorY="middle"
            >
              {letter}
            </Text>
          )
        })
      )}
    </Plane>
  )
}

function VR({ onUpdate = undefined }) {
  console.log('VR re-render')
  return (
    <VRCanvas>
      <Sky sunPosition={[0, 1, 0]} />
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <DefaultXRControllers />
      <PositionLogger onUpdate={onUpdate} />
      <Floor position={[0, -5, 0]} />
      <Wall position={[0, 0, -5]} color="#00aa00" />
      <Wall position={[5, 0, 0]} rotation={[0, -Math.PI / 2, 0]} color="#aaaa00" />
      <Wall position={[-5, 0, 0]} rotation={[0, Math.PI / 2, 0]} color="#aa0000" />
      <Wall position={[0, 0, 5]} rotation={[0, Math.PI, 0]} color="#0000aa" numTargets={[0, 0]} />
    </VRCanvas>
  )
}

function App() {
  const [log, setLog] = useState({
    position: [],
    orientation: []
  })

  return (
    <>
      <div>
        <a href={`data:application/json;charset=utf-8,${JSON.stringify(log)}`} download="log.json">
          Download log
        </a>
      </div>
      <VR
        onUpdate={({ position, orientation }) => {
          // only log the first 1000 frames as a test
          if (log.position.length < 1000) {
            // TODO: setting state every frame causes the whole VR canvas to re-render, which tanks performance
            setLog((prevLog) => ({
              position: [...prevLog.position, position],
              orientation: [...prevLog.orientation, orientation]
            }))
          }
        }}
      />
    </>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
