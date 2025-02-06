import { useState } from 'react'
import StatisticsFilter from '../../components/statistics/StatisticsFilter'
import StatisticsTable from '../../components/statistics/StatisticsTable'
import { SaleTableData } from '../../types'

const SALES_DATA: SaleTableData[] = [
	{
		id: '32628883',
		date: '2025-01-29 22:39:20',
		cost: 83.5,
		issued: 39.1,
		ordered: 73.5,
		product: 'Питьевая вода',
		payment: 'Наличные',
		store: '№111732',
	},
	{
		id: '32628810',
		date: '2025-01-28 22:32:58',
		cost: 14.5,
		issued: 14.5,
		ordered: 14.5,
		product: 'Питьевая вода',
		payment: 'Банковская карта',
		store: '№111733',
	},
	{
		id: '32628811',
		date: '2025-01-27 21:10:45',
		cost: 27.0,
		issued: 25.0,
		ordered: 27.0,
		product: 'Минеральная вода',
		payment: 'Наличные',
		store: '№111734',
	},
	{
		id: '32628812',
		date: '2025-01-26 20:55:30',
		cost: 56.3,
		issued: 50.0,
		ordered: 55.5,
		product: 'Газированная вода',
		payment: 'Кредитная карта',
		store: '№111735',
	},
	{
		id: '32628813',
		date: '2025-01-25 19:48:12',
		cost: 19.9,
		issued: 18.0,
		ordered: 19.9,
		product: 'Питьевая вода',
		payment: 'Наличные',
		store: '№111736',
	},
	{
		id: '32628814',
		date: '2025-01-24 18:35:25',
		cost: 45.2,
		issued: 40.0,
		ordered: 45.0,
		product: 'Газированная вода',
		payment: 'Перевод',
		store: '№111737',
	},
	{
		id: '32628815',
		date: '2025-01-23 17:29:50',
		cost: 38.7,
		issued: 36.5,
		ordered: 38.7,
		product: 'Питьевая вода',
		payment: 'Наличные',
		store: '№111738',
	},
	{
		id: '32628816',
		date: '2025-01-22 16:20:33',
		cost: 61.4,
		issued: 60.0,
		ordered: 61.4,
		product: 'Минеральная вода',
		payment: 'Кредитная карта',
		store: '№111739',
	},
	{
		id: '32628817',
		date: '2025-01-21 15:10:15',
		cost: 22.5,
		issued: 20.5,
		ordered: 22.5,
		product: 'Газированная вода',
		payment: 'Банковская карта',
		store: '№111740',
	},
	{
		id: '32628818',
		date: '2025-01-20 14:05:00',
		cost: 31.8,
		issued: 30.0,
		ordered: 31.8,
		product: 'Питьевая вода',
		payment: 'Наличные',
		store: '№111741',
	},
]

const ITEMS_PER_PAGE_OPTIONS = [3, 5, 10]

const SalesPage = () => {
	const [itemsPerPage, setItemsPerPage] = useState(3)
	const [currentPage, setCurrentPage] = useState(1)
	const [searchQuery, setSearchQuery] = useState('')
	const [sortState, setSortState] = useState<{
		column: string | null
		order: 'asc' | 'desc' | null
	}>({ column: null, order: null })
	const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([
		new Date('2025-01-20'),
		new Date('2025-01-29'),
	])
	const [startDate, endDate] = dateRange

	const filteredByDate = SALES_DATA.filter(item => {
		const itemDate = new Date(item.date)
		if (startDate && endDate) {
			return itemDate >= startDate && itemDate <= endDate
		}
		return true
	})

	const filteredData = filteredByDate.filter(item =>
		Object.values(item).some(value =>
			value.toString().toLowerCase().includes(searchQuery.toLowerCase())
		)
	)

	const sortedData = sortState.column
		? [...filteredData].sort((a, b) => {
				const valueA = a[sortState.column as keyof typeof a]
				const valueB = b[sortState.column as keyof typeof a]

				if (typeof valueA === 'number' && typeof valueB === 'number') {
					return sortState.order === 'asc' ? valueA - valueB : valueB - valueA
				} else if (typeof valueA === 'string' && typeof valueB === 'string') {
					return sortState.order === 'asc'
						? valueA.localeCompare(valueB)
						: valueB.localeCompare(valueA)
				}
				return 0
		  })
		: filteredData

	const totalPages = Math.ceil(sortedData.length / itemsPerPage)
	const paginatedData = sortedData.slice(
		(currentPage - 1) * itemsPerPage,
		currentPage * itemsPerPage
	)

	const totalCost = filteredData.reduce((sum, item) => sum + item.cost, 0)
	const totalIssued = filteredData.reduce((sum, item) => sum + item.issued, 0)
	const totalOrdered = filteredData.reduce((sum, item) => sum + item.ordered, 0)

	return (
		<div className='p-4 bg-gray-100 min-h-screen'>
			{/* Фильтры */}
			<StatisticsFilter
				startDate={startDate}
				endDate={endDate}
				setDateRange={setDateRange}
			/>

			{/* Таблица */}
			<div className='bg-white p-4 rounded-lg shadow-md'>
				{/* Верхний блок с селектом и поиском */}
				<div className='flex justify-between items-center mb-3'>
					<div>
						<span>Показать </span>
						<select
							value={itemsPerPage}
							onChange={e => setItemsPerPage(Number(e.target.value))}
							className='border-b appearance-none border-gray-400 pb-1 text-gray-700 focus:outline-none focus:border-blue-500'
						>
							{ITEMS_PER_PAGE_OPTIONS.map(option => (
								<option key={option} value={option}>
									{option}
								</option>
							))}
						</select>
						<span> записей</span>
					</div>
					<input
						type='text'
						placeholder='Поиск...'
						value={searchQuery}
						onChange={e => setSearchQuery(e.target.value)}
						className='border-b border-gray-400 py-1 text-gray-700 focus:outline-none focus:border-blue-500'
					/>
				</div>

				{/* Таблица */}
				<StatisticsTable
					paginatedData={paginatedData}
					totalCost={totalCost}
					totalIssued={totalIssued}
					totalOrdered={totalOrdered}
					data={SALES_DATA}
					sortState={sortState}
					setSortState={setSortState}
				/>

				{/* Пагинация */}
				<div className='flex justify-end gap-2'>
					<button
						onClick={() => setCurrentPage(1)}
						disabled={currentPage === 1}
						className='p-2 hover:bg-gray-300 disabled:opacity-50'
					>
						Первая
					</button>
					<button
						onClick={() => setCurrentPage(currentPage - 1)}
						disabled={currentPage === 1}
						className='p-2 hover:bg-gray-300 disabled:opacity-50'
					>
						Предыдущая
					</button>
					{[...Array(totalPages)].map((_, i) => (
						<button
							key={i}
							onClick={() => setCurrentPage(i + 1)}
							className={`px-4 py-1 rounded-full text-[12px] ${
								currentPage === i + 1
									? 'bg-blue-500 text-white'
									: 'bg-gray-200 hover:bg-gray-300'
							}`}
						>
							{i + 1}
						</button>
					))}
					<button
						onClick={() => setCurrentPage(currentPage + 1)}
						disabled={currentPage === totalPages}
						className='p-2 hover:bg-gray-300 disabled:opacity-50'
					>
						Следующая
					</button>
					<button
						onClick={() => setCurrentPage(totalPages)}
						disabled={currentPage === totalPages}
						className='p-2 hover:bg-gray-300 disabled:opacity-50'
					>
						Последняя
					</button>
				</div>
			</div>
		</div>
	)
}

export default SalesPage
