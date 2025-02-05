import { useMemo, useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import CollectionTableSection from '../../components/statistics/CollectionTableSection'
import { CollectionTableData } from '../../types'

const TABLE_DATA: CollectionTableData[] = [
	{
		id: 1,
		date: '01.01',
		device: '111756',
		type: 'Купюры',
		collector: 'Иванов',
		quantity: 120,
		amount: 120000,
	},
	{
		id: 2,
		date: '02.01',
		device: '111757',
		type: 'Монеты',
		collector: 'Петров',
		quantity: 300,
		amount: 15000,
	},
	{
		id: 3,
		date: '03.01',
		device: '111758',
		type: 'Купюры',
		collector: 'Сидоров',
		quantity: 90,
		amount: 90000,
	},
	{
		id: 4,
		date: '04.01',
		device: '111709',
		type: 'Монеты',
		collector: 'Иванов',
		quantity: 500,
		amount: 25000,
	},
	{
		id: 5,
		date: '05.01',
		device: '111579',
		type: 'Купюры',
		collector: 'Петров',
		quantity: 200,
		amount: 200000,
	},
	{
		id: 6,
		date: '06.01',
		device: '111782',
		type: 'Монеты',
		collector: 'Сидоров',
		quantity: 400,
		amount: 20000,
	},
	{
		id: 7,
		date: '07.01',
		device: '110675',
		type: 'Купюры',
		collector: 'Иванов',
		quantity: 150,
		amount: 150000,
	},
	{
		id: 8,
		date: '08.01',
		device: '110645',
		type: 'Монеты',
		collector: 'Петров',
		quantity: 250,
		amount: 12500,
	},
	{
		id: 9,
		date: '09.01',
		device: '109736',
		type: 'Купюры',
		collector: 'Сидоров',
		quantity: 180,
		amount: 180000,
	},
	{
		id: 10,
		date: '07.01',
		device: '113848',
		type: 'Монеты',
		collector: 'Иванов',
		quantity: 350,
		amount: 17500,
	},
]

const formatDate = (date: Date | null) =>
	date
		? date.toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit' })
		: ''

const Collection = () => {
	const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([
		new Date('2024-01-01'),
		new Date('2024-01-10'),
	])
	const [selectedDevice, setSelectedDevice] = useState('Усі апарати')

	const [startDate, endDate] = dateRange

	const filteredData = useMemo(() => {
		const start = formatDate(startDate)
		const end = formatDate(endDate)
		return TABLE_DATA.filter(({ date }) => date >= start && date <= end)
	}, [startDate, endDate])

	console.log(filteredData)

	return (
		<div className='p-6 space-y-6'>
			{/* Фильтры */}
			<div className='flex justify-between items-center'>
				<div className='flex items-center gap-2 border-b border-gray-300 pb-2'>
					<DatePicker
						selectsRange
						startDate={startDate}
						endDate={endDate}
						onChange={update =>
							setDateRange(update as [Date | null, Date | null])
						}
						isClearable
						className='px-2 py-1 text-gray-700 bg-transparent w-56 outline-none focus:ring-0 focus:border-transparent'
					/>
				</div>

				<select
					value={selectedDevice}
					onChange={e => setSelectedDevice(e.target.value)}
					className='border border-gray-300 rounded-lg w-48 py-2 pl-2 pr-4 outline-none text-gray-700'
				>
					<option>Усі апарати</option>
					<option>Апарат 1</option>
					<option>Апарат 2</option>
				</select>
			</div>

			<CollectionTableSection tableData={filteredData} />
		</div>
	)
}

export default Collection
