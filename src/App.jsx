import { lazy, Suspense } from 'react'
import { BrowserRouter, Route, Switch } from 'react-router-dom'
import LoadingOrError from './components/LoadingOrError'

const Home = lazy(async () => import('./pages/Index'))
const Experiment = lazy(async () => import('./pages/Experiment'))

export default function App() {
	return (
		<BrowserRouter>
			<Suspense fallback={<LoadingOrError />}>
				<Switch>
					<Route exact path='/' component={Home} />
					<Route exact path='/experiment' component={Experiment} />
				</Switch>
			</Suspense>
		</BrowserRouter>
	)
}
