import {
	CEILING,
	FLOOR,
	WALL
} from './constants'

const random = max => Math.floor(Math.random() * max)

const randomElement = arr => arr[random(arr.length)]

// Shuffles an array using the Fisher-Yates algorithm
// https://en.wikipedia.org/wiki/Fisher%E2%80%93Yates_shuffle
const shuffleArray = array => {
	for (let i = array.length - 1; i > 0; i--) {
		const j = Math.floor(Math.random() * (i + 1))
		const temp = array[i]
		array[i] = array[j]
		array[j] = temp
	}

	return array
}

const getHiddenPositions = (wall, side) => {
	switch (wall) {
	case 'ceiling':
		return side === 'inner' ? [] : CEILING.outer.hiddenPositions
	case 'floor':
		return side === 'inner' ? [] : FLOOR.outer.hiddenPositions
	default:
		if (WALL.hiddenPositions[wall]) {
			return WALL.hiddenPositions[wall][side] || []
		}

		return []
	}
}

const initLetters = (n, charSet) => new Array(n)
	.fill(null)
	.map(_ => randomElement(charSet))

const initWall = charSet => new Array(WALL.targets[0])
	.fill(null)
	.map(_ => initLetters(WALL.targets[1], charSet))

const generateTargetLocation = letters => {
	const wall = randomElement(Object.keys(letters))
	const side = randomElement(Object.keys(letters[wall]))
	const hiddenPositions = getHiddenPositions(wall, side)

	let pos = null
	do {
		pos = random(letters[wall][side].length)
	} while (hiddenPositions.includes(pos))

	return {
		wall,
		side,
		pos
	}
}

function generateLetters ({ targetPresent, target, charSet }) {
	// Remove target from the full character set so it is not
	// added to other places in the walls.
	if (target) {
		charSet = charSet.filter(c => c !== target)
	}

	const letters = {
		ceiling: {
			inner: initLetters(CEILING.inner.targets, charSet),
			outer: initLetters(CEILING.outer.targets, charSet)
		},
		floor: {
			inner: initLetters(FLOOR.inner.targets, charSet),
			outer: initLetters(FLOOR.outer.targets, charSet)
		},
		front: initWall(charSet),
		back: initWall(charSet),
		left: initWall(charSet),
		right: initWall(charSet)
	}

	let targetLocation = null

	// Place target somewhere.
	if (targetPresent) {
		const { wall, side, pos } = generateTargetLocation(letters)

		letters[wall][side][pos] = target
		targetLocation = wall
	}

	return { letters, targetLocation }
}

export function generateRounds ({ n, targetProbability, charSet, ...others }) {
	const rounds = new Array(n)
	const nPresent = Math.round(n * targetProbability)

	for (let i = 0; i < n; i++) {
		const targetPresent = i < nPresent
		const target = randomElement(charSet)

		rounds[i] = {
			displayLetters: true,
			targetPresent,
			target,
			...others,
			...generateLetters({ target, targetPresent, charSet })
		}
	}

	return shuffleArray(rounds)
}
