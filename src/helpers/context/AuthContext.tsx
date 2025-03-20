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
	isLoginModalOpen: boolean // Добавляем состояние модалки
	setIsLoginModalOpen: React.Dispatch<React.SetStateAction<boolean>> // Setter для модалки
	userRole: string | null // Добавляем userRole
	setUserRole: React.Dispatch<React.SetStateAction<string | null>>
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
	const [isLoginModalOpen, setIsLoginModalOpen] = useState<boolean>(false) // Состояние модалки
	const [userRole, setUserRole] = useState<string | null>(
		localStorage.getItem('userRole')
	)

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
		} catch (error) {
			console.log('Fetch stats failed with error:', error)
			console.log('Error status:', error.response?.status)
			console.log('Error data:', error.response?.data)
			if (error.response?.status === 401) {
				setIsAuthenticated(false)
				setIsLoginModalOpen(true)
				setUserRole(null)
				if (window.location.pathname !== '/') {
					window.location.href = '/'
				}
			}
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
			setUserRole(null)
			setLoading(false)
			setIsAuthenticated(false)
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
				isLoginModalOpen,
				setIsLoginModalOpen,
				userRole,
				setUserRole,
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

/* временно прописанные роли пользователей */
