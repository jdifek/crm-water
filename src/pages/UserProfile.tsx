import { useEffect, useState } from 'react'
import UsersService from '../api/Users/UsersService'
import { useAuth } from '../helpers/context/AuthContext'
import { IUser } from '../api/Users/UsersTypes'
import UserNavigate from '../components/UserProfile/UserNavigate'
import { IoSettingsSharp } from 'react-icons/io5'
import UserSidebar from '../components/UserProfile/UserSidebar'

const UserProfile = () => {
	const [userData, setUserData] = useState<IUser | null>(null)
	const [loading, setLoading] = useState<boolean>(true)
	const [error, setError] = useState<string | null>(null)
	const [isSidebarOpen, setIsSidebarOpen] = useState<boolean>(false)
	const { isAuthenticated } = useAuth()

	useEffect(() => {
		const fetchUserData = async () => {
			if (!isAuthenticated) {
				setLoading(false)
				return
			}

			try {
				setLoading(true)
				setError(null)
				const response = await UsersService.getMe()
				setUserData(response.data)
				console.log('User profile data:', response.data)
			} catch (err) {
				console.error('Error fetching user data:', err)
				setError('Ошибка при загрузке данных пользователя')
			} finally {
				setLoading(false)
			}
		}

		fetchUserData()
	}, [isAuthenticated])

	if (!isAuthenticated) {
		return <div>Вы не авторизованы. Пожалуйста, войдите в систему.</div>
	}

	if (loading) {
		return (
			<div className='flex justify-center items-center h-screen'>
				<div className='animate-spin rounded-full h-8 w-8 border-b-2 border-gray-600'></div>
			</div>
		)
	}

	if (error) {
		return <div className='text-center text-red-500 p-4'>{error}</div>
	}

	const infoSections = [
		{
			title: 'Основна інформація',
			items: [
				{ label: 'Имя', value: userData?.full_name || '-' },
				{ label: 'По фамилии', value: '-' },
				{ label: 'Дата последнего входа', value: userData?.last_login || '-' },
				{ label: 'Роль', value: userData?.role || '-' },
				{
					label: 'Администратор',
					value: userData?.role === 'super_admin' ? 'Да' : 'Нет',
				},
				{ label: 'Статус', value: 'Активный' },
				{ label: 'Телефон', value: userData?.phone_number || '-' },
				{ label: 'Email', value: userData?.email || '-' },
			],
		},
		{
			title: 'Повідомлення від апаратів',
			items: userData?.notified_by?.map(notified => ({
				label: notified.name,
				value: `Аппарат №${notified.id}`,
			})) || [{ label: 'Нет подчиненных', value: '-' }],
		},
	]

	console.log('userData:', userData)

	return (
		<div className='p-4 lg:p-8'>
			<div className='flex gap-3 flex-nowrap w-full p-6 lg:max-w-[748px] xl:max-w-[960px] 2xl:max-w-[1440px]'>
				<div className='w-full bg-white rounded-lg shadow p-5 flex flex-col flex-1'>
					<h2 className='text-base md:text-xl font-semibold mb-6'>
						{userData?.full_name}
					</h2>
					<UserNavigate />
					<div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
						{infoSections.map((section, sectionIndex) => (
							<div key={sectionIndex}>
								<h3 className='text-base md:text-xl font-semibold mb-6'>
									{section.title}
								</h3>
								<div className='space-y-4'>
									{section.items?.map((item, itemIndex) => (
										<div key={itemIndex} className='grid grid-cols-2 gap-4'>
											<div className='text-gray-600 text-xs md:text-base'>
												{item.label}
											</div>
											<div className='text-xs md:text-base'>{item.value}</div>
										</div>
									))}
								</div>
							</div>
						))}
					</div>
				</div>
				<button
					className='xl:hidden fixed top-16 right-4 z-50 p-2 bg-blue-500 hover:bg-blue-700 text-white rounded-lg shadow-md'
					onClick={() => setIsSidebarOpen(true)}
				>
					<IoSettingsSharp size={24} />
				</button>
				<UserSidebar isOpen={isSidebarOpen} setIsOpen={setIsSidebarOpen} />
			</div>
		</div>
	)
}

export default UserProfile
