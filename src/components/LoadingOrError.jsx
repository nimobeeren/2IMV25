export default function LoadingOrError({ error }) {
	return (
		<div
			className='bg-no-repeat bg-cover bg-center relative'
			style={{
				backgroundImage:
					'url(https://images.unsplash.com/photo-1493497029755-f49c8e9a8bbe?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1632&q=80)'
			}}
		>
			<div className='absolute bg-gradient-to-b from-gray-900 to-gray-700 opacity-75 inset-0 z-0' />
			<div className='min-h-screen sm:flex sm:flex-row mx-0 justify-center z-10'>
				<div className='flex-col flex  self-center p-10 sm:max-w-5xl xl:max-w-2xl  z-10'>
					<div className='self-start hidden lg:flex flex-col text-white'>
						<img src className='mb-3' />
						<h1 className='mb-3 text-xl'>{error ? error : 'loading...'}</h1>
					</div>
				</div>
			</div>
		</div>
	)
}
