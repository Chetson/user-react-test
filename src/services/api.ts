import type { User, UserFilter } from '../types'

const API_URL = 'https://jsonplaceholder.typicode.com'

/**
 * Вспомогательная функция для получения данных от API
 * @param endpoint - Конечная точка API
 * @returns Promise данные из API
 */
const fetchFromAPI = async <T>(endpoint: string): Promise<T> => {
	try {
		const response = await fetch(`${API_URL}/${endpoint}`)

		if (!response.ok) {
			throw new Error(`Ошибка API: ${response.status}`)
		}

		return await response.json()
	} catch (error) {
		console.error(`Ошибка получения данных с API: ${error}`)
		throw error
	}
}

/**
 * Получаем всех пользователей по API
 * @returns Promise массив с пользователями
 */
export const fetchUsers = async (): Promise<User[]> => {
	return await fetchFromAPI('users')
}

/**
 * Получение пользователя по ID
 * @param id - Идентификатор пользователя
 * @returns Promise объект пользователя
 */
export const fetchUserById = async (id: number): Promise<User> => {
	return await fetchFromAPI(`users/${id}`)
}

/**
 * Фильтрует пользователей на основе поискового запроса и фильтров
 * поскольку JSONPlaceholder не поддерживает фильтрацию напрямую,
 * мы извлекаем всех пользователей и фильтруем их на стороне клиента.
 * @param filters - Объект, содержащий параметры фильтра
 * @returns Promise с отфильтрованным пользователями
 */
export const filterUsers = async (filters: UserFilter): Promise<User[]> => {
	try {
		const users = await fetchUsers()

		return users.filter((user) => {
			// Поиск по имени / емайлу
			const matchesSearch =
				!filters.search ||
				user.name
					.toLowerCase()
					.includes(filters.search.toLowerCase()) ||
				user.email.toLowerCase().includes(filters.search.toLowerCase())

			// Фильтруем по городу
			const matchesCity =
				!filters.city ||
				user.address.city.toLowerCase() === filters.city.toLowerCase()

			// Фильтруем по компании
			const matchesCompany =
				!filters.company ||
				user.company.name.toLowerCase() ===
					filters.company.toLowerCase()

			return matchesSearch && matchesCity && matchesCompany
		})
	} catch (error) {
		console.error('Ошибка фильтрации пользователей:', error)
		throw error
	}
}
