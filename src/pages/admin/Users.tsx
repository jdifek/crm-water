// const users = [
//   {
//     id: 1,
//     name: "Андрей Техник",
//     email: "andrey@example.com",
//     role: "Техник",
//     access: "Список аппаратов",
//     status: "active",
//   },
//   {
//     id: 2,
//     name: "Иван Мастер",
//     email: "ivan@example.com",
//     role: "Администратор",
//     access: "Список аппаратов",
//     status: "active",
//   },
// ];

import { useEffect, useState } from 'react'
import UsersService from '../../api/Users/UsersService'
import { IUser } from '../../api/Users/UsersTypes'

const Users = () => {
	const [users, setUsers] = useState<IUser[]>([])
	const [isLoading, setIsLoading] = useState<boolean>(false)
	const [error, setError] = useState<string | null>(null)

	useEffect(() => {
		const fetchUsers = async () => {
			setIsLoading(true)
			setError(null)
			try {
				const res = await UsersService.getUsers()
				console.log(res.data)
				setUsers(res.data.results)
			} catch (error) {
				console.error('Ошибка при получении пользователей:', error)
				setError('Не удалось загрузить пользователей.')
			} finally {
				setIsLoading(false)
			}
		}

		fetchUsers()
	}, [])

	return (
		<div className='p-4 lg:p-8'>
			<div className='bg-white rounded-lg shadow'>
				<div className='px-4 py-5 sm:px-6 flex justify-between items-center'>
					<h3 className='text-lg leading-6 font-medium text-gray-900'>
						Пользователи
					</h3>
					<button className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600'>
						Добавить пользователя
					</button>
				</div>
				{isLoading ? (
					<div className='flex justify-center items-center py-6'>
						<div className='animate-spin rounded-full h-8 w-8 border-b-2 border-gray-600'></div>
					</div>
				) : error ? (
					<p className='text-center text-red-500 p-4'>{error}</p>
				) : (
					<div className='overflow-x-auto'>
						<table className='min-w-full divide-y divide-gray-200'>
							<thead className='bg-gray-50'>
								<tr>
									<th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
										Имя
									</th>
									<th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
										Email
									</th>
									<th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
										Роль
									</th>
									<th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
										Доступ
									</th>
									<th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
										Статус
									</th>
									<th className='px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider'>
										Действия
									</th>
								</tr>
							</thead>
							<tbody className='bg-white divide-y divide-gray-200'>
								{users ? (
									users.map(user => (
										<tr key={user.id}>
											<td className='px-6 py-4 whitespace-nowrap'>
												<div className='text-sm font-medium text-gray-900'>
													{user.full_name}
												</div>
											</td>
											<td className='px-6 py-4 whitespace-nowrap'>
												<div className='text-sm text-gray-500'>
													{user.email}
												</div>
											</td>
											<td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
												{user.role}
											</td>
											<td className='px-6 py-4 whitespace-nowrap text-sm text-gray-500'>
												{user.access}
											</td>
											<td className='px-6 py-4 whitespace-nowrap'>
												<span className='px-2 inline-flex text-xs leading-5 font-semibold rounded-full bg-green-100 text-green-800'>
													Активный
												</span>
											</td>
											<td className='px-6 py-4 whitespace-nowrap text-sm font-medium'>
												<button className='text-blue-600 hover:text-blue-900 mr-3'>
													Изменить
												</button>
												<button className='text-red-600 hover:text-red-900'>
													Удалить
												</button>
											</td>
										</tr>
									))
								) : (
									<p className='text-gray-400 font-semibold text-lg'>
										Пользователи не найдены
									</p>
								)}
							</tbody>
						</table>
					</div>
				)}
			</div>
		</div>
	)
}

export default Users
