export const EXPERIMENT_ROUNDS = [
	// Introduction --> Room without letters
	{ displayLetters: false, targetPresent: false, overlay: false },

	// 10 rounds without FOV overlay
	{ displayLetters: true, targetPresent: false, overlay: false },
	{ displayLetters: true, targetPresent: true, overlay: false, target: 'V' },
	{ displayLetters: true, targetPresent: true, overlay: false, target: 'Z' },
	{ displayLetters: true, targetPresent: false, overlay: false },
	{ displayLetters: true, targetPresent: true, overlay: false, target: 'X' },
	{ displayLetters: true, targetPresent: true, overlay: false, target: 'A' },
	{ displayLetters: true, targetPresent: false, overlay: false },
	{ displayLetters: true, targetPresent: true, overlay: false, target: 'M' },
	{ displayLetters: true, targetPresent: false, overlay: false },
	{ displayLetters: true, targetPresent: false, overlay: false },

	// 5 round with FOV overlay
	{ displayLetters: true, targetPresent: true, overlay: true },
	{ displayLetters: true, targetPresent: true, overlay: true },
	{ displayLetters: true, targetPresent: true, overlay: true },
	{ displayLetters: true, targetPresent: true, overlay: true },
	{ displayLetters: true, targetPresent: true, overlay: true }
]
