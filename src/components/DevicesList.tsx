/* временно прописанные роли пользователей */

import { AlertTriangle, Check, X } from 'lucide-react'
import { useContext, useState } from 'react'
import { AuthContext } from '../helpers/context/AuthContext'

interface Device {
	id: number
	name: string
	address: string
	connection: 'ok' | 'error' | 'warning'
	sensor: 'ok' | 'error' | 'warning'
	system: 'ok' | 'error' | 'warning'
	tankVolume: number
	soldLiters: number
	filledLiters: number
	remainingLiters: number
	coinsCount?: number
	coinsSum?: number
	billsCount?: number
	billsSum?: number
	totalCash?: number
}

const devices: Device[] = [
	{
		id: 1860,
		name: '№ 111902 (Пробный "Фуни" до 2025-04-30)',
		address: 'вулиця Головна, 1, Київ, Україна, 5...',
		connection: 'error',
		sensor: 'warning',
		system: 'ok',
		tankVolume: 1000,
		soldLiters: 200,
		filledLiters: 300,
		remainingLiters: 800,
		coinsCount: 50,
		coinsSum: 500,
		billsCount: 20,
		billsSum: 2000,
		totalCash: 2500,
	},
	{
		id: 1613,
		name: '№ 111737 (Фуни)',
		address: 'вул Соборности, 123, W111737',
		connection: 'ok',
		sensor: 'ok',
		system: 'ok',
		tankVolume: 34,
		soldLiters: 123,
		filledLiters: 123,
		remainingLiters: 123,
		coinsCount: 30,
		coinsSum: 300,
		billsCount: 10,
		billsSum: 1000,
		totalCash: 1300,
	},
]

const StatusIcon = ({ status }: { status: 'ok' | 'error' | 'warning' }) => {
	const statusColors = {
		ok: 'text-green-500',
		error: 'text-red-500',
		warning: 'text-yellow-500',
	}

	const icons = {
		ok: Check,
		error: X,
		warning: AlertTriangle,
	}

	const Icon = icons[status]
	return <Icon className={statusColors[status]} />
}

const DevicesList = () => {
	const { user } = useContext(AuthContext)!
	const [searchQuery, setSearchQuery] = useState('')

	const filteredDevices = devices.filter(device =>
		device.id.toString().includes(searchQuery)
	)

	const columnsByRole: Record<string, string[]> = {
		'Супер администратор': [
			'id',
			'address',
			'connection',
			'sensor',
			'system',
			'tankVolume',
			'soldLiters',
			'filledLiters',
			'remainingLiters',
		],
		Администратор: [
			'id',
			'address',
			'connection',
			'sensor',
			'system',
			'tankVolume',
			'soldLiters',
			'filledLiters',
			'remainingLiters',
		],
		Оператор: [
			'id',
			'address',
			'connection',
			'sensor',
			'system',
			'tankVolume',
			'soldLiters',
			'filledLiters',
			'remainingLiters',
		],
		Водитель: ['id', 'address', 'tankVolume', 'filledLiters'],
		Техник: ['id', 'address', 'connection', 'sensor', 'system'],
		Инкассатор: [
			'id',
			'address',
			'coinsCount',
			'coinsSum',
			'billsCount',
			'billsSum',
			'totalCash',
		],
	}

	const columns = columnsByRole[user?.role] || []

	const columnTitles: Record<string, string> = {
		id: 'ID',
		address: 'Адрес',
		connection: 'Связь',
		sensor: 'Сенсор',
		system: 'Система',
		tankVolume: 'Объем',
		soldLiters: 'Продано',
		filledLiters: 'Заправка',
		remainingLiters: 'Остаток',
		coinsCount: 'Кол-во монет',
		coinsSum: 'Сумма монет',
		billsCount: 'Кол-во купюр',
		billsSum: 'Сумма купюр',
		totalCash: 'Общая сумма',
	}

	// Функция для вычисления итогов
	const total = (column: string) => {
		return filteredDevices.reduce((sum, device) => {
			const value = device[column as keyof Device]
			return typeof value === 'number' ? sum + value : sum
		}, 0)
	}

	return (
		<div className='p-4 lg:p-8'>
			<div className='flex flex-col lg:flex-row justify-between items-center mb-6 space-y-4 lg:space-y-0'>
				<h1 className='text-xl lg:text-2xl font-semibold'>Список аппаратов</h1>
				<input
					type='text'
					placeholder='Поиск по ID'
					value={searchQuery}
					onChange={e => setSearchQuery(e.target.value)}
					className='border-b border-gray-400 py-1 px-2 text-gray-700 focus:outline-none focus:border-blue-500 w-full sm:w-auto'
				/>
			</div>

			<div className='bg-white rounded-lg shadow p-5'>
				<div className='overflow-x-auto'>
					<table className='min-w-full divide-y divide-gray-200 text-sm'>
						<thead className='bg-gray-50'>
							<tr>
								{columns.map(column => (
									<th
										key={column}
										className='px-4 py-2 text-left font-medium text-gray-500 uppercase tracking-wider'
									>
										{columnTitles[column]}
									</th>
								))}
							</tr>
						</thead>
						<tbody className='bg-white divide-y divide-gray-200'>
							{filteredDevices.map(device => (
								<tr key={device.id} className='hover:bg-gray-50'>
									{columns.map(column => (
										<td key={column} className='px-4 py-2'>
											{column === 'connection' ||
											column === 'sensor' ||
											column === 'system' ? (
												<StatusIcon
													status={
														device[column as keyof Device] as
															| 'ok'
															| 'error'
															| 'warning'
													}
												/>
											) : (
												device[column as keyof Device]
											)}
										</td>
									))}
								</tr>
							))}
						</tbody>
						<tfoot className='bg-gray-100 font-bold'>
							<tr>
								<td className='px-4 py-2'>Сумма</td>
								{columns.slice(1).map(column => (
									<td key={column} className='px-4 py-2'>
										{[
											'tankVolume',
											'soldLiters',
											'filledLiters',
											'remainingLiters',
											'coinsCount',
											'coinsSum',
											'billsCount',
											'billsSum',
											'totalCash',
										].includes(column)
											? total(column)
											: '—'}
									</td>
								))}
							</tr>
						</tfoot>
					</table>
				</div>
			</div>
		</div>
	)
}

