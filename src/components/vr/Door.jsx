import { Plane, Text } from '@react-three/drei'
import React from 'react'

import { LETTER_SIZE } from '../../constants'
import EXPERIMENT_ROUNDS from '../../rounds.json'

/**
 * Returns the door on the back wall.
 */
export function Door({ round }) {
	let pausedText = ''

	switch (round.n) {
	case 0:
		pausedText = 'Squeeze to Start'
		break
	case EXPERIMENT_ROUNDS.length - 1:
		pausedText = 'Squeeze to Leave'
		break
	default:
		pausedText = 'Squeeze for Next Round'
	}

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
				>{pausedText}</Text>
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
			<meshPhongMaterial attach='material' color='#8B4513' />
		</Plane>
	)
}
