import { motion } from 'framer-motion'
import { useState } from 'react'
import 'react-datepicker/dist/react-datepicker.css'
import { AiOutlineDown, AiOutlineUp } from 'react-icons/ai'
import { FiDownload } from 'react-icons/fi'
import * as XLSX from 'xlsx'
import { DailyStatsSortDirection, DailyStatsTableData } from '../../types'

const TABLE_DATA: DailyStatsTableData[] = [
	{ time: '10:00', sessions: 20, liters: 400, income: 5000 },
	{ time: '11:00', sessions: 25, liters: 600, income: 7000 },
	{ time: '12:00', sessions: 18, liters: 500, income: 6200 },
	{ time: '13:00', sessions: 30, liters: 800, income: 10000 },
	{ time: '14:00', sessions: 15, liters: 300, income: 4000 },
	{ time: '15:00', sessions: 22, liters: 450, income: 5500 },
	{ time: '16:00', sessions: 27, liters: 700, income: 8500 },
]

const TOTAL_RECORDS = 30
const TOTAL_PAGES = 3

const DailyStatsTableSection = () => {
	const [itemsPerPage, setItemsPerPage] = useState(10)
	const [currentPage, setCurrentPage] = useState(1)
	const [sortColumn, setSortColumn] =
		useState<keyof DailyStatsTableData>('time')
	const [sortDirection, setSortDirection] =
		useState<DailyStatsSortDirection>('asc')

	const handleSort = (column: keyof DailyStatsTableData) => {
		const direction = sortDirection === 'asc' ? 'desc' : 'asc'
		setSortDirection(direction)
		setSortColumn(column)
	}

	const sortedData = [...TABLE_DATA].sort((a, b) => {
		if (a[sortColumn] < b[sortColumn]) {
			return sortDirection === 'asc' ? -1 : 1
		}
		if (a[sortColumn] > b[sortColumn]) {
			return sortDirection === 'asc' ? 1 : -1
		}
		return 0
	})

	const handleExportToExcel = () => {
		const worksheet = XLSX.utils.json_to_sheet(TABLE_DATA)
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
			<div className='flex items-center mb-8'>
				<button
					onClick={handleExportToExcel}
					className='flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 transition'
				>
					<FiDownload size={18} /> Экспорт
				</button>
			</div>

			{/* Таблица */}
			<div className='overflow-x-auto'>
				<table className='w-full border-collapse text-left'>
					<thead>
						<tr>
							<th
								onClick={() => handleSort('time')}
								className='cursor-pointer flex items-center gap-1'
							>
								Время{' '}
								{sortColumn === 'time' &&
									(sortDirection === 'asc' ? (
										<AiOutlineUp size={12} />
									) : (
										<AiOutlineDown size={12} />
									))}
							</th>
							<th
								onClick={() => handleSort('sessions')}
								className='cursor-pointer'
							>
								Сеансы{' '}
								{sortColumn === 'sessions' &&
									(sortDirection === 'asc' ? (
										<AiOutlineUp size={12} />
									) : (
										<AiOutlineDown size={12} />
									))}
							</th>
							<th
								onClick={() => handleSort('liters')}
								className='cursor-pointer'
							>
								Питьевая вода (л){' '}
								{sortColumn === 'liters' &&
									(sortDirection === 'asc' ? (
										<AiOutlineUp size={12} />
									) : (
										<AiOutlineDown size={12} />
									))}
							</th>
							<th
								onClick={() => handleSort('income')}
								className='cursor-pointer'
							>
								Питьевая вода (₴){' '}
								{sortColumn === 'income' &&
									(sortDirection === 'asc' ? (
										<AiOutlineUp size={12} />
									) : (
										<AiOutlineDown size={12} />
									))}
							</th>
						</tr>
					</thead>
					<tbody>
						{sortedData.slice(0, itemsPerPage).map((row, index) => (
							<tr
								key={index}
								className='border-b border-gray-200 hover:bg-gray-100'
							>
								<td className='p-3'>
									<span>{row.time}</span>
								</td>
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

export default DailyStatsTableSection
