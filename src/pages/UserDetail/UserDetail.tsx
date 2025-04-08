import { useParams, Link } from 'react-router-dom'
import { useUser } from '../../hooks/useUsers'
import { Spinner } from '../../components/Spinner/Spinner'
import './UserDetail.scss'
import { UserDetailItem } from './ui/UserDetailItem.tsx'

export const UserDetail = () => {
	const { id } = useParams<{ id: string }>()
	const userId = id ? parseInt(id, 10) : 0

	const { data: user, isLoading, error } = useUser(userId)

	if (isLoading) {
		return (
			<div className="user-detail__loading">
				<Spinner size="large" />
			</div>
		)
	}

	if (error || !user) {
		return (
			<div className="user-detail__error">
				<div className="container">
					<h2>Ошибка загрузки пользователя</h2>
					<p>{error?.message || 'Пользователь не найден'}</p>
					<Link to="/" className="button">
						К списку пользователей
					</Link>
				</div>
			</div>
		)
	}

	return (
		<div className="user-detail">
			<div className="container">
				<div className="user-detail__nav">
					<Link to="/" className="user-detail__back">
						← К списку пользователей
					</Link>
				</div>

				<div className="user-detail__header">
					<div className="user-detail__avatar">
						{user.name.charAt(0).toUpperCase()}
					</div>
					<div className="user-detail__title">
						<h1>{user.name}</h1>
						<p className="user-detail__username">
							@{user.username}
						</p>
					</div>
				</div>

				<div className="user-detail__content">
					<div className="user-detail__section">
						<h2>Контактная информация</h2>
						<UserDetailItem
							label="Email"
							value={
								<a href={`mailto:${user.email}`}>
									{user.email}
								</a>
							}
						/>
						<UserDetailItem
							label="Телефон"
							value={
								<a href={`tel:${user.phone}`}>{user.phone}</a>
							}
						/>
						<UserDetailItem
							label="Сайт"
							value={
								<a
									href={`https://${user.website}`}
									target="_blank"
									rel="noopener noreferrer"
								>
									{user.website}
								</a>
							}
						/>
					</div>

					<div className="user-detail__section">
						<h2>Адрес</h2>
						<UserDetailItem
							label="Улица"
							value={user.address.street}
						/>
						<UserDetailItem
							label="Строение / Дом"
							value={user.address.suite}
						/>
						<UserDetailItem
							label="Город"
							value={user.address.city}
						/>
						<UserDetailItem
							label="Индекс"
							value={user.address.zipcode}
						/>
						<UserDetailItem
							label="GPS координаты"
							value={[
								user.address.geo.lat,
								user.address.geo.lng,
							].join(',')}
						/>
					</div>

					<div className="user-detail__section">
						<h2>Компания</h2>
						<UserDetailItem
							label="Название"
							value={user.company.name}
						/>
						<UserDetailItem
							label="Слоган"
							value={user.company.catchPhrase}
						/>
						<UserDetailItem
							label="Вид деялельности"
							value={user.company.bs}
						/>
					</div>
				</div>
			</div>
		</div>
	)
}

export default UserDetail
