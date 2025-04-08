import { User } from '../types'

/**
 * Извлекает уникальные города из пользовательских данных для фильтрации
 * @param users - Массив объектов пользователей
 * @returns Массив уникальных городов
 */
export const extractCities = (users: User[]): string[] => {
	const cities = users.map((user) => user.address.city)
	return [...new Set(cities)].sort()
}

/**
 * Извлекает для фильтрации уникальные названия компаний из пользователей
 * @param users - Массив объектов компаний
 * @returns Массив уникальных компаний
 */
export const extractCompanies = (users: User[]): string[] => {
	const companies = users.map((user) => user.company.name)
	return [...new Set(companies)].sort()
}
