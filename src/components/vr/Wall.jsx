import { Plane, Text } from '@react-three/drei'
import React from 'react'

import { Door } from './Door'
import { Window } from './Window'
import { WALL } from '../../constants'

/**
 * Returns a wall of the Pausch room.
 */
export function Wall({
	color,
	side,
	round,
	...restProps
}) {
	const hiddenPositions = WALL.hiddenPositions[side] || []

	return (
		<Plane scale={4} {...restProps}>
			<meshPhongMaterial attach='material' color={color} />
			{round.displayLetters && round.letters[side].flatMap((letters, i) =>
				letters.map((letter, j) => {
					const x = (i / (WALL.targets[0] - 1)) * 0.8 - 0.4
					const y = (j / (WALL.targets[1] - 1)) * 0.8 - 0.4
					const hidden = hiddenPositions[i] && hiddenPositions[i].includes(j)

					return (
						<Text
							key={`target-${i}-${j}`}
							position={[x, y, 0.0001]}
							fontSize={0.15}
							color='#000000'
							anchorX='center'
							anchorY='middle'
						>
							{hidden ? '' : letter}
						</Text>
					)
				})
			)}
			{side === 'back' && Door({ round })}
			{(side === 'right' || side === 'left') && Window(side)}
		</Plane>
	)
}
