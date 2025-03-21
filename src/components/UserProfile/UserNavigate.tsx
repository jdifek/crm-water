import { NavLink } from 'react-router-dom'

const UserNavigate = () => {
	const menuItems = [
		{ name: 'Профіль', path: '#' },
		{ name: 'Активність', path: '#' },
		{ name: 'Редагувати', path: '#' },
	]

	return (
		<ul className='flex flex-wrap gap-2 mb-8'>
			{menuItems.map(({ name, path }) => (
				<li key={name} className='p-2 rounded-lg text-sm md:text-base'>
					<NavLink
						to={path}
						className={({ isActive }) =>
							`px-4 py-2 rounded-full uppercase text-sm ${
								isActive
									? 'text-white bg-blue-500 rounded-full shadow-md p-2'
									: 'bg-gray-200 rounded-full shadow-md p-2'
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

export default UserNavigate
