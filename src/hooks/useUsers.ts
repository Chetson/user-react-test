import { useQuery } from '@tanstack/react-query'
import { fetchUsers, fetchUserById, filterUsers } from '../services/api'
import { User, UserFilter } from '../types'

/**
 * Время кеширования запроса для инвалидации
 */
const CACHE_TIME = 5 * 60 * 1000

/**
 * Запрашивает и кеширует пользователей
 */
export const useUsers = () => {
	return useQuery<User[], Error>({
		queryKey: ['users'],
		queryFn: fetchUsers,
		staleTime: CACHE_TIME,
	})
}

/**
 * Запрашивает и кеширует одного пользователя по ID
 * @param id - Идентификатор пользователя
 */
export const useUser = (id: number) => {
	return useQuery<User, Error>({
		queryKey: ['user', id],
		queryFn: () => fetchUserById(id),
		staleTime: CACHE_TIME,
		enabled: !!id,
	})
}

/**
 * Запрашиваем отфильтрованных пользователей
 * @param filters - Объект с параметрами фильтрации
 */
export const useFilteredUsers = (filters: UserFilter) => {
	return useQuery<User[], Error>({
		queryKey: ['filteredUsers', filters],
		queryFn: () => filterUsers(filters),
		staleTime: CACHE_TIME,
	})
}
