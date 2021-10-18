import { Plane } from '@react-three/drei'
import React from 'react'
import { CircularLetters } from './CircularLetters'
import { CEILING } from '../../constants'

/**
 * Returns the ceiling of the Pausch room.
 */
export function Ceiling({
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
						id='inner-ceiling'
						letters={round.letters.ceiling.inner}
						numTargets={CEILING.inner.targets}
						radius={CEILING.inner.radius} />

					<CircularLetters
						id='outer-floor'
						letters={round.letters.ceiling.outer}
						numTargets={CEILING.outer.targets}
						radius={CEILING.outer.radius}
						hiddenPositions={CEILING.outer.hiddenPositions} />
				</>
			}
		</Plane>
	)
}