export default DevicesList

// import { Check, X } from 'lucide-react'
// import { useState } from 'react'
// import { IPosDevice } from '../api/PosDevices/PosDevicesTypes'
// import { useDevice } from '../helpers/context/DeviceContext'

// const StatusIcon = ({ status }: { status: 'true' | 'false' }) => {
// 	const statusColors = {
// 		true: 'text-green-500',
// 		false: 'text-red-500',
// 	}

// 	const icons = {
// 		true: Check,
// 		false: X,
// 	}

// 	const Icon = icons[status]
// 	return <Icon className={statusColors[status]} />
// }

// // const StatusIcon = ({ status }: { status: 'ok' | 'error' | 'warning' }) => {
// // 	const statusColors = {
// // 		ok: 'text-green-500',
// // 		error: 'text-red-500',
// // 		warning: 'text-yellow-500',
// // 	}

// // 	const icons = {
// // 		ok: Check,
// // 		error: X,
// // 		warning: AlertTriangle,
// // 	}

// // 	const Icon = icons[status]
// // 	return <Icon className={statusColors[status]} />
// // }

// const DevicesList = () => {
// 	const [searchQuery, setSearchQuery] = useState('')
// 	const { devices, error, loading } = useDevice()

// 	const filteredDevices = devices.filter(device =>
// 		device.id.toString().includes(searchQuery)
// 	)

// 	const calculateTotal = (key: keyof IPosDevice) => {
// 		return filteredDevices.reduce((sum, device) => {
// 			const value = device[key]
// 			const numericValue = !isNaN(Number(value)) ? Number(value) : 0
// 			return sum + numericValue
// 		}, 0)
// 	}

// 	return (
// 		<div className='p-4 lg:p-8'>
// 			<div className='flex flex-col lg:flex-row justify-between items-center mb-6 space-y-4 lg:space-y-0'>
// 				<h1 className='text-xl lg:text-2xl font-semibold'>Список аппаратов</h1>
// 				<div className='flex flex-col sm:flex-row space-y-2 sm:space-y-0 sm:space-x-4 w-full sm:w-auto'>
// 					<button className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 text-sm lg:text-base'>
// 						Обновить статистику
// 					</button>
// 					<button className='bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600 text-sm lg:text-base'>
// 						Деактивированные аппараты
// 					</button>
// 				</div>
// 			</div>

