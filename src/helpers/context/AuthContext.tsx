import React, { createContext, useContext, useEffect, useState } from 'react'
import StatsService from '../../api/Stats/StatsService'
import {
	CurrentDailyStats,
	CurrentDaySummary,
} from '../../api/Stats/StatsTypes'

interface AuthContextType {
	isAuthenticated: boolean
	setIsAuthenticated: React.Dispatch<React.SetStateAction<boolean>>
	currentDaySummary: CurrentDaySummary | null
	setCurrentDaySummary: React.Dispatch<
		React.SetStateAction<CurrentDaySummary | null>
	>
	currentDailyStats: CurrentDailyStats[]
	setCurrentDailyStats: React.Dispatch<
		React.SetStateAction<CurrentDailyStats[]>
	>
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
	const [currentDailyStats, setCurrentDailyStats] = useState<
		CurrentDailyStats[]
	>([])
	const [loading, setLoading] = useState<boolean>(false)

	const fetchStats = async () => {
		setLoading(true)
		try {
			const dateFn = new Date().toISOString().split('T')[0]
			const dateStDate = new Date()
			dateStDate.setDate(dateStDate.getDate() - 30)
			const dateSt = `${dateStDate.getFullYear()}-${String(
				dateStDate.getMonth() + 1
			).padStart(2, '0')}-${String(dateStDate.getDate()).padStart(2, '0')}`

			const [daySummaryRes, currentDailyRes] = await Promise.all([
				StatsService.currentDaySummary(),
				StatsService.currentDaily(dateSt, dateFn),
			])
			setCurrentDaySummary(daySummaryRes.data)
			setCurrentDailyStats(currentDailyRes.data.results)
			console.log('Day summary:', daySummaryRes.data)
			console.log('Daily stats:', currentDailyRes.data.results)
		} catch (error) {
			console.error('Error fetching stats:', error)
			setCurrentDaySummary(null)
			setCurrentDailyStats([])
		} finally {
			setLoading(false)
		}
	}

	useEffect(() => {
		const token = localStorage.getItem('authToken')
		if (token && isAuthenticated) {
			fetchStats()
		} else {
			setCurrentDaySummary(null)
			setCurrentDailyStats([])
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
				currentDailyStats,
				setCurrentDailyStats,
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
