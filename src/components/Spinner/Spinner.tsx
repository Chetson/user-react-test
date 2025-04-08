import './Spinner.scss'

interface SpinnerProps {
	size?: 'small' | 'medium' | 'large'
}

export const Spinner = ({ size = 'medium' }: SpinnerProps) => {
	return (
		<div className={`spinner spinner--${size}`}>
			<div className="spinner__spinner"></div>
		</div>
	)
}
