import { Plane, Text } from '@react-three/drei'
import React from 'react'

import { DEBUG, LETTER_SIZE } from '../../constants'

/**
 * Returns the door on the back wall.
 */
export function Door({ round }) {
	return (
		<Plane
			args={[LETTER_SIZE * 1.75, 1 / 2]}
			key={`door`}
			position={[LETTER_SIZE, -1 / 4, 0.011]}
		>
			<Text
				key={`round-name`}
				position={[0, 0.05, 0.0001]}
				fontSize={0.05}
				color='#000000'
				anchorX='center'
				anchorY='middle'
			>Round: {round.n}</Text>
			{ round.paused &&
				<Text
					key={`round-paused`}
					position={[0, -0.01, 0.0001]}
					fontSize={0.02}
					color='#000000'
					anchorX='center'
					anchorY='middle'
				>Squeeze for Next Round</Text>
			}
			{ round.target && !round.paused &&
				<Text
					key={`round-target`}
					position={[0, -0.04, 0.0001]}
					fontSize={0.05}
					color='#000000'
					anchorX='center'
					anchorY='middle'
				>Target: {round.target}</Text>
			}
			{ DEBUG && round.targetPresent &&
				<Text
					key={`round-debug`}
					position={[0, -0.10, 0.0001]}
					fontSize={0.02}
					color='blue'
					anchorX='center'
					anchorY='middle'
				>Target Location: {round.targetLocation}</Text>
			}
			<meshPhongMaterial attach='material' color='#8B4513' />
		</Plane>
	)
}
