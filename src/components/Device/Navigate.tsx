import { NavLink } from 'react-router-dom'
import { useDevice } from '../../helpers/context/DeviceContext'

export const DeviceNavigate = () => {
	const { selectedDeviceId } = useDevice()

	const menuItems = [
		{ name: 'Подробно', path: `/devices/details/${selectedDeviceId}` },
		{ name: 'Настройки', path: `/devices/settings/${selectedDeviceId}` },
		{ name: 'Регламент', path: `/devices/regulations/${selectedDeviceId}` },
		{ name: 'Замена значений', path: `/devices/replacing/${selectedDeviceId}` },
		{ name: 'Конфигурация', path: `/devices/config/${selectedDeviceId}` },
	]

	return (
		<ul className='flex gap-3 mb-4'>
			{menuItems.map(({ name, path }) => (
				<li key={name} className='p-2 rounded-lg'>
					<NavLink
						to={path}
						className={({ isActive }) =>
							`p-2 rounded-lg ${
								isActive
									? 'bg-blue-500 text-white shadow-md'
									: 'text-black hover:underline'
							}`
						}
					>
						{name}
					</NavLink>
				</li>
			))}
		</ul>
	)
}
