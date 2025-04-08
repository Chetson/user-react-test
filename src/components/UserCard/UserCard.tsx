import { useNavigate } from 'react-router-dom'
import { User } from '../../types'
import { Card } from '../Card/Card'
import './UserCard.scss'

interface UserCardProps {
	user: User
}

export const UserCard = ({ user }: UserCardProps) => {
	const navigate = useNavigate()

	const handleClick = () => {
		navigate(`/user/${user.id}`)
	}

	return (
		<Card className="user-card" onClick={handleClick}>
			<div className="user-card__avatar">
				{user.name.charAt(0).toUpperCase()}
			</div>
			<div className="user-card__content">
				<h3 className="user-card__name">{user.name}</h3>
				<p className="user-card__username">@{user.username}</p>
				<p className="user-card__email">{user.email}</p>
				<div className="user-card__details">
					<p className="user-card__company">{user.company.name}</p>
					<p className="user-card__city">{user.address.city}</p>
				</div>
			</div>
		</Card>
	)
}
