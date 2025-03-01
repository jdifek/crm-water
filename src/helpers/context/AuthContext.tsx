import React, { createContext, useContext, useEffect, useState } from 'react'
import StatsService, {
	CurrentDaySummary,
	Last30DaysData,
} from '../../api/Stats/StatsService.ts'

interface AuthContextType {
	isAuthenticated: boolean
	setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>
	currentDaySummary: CurrentDaySummary | null
	setCurrentDaySummary: React.Dispatch<
		React.SetStateAction<CurrentDaySummary | null>
	>
	last30DaysData: Last30DaysData[]
	setLast30DaysData: React.Dispatch<React.SetStateAction<Last30DaysData[]>>
	loading: boolean
	fetchStats: () => Promise<void>
}

const AuthContext = createContext<AuthContextType | undefined>(undefined)

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
	const [isAuthenticated, setIsAuthenticated] = useState<boolean>(
		!!localStorage.getItem('authToken')
	)
	const [currentDaySummary, setCurrentDaySummary] =
		useState<CurrentDaySummary | null>(null)
	const [last30DaysData, setLast30DaysData] = useState<Last30DaysData[]>([])
	const [loading, setLoading] = useState<boolean>(false)

	const fetchStats = async () => {
		setLoading(true)
		try {
			const [daySummaryRes, last30DaysRes] = await Promise.all([
				StatsService.currentDaySummary(),
				StatsService.currentLast(),
			])
			setCurrentDaySummary(daySummaryRes.data)
			setLast30DaysData(last30DaysRes.data)
		} catch (error) {
			console.error('Error fetching stats:', error)
			setCurrentDaySummary(null)
			setLast30DaysData([])
		} finally {
			setLoading(false)
		}
	}

	// Отслеживаем изменение токена и загружаем статистику
	useEffect(() => {
		const token = localStorage.getItem('authToken')
		if (token && isAuthenticated) {
			fetchStats()
		} else {
			setCurrentDaySummary(null)
			setLast30DaysData([])
			setLoading(false)
		}
	}, [isAuthenticated])

	return (
		<AuthContext.Provider
			value={{
				isAuthenticated,
				setIsAuthenticated,
				currentDaySummary,
				setCurrentDaySummary,
				last30DaysData,
				setLast30DaysData,
				loading,
				fetchStats,
			}}
		>
			{children}
		</AuthContext.Provider>
	)
}

export const useAuth = () => {
	const context = useContext(AuthContext)
	if (context === undefined) {
		throw new Error('useAuth must be used within an AuthProvider')
	}
	return context
}

// /* временно прописанные роли пользователей */

// import { createContext, ReactNode, useEffect, useState } from 'react'

// interface IUser {
// 	id: number
// 	full_name: string
// 	email: string
// 	role: string
// }

// interface AuthContextType {
// 	user: IUser | null
// 	login: (userData: string) => void
// 	logout: () => void
// }

// export const AuthContext = createContext<AuthContextType | undefined>(undefined)

// export const AuthProvider = ({ children }: { children: ReactNode }) => {
// 	const [user, setUser] = useState<IUser | null>(null)

// 	useEffect(() => {
// 		// Загружаем пользователя из localStorage при старте
// 		const storedUser = localStorage.getItem('authToken')
// 		if (storedUser) {
// 			setUser(JSON.parse(storedUser))
// 		}
// 	}, [])

// 	const login = (userData: string) => {
// 		localStorage.setItem('authToken', userData)
// 		setUser(JSON.parse(userData))
// 	}

// 	const logout = () => {
// 		localStorage.removeItem('authToken')
// 		setUser(null)
// 	}

// 	return (
// 		<AuthContext.Provider value={{ user, login, logout }}>
// 			{children}
// 		</AuthContext.Provider>
// 	)
// }

// // import { createContext, ReactNode, useEffect, useState } from 'react'
// // import UsersService from '../../api/Users/UsersService'

// // interface IUser {
// // 	id: number
// // 	full_name: string
// // 	email: string
// // 	role: string
// // }

// // interface AuthContextType {
// // 	user: IUser | null
// // 	login: (token: string) => void
// // 	logout: () => void
// // }

// // export const AuthContext = createContext<AuthContextType | undefined>(undefined)

// // export const AuthProvider = ({ children }: { children: ReactNode }) => {
// // 	const [user, setUser] = useState<IUser | null>(null)

// // 	useEffect(() => {
// // 		const fetchUser = async () => {
// // 			const token = localStorage.getItem('authToken')
// // 			if (!token) return
// // 			try {
// // 				const userData = await UsersService.getUserById(1) // Пример запроса (замени ID)
// // 				setUser(userData)
// // 			} catch (error) {
// // 				console.error('Ошибка загрузки пользователя', error)
// // 			}
// // 		}

// // 		fetchUser()
// // 	}, [])

// // 	const login = (token: string) => {
// // 		localStorage.setItem('authToken', token)
// // 		setUser({
// // 			id: 1,
// // 			full_name: 'Иван Петров',
// // 			email: 'ivan@example.com',
// // 			role: 'Супер администратор',
// // 		}) // Заглушка, замени API-запросом
// // 	}

// // 	const logout = () => {
// // 		localStorage.removeItem('authToken')
// // 		setUser(null)
// // 	}

// // 	return (
// // 		<AuthContext.Provider value={{ user, login, logout }}>
// // 			{children}
// // 		</AuthContext.Provider>
// // 	)
// // }
