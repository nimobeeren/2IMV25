export const NUM_LETTERS = 6
export const LETTER_SIZE = 1 / NUM_LETTERS

export const CEILING = {
	inner: {
		targets: 12,
		radius: 0.25
	},
	outer: {
		targets: 20,
		radius: 0.4,
		hiddenPositions: [ 0, 4, 5, 6, 9, 10, 11, 14, 15, 16, 19, 20 ]
	}
}

export const FLOOR = {
	inner: {
		targets: 11,
		radius: 0.25
	},
	outer: {
		targets: 22,
		radius: 0.4,
		hiddenPositions: [ 0, 1, 2, 4, 5, 6, 7, 10, 11, 12, 13, 15, 16, 17, 18, 21, 22 ]
	}
}

export const WALL = {
	targets: [NUM_LETTERS, NUM_LETTERS],
	hiddenPositions: {
		back: [null, null, null, [0, 1, 2], [0, 1, 2]],
		right: [null, null, null, null, [1, 2]],
		left: [null, [1, 2]]
	}
}
