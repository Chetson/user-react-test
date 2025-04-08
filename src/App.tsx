import { Suspense } from 'react'
import { Routes, Route } from 'react-router-dom'
import { QueryClient, QueryClientProvider } from '@tanstack/react-query'
import { Header } from './components/Header/Header'
import { Spinner } from './components/Spinner/Spinner'
import { UserList, UserDetail, NotFound } from './pages'
import './styles/global.scss'

const queryClient = new QueryClient()

function App() {
	return (
		<QueryClientProvider client={queryClient}>
			<div className="app">
				<Header />
				<main className="main">
					<Suspense fallback={<Spinner />}>
						<Routes>
							<Route path="/" element={<UserList />} />
							<Route path="/user/:id" element={<UserDetail />} />
							<Route path="*" element={<NotFound />} />
						</Routes>
					</Suspense>
				</main>
			</div>
		</QueryClientProvider>
	)
}

export default App
