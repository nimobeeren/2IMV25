import Head from '../components/Head'

export default function HomePage() {
	console.log('test');
	return (
		<>
			<Head title='Quantifying Immersion Experiment' />
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
							<h1 className='mb-3 font-bold text-5xl'>
								Quantifying Immersion Experiment{' '}
							</h1>
							<div className='space-y-5'>
								<p className='pr-3'>
									This is a web-based virtual reality experiment, where we
									compare our results with Pausch, et al. (1997).
								</p>
								<p className='pr-3'>
									<a
										href='https://github.com/nimobeeren/2IMV25/'
										target='_blank'
										rel='nofollow'
									>
										Visit our Github
									</a>
								</p>
							</div>
						</div>
					</div>
					<div className='flex justify-center self-center z-10'>
						<div className='p-12 bg-white mx-auto rounded-2xl w-100 z-10'>
							<div className='mb-4'>
								<h3 className='font-semibold text-2xl text-gray-800'>
									Get started{' '}
								</h3>
								<p className='text-gray-500'>Select where you want to go</p>
							</div>
							<div className='space-y-5'>
								<div className='space-y-5'>
									<a
										href='#'
										className='w-full flex justify-center border-4 border-gray-800 text-gray-800 p-3  rounded-full tracking-wide font-semibold  shadow-lg cursor-pointer transition ease-in duration-200'
									>
										More info
									</a>
									<a
										href='/experiment'
										className='w-full flex justify-center bg-gray-800  hover:bg-gray-500 text-gray-100 p-3  rounded-full tracking-wide font-semibold  shadow-lg cursor-pointer transition ease-in duration-200'
									>
										Start experiment
									</a>
								</div>
							</div>
							<div className='pt-5 text-center text-gray-400 text-xs'>
								<span>
									Copyright © 2021-2022
									<a
										href='https://codepen.io/uidesignhub'
										rel
										target='_blank'
										title='Ajimon'
										className='text-green hover:text-green-500 '
									></a>
								</span>
							</div>
						</div>
					</div>
				</div>
				<div className='absolute w-full text-gray-600 text-sm flex justify-center bottom-3'>
					<p className='text-center'>
						Created by
						<br />
						N. Beeren, J.W.R. Bekelaar, H.A. Coelho Dias and L.E.P.A. Mathon
					</p>
				</div>
			</div>
		</>
	)
}
