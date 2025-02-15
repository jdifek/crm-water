/* временно прописанные роли пользователей */

// import { useContext, useState } from 'react'
// import { AuthContext } from '../../helpers/context/AuthContext'

// interface ModalLoginProps {
// 	isOpen: boolean
// 	onClose: React.Dispatch<React.SetStateAction<boolean>>
// }

// // Временный список пользователей
// const users = [
// 	{
// 		id: 1,
// 		username: 'admin',
// 		password: '12345',
// 		full_name: 'Иван Петров',
// 		email: 'ivan@example.com',
// 		role: 'Супер администратор',
// 	},
// 	{
// 		id: 2,
// 		username: 'user1',
// 		password: 'qwerty',
// 		full_name: 'Анна Смирнова',
// 		email: 'anna@example.com',
// 		role: 'Администратор',
// 	},
// 	{
// 		id: 3,
// 		username: 'user2',
// 		password: '222222',
// 		full_name: 'Алексей Козлов',
// 		email: 'alexey@example.com',
// 		role: 'Оператор',
// 		access: 'Ограниченный',
// 	},
// 	{
// 		id: 4,
// 		username: 'user3',
// 		password: '333333',
// 		full_name: 'Мария Иванова',
// 		email: 'maria@example.com',
// 		role: 'Водитель',
// 		access: 'Ограниченный',
// 	},
// 	{
// 		id: 5,
// 		username: 'user4',
// 		password: '444444',
// 		full_name: 'Сергей Павлов',
// 		email: 'sergey@example.com',
// 		role: 'Техник',
// 		access: 'Ограниченный',
// 	},
// 	{
// 		id: 6,
// 		username: 'user5',
// 		password: '555555',
// 		full_name: 'Ольга Васильева',
// 		email: 'olga@example.com',
// 		role: 'Инкассатор',
// 		access: 'Ограниченный',
// 	},
// 	{
// 		id: 7,
// 		username: 'user6',
// 		password: '666666',
// 		full_name: 'Дмитрий Сидоров',
// 		email: 'dmitry@example.com',
// 		role: 'Бухгалтер',
// 		access: 'Полный',
// 	},
// ]

// export default function ModalLogin({ isOpen, onClose }: ModalLoginProps) {
// 	const { login } = useContext(AuthContext)!
// 	const [username, setUsername] = useState('')
// 	const [password, setPassword] = useState('')
// 	const [error, setError] = useState<string | null>(null)
// 	const [isLoading, setIsLoading] = useState(false)

// 	if (!isOpen) return null

// 	const handleLogin = () => {
// 		setIsLoading(true)
// 		setError(null)

// 		// Поиск пользователя по логину и паролю
// 		const foundUser = users.find(
// 			user => user.username === username && user.password === password
// 		)

// 		if (foundUser) {
// 			localStorage.setItem('authToken', JSON.stringify(foundUser))
// 			login(JSON.stringify(foundUser)) // Обновляем контекст
// 			onClose(false)
// 		} else {
// 			setError('Неверный логин или пароль')
// 		}

// 		setIsLoading(false)
// 	}

// 	return (
// 		<div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
// 			<div className='bg-white rounded-2xl p-6 w-80 shadow-lg relative'>
// 				<h2 className='text-xl font-semibold text-center text-gray-500 mb-2'>
// 					Вход
// 				</h2>
// 				<p className='text-center text-gray-500 mb-4'>H2O CRM акаунт</p>

// 				{error && <p className='text-red-500 text-center'>{error}</p>}

// 				<div className='space-y-3'>
// 					<input
// 						type='text'
// 						placeholder='Name'
// 						value={username}
// 						onChange={e => setUsername(e.target.value)}
// 						className='text-black w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300'
// 					/>
// 					<input
// 						type='password'
// 						value={password}
// 						onChange={e => setPassword(e.target.value)}
// 						placeholder='●●●●●●●●'
// 						className='text-black w-full px-4 py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300'
// 					/>
// 					<button
// 						onClick={handleLogin}
// 						className='w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600'
// 					>
// 						{isLoading ? 'Вход...' : 'Войти'}
// 					</button>
// 				</div>
// 				<button
// 					onClick={() => onClose(false)}
// 					className='absolute top-2 right-2 text-gray-500 hover:text-gray-700'
// 				>
// 					✕
// 				</button>
// 			</div>
// 		</div>
// 	)
// }

import { useState } from 'react'
import TokenService from '../../api/Token/TokenService'

interface ModalLoginProps {
	isOpen: boolean
	onClose: React.Dispatch<React.SetStateAction<boolean>>
}

export default function ModalLogin({ isOpen, onClose }: ModalLoginProps) {
	const [username, setUsername] = useState<string>('')
	const [password, setPassword] = useState<string>('')
	const [error, setError] = useState<string | null>(null)
	const [isLoading, setIsLoading] = useState<boolean>(false)

	if (!isOpen) return null

	const handleLogin = async () => {
		try {
			setIsLoading(true)
			setError(null)
			const res = await TokenService.getToken({ username, password })

			localStorage.setItem('authToken', res.data.access)
			localStorage.setItem('refreshToken', res.data.refresh)
			console.log('Logged in successfully:', res)
			onClose(false)
		} catch (error) {
			console.error('Login error:', error)
			setError('Неверный логин или пароль')
		} finally {
			setIsLoading(false)
		}
	}

	return (
		<div className='fixed inset-0 flex items-center justify-center bg-black bg-opacity-50'>
			<div className='bg-white rounded-2xl p-6 w-80 shadow-lg relative'>
				<h2 className='text-xl font-semibold text-center text-gray-500 mb-2'>
					Вхід
				</h2>
				<p className='text-center text-gray-500 mb-4'>H2O CRM акаунт</p>

				{error && <p className='text-red-500 text-center'>{error}</p>}

				{isLoading ? (
					<div className='flex justify-center items-center py-6'>
						<div className='animate-spin rounded-full h-8 w-8 border-b-2 border-gray-600'></div>
					</div>
				) : (
					<>
						<div className='space-y-3'>
							<div className='relative'>
								<input
									type='text'
									placeholder='Name'
									value={username}
									onChange={e => setUsername(e.target.value)}
									className='w-full px-4 py-2 text-black border rounded-md focus:outline-none focus:ring focus:ring-blue-300'
								/>
							</div>
							<div className='relative'>
								<input
									type='password'
									value={password}
									onChange={e => setPassword(e.target.value)}
									placeholder='●●●●●●●●'
									className='w-full px-4 text-black py-2 border rounded-md focus:outline-none focus:ring focus:ring-blue-300'
								/>
							</div>

							<label className='flex items-center space-x-2 text-gray-600 text-sm'>
								<input type='checkbox' className='w-4 h-4' />
								<span>Запам’ятати мене</span>
							</label>

							<button
								onClick={handleLogin}
								className='w-full bg-green-500 text-white py-2 rounded-md hover:bg-green-600'
							>
								УВІЙТИ
							</button>
						</div>

						<button
							onClick={() => onClose(false)}
							className='absolute top-2 right-2 text-gray-500 hover:text-gray-700'
						>
							✕
						</button>
					</>
				)}
			</div>
		</div>
	)
}
