import { motion } from 'framer-motion'
import { useState } from 'react'
import 'react-datepicker/dist/react-datepicker.css'
import { FiChevronDown, FiChevronUp, FiDownload } from 'react-icons/fi'
import * as XLSX from 'xlsx'

const TABLE_DATA = [
	{ device: '111756', sessions: 20, liters: 400, income: 5000 },
	{ device: '111757', sessions: 25, liters: 600, income: 7000 },
	{ device: '111758', sessions: 18, liters: 500, income: 6200 },
	{ device: '111709', sessions: 30, liters: 800, income: 10000 },
	{ device: '111579', sessions: 15, liters: 300, income: 4000 },
	{ device: '111782', sessions: 22, liters: 450, income: 5500 },
	{ device: '110675', sessions: 27, liters: 700, income: 8500 },
]

const ITEMS_PER_PAGE_OPTIONS = [5, 10, 15]
const TOTAL_RECORDS = 30
const TOTAL_PAGES = 3

const DeviceStatsTableSection = () => {
	const [itemsPerPage, setItemsPerPage] = useState(10)
	const [currentPage, setCurrentPage] = useState(1)
	const [searchQuery, setSearchQuery] = useState('')
	const [sortColumn, setSortColumn] = useState<
		keyof (typeof TABLE_DATA)[0] | null
	>(null)
	const [sortOrder, setSortOrder] = useState<'asc' | 'desc'>('asc')

	const handleSort = (column: keyof (typeof TABLE_DATA)[0]) => {
		if (sortColumn === column) {
			setSortOrder(sortOrder === 'asc' ? 'desc' : 'asc')
		} else {
			setSortColumn(column)
			setSortOrder('asc')
		}
	}

	const sortedData = [...TABLE_DATA].sort((a, b) => {
		if (!sortColumn) return 0
		const valueA = a[sortColumn]
		const valueB = b[sortColumn]

		if (typeof valueA === 'number' && typeof valueB === 'number') {
			return sortOrder === 'asc' ? valueA - valueB : valueB - valueA
		}

		return 0
	})

	const handleExportToExcel = () => {
		const worksheet = XLSX.utils.json_to_sheet(sortedData)
		const workbook = XLSX.utils.book_new()
		XLSX.utils.book_append_sheet(workbook, worksheet, 'Sales Data')
		XLSX.writeFile(workbook, 'sales_data.xlsx')
	}

	return (
		<motion.div
			initial={{ opacity: 0, y: 10 }}
			animate={{ opacity: 1, y: 0 }}
			transition={{ duration: 0.5 }}
			className='bg-white shadow-lg rounded-lg p-6 mt-6'
		>
			{/* Верхняя панель */}
			<div className='flex justify-between items-center mb-4'>
				<div>
					<button
						onClick={handleExportToExcel}
						className='flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 transition'
					>
						<FiDownload size={18} /> Экспорт
					</button>

					{/* Селект количества записей */}
					<div className='relative mt-4'>
						<span>Показать </span>
						<select
							value={itemsPerPage}
							onChange={e => setItemsPerPage(Number(e.target.value))}
							className='appearance-none border-b border-gray-400 pb-1 text-gray-700 focus:outline-none focus:border-blue-500'
						>
							{ITEMS_PER_PAGE_OPTIONS.map(option => (
								<option key={option} value={option}>
									{option}
								</option>
							))}
						</select>
						<span> записей</span>
					</div>
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
			<div className='overflow-x-auto'>
				<table className='w-full border-collapse text-left'>
					<thead>
						<tr className='border-b border-gray-300'>
							{(
								[
									'device',
									'sessions',
									'liters',
									'income',
								] as (keyof (typeof TABLE_DATA)[0])[]
							).map(key => (
								<th
									key={key}
									className='p-3 cursor-pointer'
									onClick={() => handleSort(key)}
								>
									<div className='flex items-center gap-2'>
										{/* Название столбца */}
										{key === 'device'
											? 'Аппарат'
											: key === 'sessions'
											? 'Сеансы'
											: key === 'liters'
											? 'Литры'
											: 'Доход'}

										{/* Стрелки сортировки */}
										<div className='flex flex-col'>
											<FiChevronUp
												size={14}
												className={`transition ${
													sortColumn === key && sortOrder === 'asc'
														? 'text-blue-500'
														: 'text-gray-400'
												}`}
											/>
											<FiChevronDown
												size={14}
												className={`transition ${
													sortColumn === key && sortOrder === 'desc'
														? 'text-blue-500'
														: 'text-gray-400'
												}`}
											/>
										</div>
									</div>
								</th>
							))}
						</tr>
					</thead>
					<tbody>
						{sortedData.map((row, index) => (
							<tr
								key={index}
								className='border-b border-gray-200 hover:bg-gray-100'
							>
								<td className='p-3'>{row.device}</td>
								<td className='p-3'>{row.sessions}</td>
								<td className='p-3'>{row.liters}</td>
								<td className='p-3'>{row.income}</td>
							</tr>
						))}
					</tbody>
				</table>
			</div>

			{/* Нижняя панель с записями и пагинацией */}
			<div className='flex justify-between items-center mt-4'>
				<p className='text-gray-600'>
					Записи с {1} до {itemsPerPage} из {TOTAL_RECORDS} записей
				</p>

				{/* Пагинация */}
				<div className='flex gap-2'>
					<button className='p-2 hover:bg-gray-300 disabled:opacity-50'>
						Первая
					</button>
					<button
						onClick={() => setCurrentPage(currentPage - 1)}
						disabled={currentPage === 1}
						className='p-2 hover:bg-gray-300 disabled:opacity-50'
					>
						Предыдущая
					</button>
					{[...Array(TOTAL_PAGES)].map((_, i) => (
						<button
							key={i}
							onClick={() => setCurrentPage(i + 1)}
							className={`px-3 py-1 rounded-lg ${
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
						disabled={currentPage === TOTAL_PAGES}
						className='p-2 hover:bg-gray-300 disabled:opacity-50'
					>
						Следующая
					</button>
					<button className='p-2 hover:bg-gray-300 disabled:opacity-50'>
						Последняя
					</button>
				</div>
			</div>
		</motion.div>
	)
}

export default DeviceStatsTableSection
