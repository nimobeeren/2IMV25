
import { Plane } from '@react-three/drei'
import React from 'react'

import { CircularLetters } from './CircularLetters'
import { FLOOR } from '../../constants'

/**
 * Returns the floor of the Pausch room.
 */
export function Floor({
	color,
	side = 'regular',
	round,
	...restProps
}) {
	return (
		<Plane scale={4} {...restProps}>
			<meshPhongMaterial attach='material' color={color} />
			{round.displayLetters &&
				<>
					<CircularLetters
						id='inner-floor'
						letters={round.letters.floor.inner}
						numTargets={FLOOR.inner.targets}
						radius={FLOOR.inner.radius} />

					<CircularLetters
						id='outer-floor'
						letters={round.letters.floor.outer}
						numTargets={FLOOR.outer.targets}
						radius={FLOOR.outer.radius}
						hiddenPositions={FLOOR.outer.hiddenPositions} />
				</>
			}
		</Plane>
	)
}
