import { ReactNode } from 'react'
import './Card.scss'

interface CardProps {
	children: ReactNode
	className?: string
	onClick?: () => void
}

/**
 * Переиспользуемый компонент - по FSD его определяем в shared, но в данном случае это не требуется
 */
export const Card = ({ children, className = '', onClick }: CardProps) => {
	return (
		<div
			className={`card ${onClick ? 'card--clickable' : ''} ${className}`}
			onClick={onClick}
		>
			{children}
		</div>
	)
}
