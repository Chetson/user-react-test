import { useState, useEffect, FormEvent, ChangeEvent } from 'react'
import { UserFilter } from '../../types'
import './UserFilters.scss'

interface UserFiltersProps {
	filters: UserFilter
	onFiltersChange: (filters: UserFilter) => void
	cities: string[]
	companies: string[]
}

export const UserFilters = ({
	filters,
	onFiltersChange,
	cities,
	companies,
}: UserFiltersProps) => {
	const [localFilters, setLocalFilters] = useState<UserFilter>(filters)

	useEffect(() => {
		setLocalFilters(filters)
	}, [filters])

	const handleInputChange = (
		e: ChangeEvent<HTMLInputElement | HTMLSelectElement>,
	) => {
		const { name, value } = e.target
		setLocalFilters((prev) => ({ ...prev, [name]: value }))
	}

	const handleSubmit = (e: FormEvent) => {
		e.preventDefault()
		onFiltersChange(localFilters)
	}

	const handleReset = () => {
		const resetFilters = {
			search: '',
			city: '',
			company: '',
		}
		setLocalFilters(resetFilters)
		onFiltersChange(resetFilters)
	}

	return (
		<div className="user-filters">
			<form onSubmit={handleSubmit}>
				<div className="user-filters__controls">
					<div className="user-filters__search">
						<input
							type="text"
							name="search"
							placeholder="Поиск по имени или Email"
							value={localFilters.search}
							onChange={handleInputChange}
						/>
					</div>

					<div className="user-filters__selects">
						<select
							name="city"
							value={localFilters.city}
							onChange={handleInputChange}
						>
							<option value="">Все города</option>
							{cities.map((city) => (
								<option key={city} value={city}>
									{city}
								</option>
							))}
						</select>

						<select
							name="company"
							value={localFilters.company}
							onChange={handleInputChange}
						>
							<option value="">Все компании</option>
							{companies.map((company) => (
								<option key={company} value={company}>
									{company}
								</option>
							))}
						</select>
					</div>

					<div className="user-filters__actions">
						<button type="submit">Применить</button>
						<button
							type="button"
							className="user-filters__reset"
							onClick={handleReset}
						>
							Сбросить
						</button>
					</div>
				</div>
			</form>
		</div>
	)
}
