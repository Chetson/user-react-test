import { useState, useEffect } from 'react'
import { UserCard } from '../../components/UserCard/UserCard'
import { UserFilters } from '../../components/UserFilters/UserFilters'
import { Spinner } from '../../components/Spinner/Spinner'
import { useFilteredUsers, useUsers } from '../../hooks/useUsers'
import type { UserFilter } from '../../types'
import { extractCities, extractCompanies } from '../../utils/filter'
import './UserList.scss'

export const UserList = () => {
	const [filters, setFilters] = useState<UserFilter>({
		search: '',
		city: '',
		company: '',
	})

	const [cities, setCities] = useState<string[]>([])
	const [companies, setCompanies] = useState<string[]>([])

	// Получаем всех пользователей
	const { data: allUsers, isLoading: isLoadingAllUsers } = useUsers()

	// Получаем отфильтрованных пользователей
	const { data: filteredUsers, isLoading: isLoadingFilteredUsers } =
		useFilteredUsers(filters)

	// Заполняем параметры для фильтрации
	useEffect(() => {
		if (allUsers) {
			// заполняем список городов
			setCities(extractCities(allUsers))
			// заполняем список компаний
			setCompanies(extractCompanies(allUsers))
		}
	}, [allUsers])

	const handleFiltersChange = (newFilters: UserFilter) => {
		setFilters(newFilters)
	}

	const isLoading = isLoadingAllUsers || isLoadingFilteredUsers
	const hasUsers = filteredUsers && filteredUsers.length > 0

	return (
		<div className="user-list">
			<div className="container">
				<header className="user-list__header">
					<h1>Список пользователей</h1>
					<p>
						Поиск и фильтрация пользоватлей по городу и/или
						компании.
					</p>
				</header>

				<UserFilters
					filters={filters}
					onFiltersChange={handleFiltersChange}
					cities={cities}
					companies={companies}
				/>

				<div className="user-list__content">
					{isLoading ? (
						<Spinner size="large" />
					) : !hasUsers ? (
						<div className="user-list__empty">
							<h3>Пользователей не найдено</h3>
							<p>
								Попробуйте изменить параметры фильтра либо
								поиска.
							</p>
						</div>
					) : (
						<div className="user-list__grid">
							{filteredUsers?.map((user) => (
								<UserCard key={user.id} user={user} />
							))}
						</div>
					)}
				</div>
			</div>
		</div>
	)
}

export default UserList
