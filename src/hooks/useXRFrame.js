import { useThree } from '@react-three/fiber'
import React from 'react'

// NOTE: I sometimes ran into an error when exiting presenting mode, but
// couldn't reproduce it consistently.
// The error was: Cannot read properties of null (reading 'cancelAnimationFrame')
// And it seemed to be caused by this line:
// https://github.com/pmndrs/react-xr/blob/4e914c17f2a425429bc02f53ac50c607a6d1fdc0/src/XR.tsx#L264
// I've changed the ! to a ? and it seems to work now
export const useXRFrame = callback => {
	const { gl } = useThree()
	const requestRef = React.useRef()
	const previousTimeRef = React.useRef()

	const loop = React.useCallback(
		(time, xrFrame) => {
			if (previousTimeRef.current !== undefined) {
				callback(time, xrFrame)
			}

			previousTimeRef.current = time
			requestRef.current = gl.xr.getSession().requestAnimationFrame(loop)
		},
		[gl.xr, callback]
	)

	React.useEffect(() => {
		if (!gl.xr?.isPresenting) {
			return
		}

		requestRef.current = gl.xr.getSession().requestAnimationFrame(loop)

		return () => {
			if (requestRef.current) {
				gl.xr.getSession()?.cancelAnimationFrame(requestRef.current)
			}
		}
	}, [gl.xr.isPresenting, loop, gl.xr])
}
