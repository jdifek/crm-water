import { motion } from 'framer-motion'
import { useState } from 'react'
import 'react-datepicker/dist/react-datepicker.css'
import { FiChevronDown, FiChevronUp, FiDownload } from 'react-icons/fi'
import * as XLSX from 'xlsx'
import { DailyStatsTableData } from '../../types'

const TABLE_DATA: DailyStatsTableData[] = [
	{ time: '10:00', sessions: 20, liters: 400, income: 5000 },
	{ time: '11:00', sessions: 25, liters: 600, income: 7000 },
	{ time: '12:00', sessions: 18, liters: 500, income: 6200 },
	{ time: '13:00', sessions: 30, liters: 800, income: 10000 },
	{ time: '14:00', sessions: 15, liters: 300, income: 4000 },
	{ time: '15:00', sessions: 22, liters: 450, income: 5500 },
	{ time: '16:00', sessions: 27, liters: 700, income: 8500 },
	{ time: '17:00', sessions: 21, liters: 400, income: 7500 },
	{ time: '18:00', sessions: 17, liters: 350, income: 7000 },
	{ time: '19:00', sessions: 15, liters: 320, income: 6500 },
	{ time: '20:00', sessions: 10, liters: 250, income: 5000 },
	{ time: '21:00', sessions: 5, liters: 150, income: 3000 },
	{ time: '22:00', sessions: 1, liters: 70, income: 1000 },
	{ time: '23:00', sessions: 1, liters: 70, income: 1000 },
]

const DailyStatsTableSection = () => {
	const [sortState, setSortState] = useState<{
		column: string | null
		order: 'asc' | 'desc' | null
	}>({ column: null, order: null })

	const handleSort = (column: keyof (typeof TABLE_DATA)[0]) => {
		setSortState(prev => ({
			column,
			order: prev.column === column && prev.order === 'asc' ? 'desc' : 'asc',
		}))
	}

	const sortedData = sortState.column
		? [...TABLE_DATA].sort((a, b) => {
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
		: TABLE_DATA

	const totalSessions = TABLE_DATA.reduce((sum, item) => sum + item.sessions, 0)
	const totalLiters = TABLE_DATA.reduce((sum, item) => sum + item.liters, 0)
	const totalIncome = TABLE_DATA.reduce((sum, item) => sum + item.income, 0)

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
						<tr className='font-medium text-lg'>
							<td></td>
							<td className='p-3'>{totalSessions.toFixed(1)}</td>
							<td className='p-3'>{totalLiters.toFixed(1)} л</td>
							<td className='p-3'>{totalIncome.toFixed(1)} (₴)</td>
							<td></td>
							<td></td>
							<td></td>
						</tr>
						<tr>
							{['time', 'sessions', 'liters', 'income'].map(key => (
								<th
									key={key}
									className='p-3 cursor-pointer'
									onClick={() =>
										handleSort(key as keyof (typeof TABLE_DATA)[0])
									}
								>
									<div className='flex items-center gap-2 text-base font-medium'>
										{key === 'time'
											? 'Время'
											: key === 'sessions'
											? 'Сеансы'
											: key === 'liters'
											? 'Литров'
											: key === 'income' && 'Доход'}
										<div className='flex flex-col'>
											<FiChevronUp
												size={14}
												className={
													sortState.column === key && sortState.order === 'asc'
														? 'text-blue-500'
														: 'text-gray-400'
												}
											/>
											<FiChevronDown
												size={14}
												className={
													sortState.column === key && sortState.order === 'desc'
														? 'text-blue-500'
														: 'text-gray-400'
												}
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
								className='border-b border-gray-200 hover:bg-gray-100 text-[14px]'
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
		</motion.div>
	)
}

export default DailyStatsTableSection
