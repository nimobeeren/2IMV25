import { Plane, Sky, Text } from '@react-three/drei'
import { useThree } from '@react-three/fiber'
import { DefaultXRControllers, useXRFrame, VRCanvas } from '@react-three/xr'
import React, { useState } from 'react'
import ReactDOM from 'react-dom'
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

function PositionLogger(props) {
  const { gl } = useThree()

  const [time, setTime] = useState(0)
  const [pos, setPos] = useState(null)

  useXRFrame(async (time, xrFrame) => {
    if (!gl.xr.isPresenting) return

    const referenceSpace = gl.xr.getReferenceSpace()
    const viewerPose = xrFrame.getViewerPose(referenceSpace)

    console.log(viewerPose.views)

    // https://developer.mozilla.org/en-US/docs/Web/API/XRView

    setTime(time)
    // setPos(xrFrame.getViewerPose())
  })

  return (
    <Plane rotation={[0, 0, 0]} scale={3} {...props}>
      <meshPhongMaterial attach="material" color="#0000aa" />
      <Text position={[0, 0, 0.01]} fontSize={0.15} color="#fff" anchorX="center" anchorY="middle">
        Time: {time}
      </Text>
    </Plane>
  )
}

function App() {
  return (
    <VRCanvas>
      <Sky sunPosition={[0, 1, 0]} />
      <ambientLight />
      <pointLight position={[10, 10, 10]} />
      <DefaultXRControllers />
      <PositionLogger position={[0, 0, -1]} />
      <Floor position={[0, -5, 0]} />
      <Wall position={[0, 0, -5]} color="#00aa00" />
      <Wall position={[5, 0, 0]} rotation={[0, -Math.PI / 2, 0]} color="#aaaa00" />
      <Wall position={[-5, 0, 0]} rotation={[0, Math.PI / 2, 0]} color="#aa0000" />
      <Wall position={[0, 0, 5]} rotation={[0, Math.PI, 0]} color="#0000aa" numTargets={[0, 0]} />
    </VRCanvas>
  )
}

ReactDOM.render(<App />, document.getElementById('root'))
