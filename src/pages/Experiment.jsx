import { Plane, Text } from '@react-three/drei'
import { DefaultXRControllers, VRCanvas } from '@react-three/xr'
import Head from '../components/Head'
import { PositionLogger } from '../components/vr/PositionLogger'
import '../index.css'

const characterSet1 = ['A', 'K', 'M', 'N', 'V', 'W', 'X', 'Y', 'Z']
const characterSet2 = ['E', 'F', 'H', 'I', 'L', 'T']
const developMode = true
const numberOfTargets = 6
const roomSize = 1
const letterSize = roomSize / numberOfTargets

const radiusInnerFloor = 0.25
const radiusOuterFloor = 0.4
const radiusInnerCeiling = 0.25
const radiusOuterCeiling = 0.4
const outerPositionsFloor = [3, 8, 9, 14, 19, 20]
const outerPositionsCeiling = [1, 2, 3, 7, 8, 12, 13, 17, 18]

/**
 * Returns the door on the back wall.
 */
function Door() {
  return (
    <Plane
      args={[letterSize * 1.75, roomSize / 2]}
      key={`door`}
      position={[letterSize, -roomSize / 4, 0.011]}
    >
      <meshPhongMaterial attach='material' color={'#8B4513'} />
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
  ...restProps
}) {
  return (
    <Plane scale={10} {...restProps}>
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
      {side === 'back' && Door()}
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
    <Plane scale={10} {...restProps}>
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
    <Plane scale={10} {...restProps}>
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

function Experiment() {
  return (
    <>
      <Head title='Quantifying Immersion Experiment' />
      <VRCanvas>
        <ambientLight />
        <pointLight position={[10, 10, 10]} />
        <DefaultXRControllers />
        <PositionLogger />
        {/* Top wall */}
        <Ceiling
          position={developMode ? [0, 5, -5] : [0, 5, 0]}
          rotation={[Math.PI / 2, 0, 0]}
          color='#ececec'
        />
        {/* Bottom wall */}
        <Floor
          position={developMode ? [0, -5, -5] : [0, -5, 0]}
          rotation={[-Math.PI / 2, 0, 0]}
          color='#ececec'
        />
        {/* Back wall */}
        <Wall
          position={developMode ? [0, 0, -10] : [0, 0, -5]}
          rotation={[0, 0, 0]}
          color='#ececec'
          side='back'
        />
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

export default Experiment
