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
