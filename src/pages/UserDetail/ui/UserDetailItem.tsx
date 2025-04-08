import React from 'react'

interface UserDetailItemProps {
	label: string
	value: React.ReactNode
}

export const UserDetailItem: React.FC<UserDetailItemProps> = ({
	label,
	value,
}) => {
	return (
		<div className="user-detail__item">
			<div className="user-detail__label">{label}</div>
			<div className="user-detail__value">{value}</div>
		</div>
	)
}
