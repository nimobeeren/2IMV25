import React from 'react'
import { Text } from '@react-three/drei'

/**
 * Shows the letters in a circle for the Ceiling and Floor.
 */
export function CircularLetters ({ numTargets, radius, letters, hiddenPositions, id }) {
	return (
		Array.from(letters.map((letter, i) => {
			const a = (2 * Math.PI) / numTargets
			const x = radius * Math.cos(i * a)
			const y = radius * Math.sin(i * a)
			const rot = i * ((2 * Math.PI) / numTargets) + Math.PI / 2

			return (
				<Text
					key={`target-${i}-${id}`}
					position={[x, y, 0.0001]}
					fontSize={0.15}
					color='#000000'
					anchorX='center'
					anchorY='middle'
					rotation={[0, 0, rot]}
				>
					{hiddenPositions && hiddenPositions.includes(i) ? '' : letter}
				</Text>
			)
		}))
	)
}