// 			<div className='bg-white rounded-lg shadow p-5 max-xl:max-w-2xl max-xl:mx-auto'>
// 				<div className='flex items-center justify-between'>
// 					<h1 className='text-xl lg:text-2xl font-semibold mb-5'>
// 						Список аппаратов
// 					</h1>
// 					<div className='flex justify-between items-center mb-4'>
// 						<span className='text-sm'>Поиск:</span>
// 						<input
// 							type='text'
// 							placeholder='По ID'
// 							value={searchQuery}
// 							onChange={e => setSearchQuery(e.target.value)}
// 							className='border-b border-gray-400 py-1 px-2 text-gray-700 focus:outline-none focus:border-blue-500 w-full sm:w-auto'
// 						/>
// 					</div>
// 				</div>
// 				{loading ? (
// 					<div className='flex justify-center items-center py-6'>
// 						<div className='animate-spin rounded-full h-8 w-8 border-b-2 border-gray-600'></div>
// 					</div>
// 				) : error ? (
// 					<p className='text-center text-red-500 p-4'>{error}</p>
// 				) : (
// 					<div className='overflow-x-auto'>
// 						<table className='min-w-full divide-y divide-gray-200 text-sm'>
// 							<thead className='bg-gray-50'>
// 								<tr>
// 									{[
// 										'ID',
// 										'Аппарат',
// 										'Адрес',
// 										'Связь',
// 										'Сенсор',
// 										'Система',
// 										'Объем резервуара (л)',
// 										'Продано (л)',
// 										'Заправка (л)',
// 										'Остаток (л)',
// 									].map((header, index) => (
// 										<th
// 											key={header}
// 											className={`px-4 py-2  font-medium text-gray-500 tracking-wider ${
// 												index === 0 || index === 1 || index === 2
// 													? 'text-left'
// 													: 'text-center'
// 											} `}
// 										>
// 											{header}
// 										</th>
// 									))}
// 								</tr>
// 							</thead>
// 							<tbody className='bg-white divide-y divide-gray-200'>
// 								{filteredDevices && devices ? (
// 									filteredDevices.map(device => (
// 										<tr key={device.id} className='hover:bg-gray-50'>
// 											<td className='px-4 py-2'>{device.id}</td>
// 											<td className='px-4 py-2'>{device.name}</td>
// 											<td className='px-4 py-2'>{device.address}</td>
// 											<td className='px-4 py-2 text-center'>
// 												<StatusIcon status={device.has_connection} />
// 											</td>
// 											<td className='px-4 py-2 text-center'>
// 												<StatusIcon status={device.sensor_is_ok} />
// 											</td>
// 											<td className='px-4 py-2 text-center'>
// 												<StatusIcon status={device.system_is_ok} />
// 											</td>
// 											<td className='px-4 py-2 text-center'>
// 												{Number(device.tank_size)}
// 											</td>
// 											<td className='px-4 py-2 text-center'>
// 												{Number(device.water_sold_since_last_refill)}
// 											</td>
// 											<td className='px-4 py-2 text-center'>
// 												{Number(device.water_amount_after_last_refill)}
// 											</td>
// 											<td className='px-4 py-2 text-center'>
// 												{device.water_left}
// 											</td>
// 										</tr>
// 									))
// 								) : (
// 									<tr>
// 										<td className='text-gray-400 font-semibold text-lg'>
// 											Устройства не найдены
// 										</td>
// 									</tr>
// 								)}
// 							</tbody>
// 							<tfoot className='bg-gray-100 font-bold text-center'>
// 								<tr>
// 									<td className='px-4 py-2'>Сумма</td>
// 									<td className='px-4 py-2'></td>
// 									<td className='px-4 py-2'></td>
// 									<td className='px-4 py-2'></td>
// 									<td className='px-4 py-2'></td>
// 									<td className='px-4 py-2'></td>
// 									<td className='px-4 py-2'>{calculateTotal('tank_size')}</td>
// 									<td className='px-4 py-2'>
// 										{calculateTotal('water_sold_since_last_refill')}
// 									</td>
// 									<td className='px-4 py-2'>
// 										{calculateTotal('water_amount_after_last_refill')}
// 									</td>
// 									<td className='px-4 py-2'>{calculateTotal('water_left')}</td>
// 								</tr>
// 							</tfoot>
// 						</table>
// 					</div>
// 				)}
// 			</div>
// 		</div>
// 	)
// }

// export default DevicesList
