import { useEffect } from 'react'

export default function Head({ title }) {
	useEffect(() => {
		document.title = title
	}, [title])

	// eslint-disable-next-line unicorn/no-null
	return null
}
