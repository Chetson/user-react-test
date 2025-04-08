import { Link, useLocation } from 'react-router-dom'
import './Header.scss'

export const Header = () => {
	const location = useLocation()

	const isActive = (path: string) => {
		return location.pathname === path
	}

	return (
		<header className="header">
			<div className="container">
				<div className="header__content">
					<div className="header__logo">
						<Link to="/">Управление пользователями</Link>
					</div>
					<nav className="header__nav">
						<ul>
							<li>
								<Link
									to="/"
									className={isActive('/') ? 'active' : ''}
								>
									Пользователи
								</Link>
								<Link
									to="/someUrl"
									className={
										isActive('/someUrl') ? 'active' : ''
									}
								>
									404
								</Link>
							</li>
						</ul>
					</nav>
				</div>
			</div>
		</header>
	)
}
