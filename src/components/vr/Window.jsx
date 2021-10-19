import { Plane } from '@react-three/drei'
import React from 'react'

import { LETTER_SIZE } from '../../constants'

/**
 * Returns the window on one of the walls.
 *
 * @param {string} side The side of the room where the window should be rendered.
 */
export function Window(side) {
	const direction = side === 'left' ? -1 : 1
	return (
		<Plane
			args={[LETTER_SIZE, LETTER_SIZE * 2]}
			key={`window-${side}`}
			position={[LETTER_SIZE * 1.5 * direction, -LETTER_SIZE, 0.011]}
		>
			<meshPhongMaterial attach='material' color={'#87CEEB'} />
		</Plane>
	)
}
