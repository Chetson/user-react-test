import { Link } from 'react-router-dom'
import './NotFound.scss'

export const NotFound = () => {
	return (
		<div className="not-found">
			<div className="container">
				<div className="not-found__content">
					<h1>404</h1>
					<h2>Страница не найдена</h2>
					<p>
						Страница, которую вы ищете, не существует или была
						перемещена.
					</p>
					<Link to="/" className="not-found__button">
						Домой
					</Link>
				</div>
			</div>
		</div>
	)
}

export default NotFound
