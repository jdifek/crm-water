import { motion } from 'framer-motion'
import { useMemo, useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import { ru } from 'date-fns/locale'

import {
	Bar,
	BarChart,
	CartesianGrid,
	Legend,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from 'recharts'
import LiterStatsTableSection from '../../components/statistics/LiterStatsTableSection'
import { LiterStatsTableData } from '../../types'

const DATA: LiterStatsTableData[] = [
	{ date: '01.01', sessions: 20, liters: 400, container: 1 },
	{ date: '02.01', sessions: 25, liters: 600, container: 1.5 },
	{ date: '03.01', sessions: 18, liters: 500, container: 2 },
	{ date: '04.01', sessions: 30, liters: 900, container: 2.5 },
	{ date: '05.01', sessions: 22, liters: 1100, container: 3 },
	{ date: '06.01', sessions: 28, liters: 750, container: 3.5 },
	{ date: '07.01', sessions: 15, liters: 320, container: 4 },
	{ date: '08.01', sessions: 35, liters: 1200, container: 4.5 },
	{ date: '09.01', sessions: 12, liters: 380, container: 5 },
	{ date: '10.01', sessions: 27, liters: 880, container: 0.5 },
]

const formatDate = (date: Date | null) =>
	date
		? date.toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit' })
		: ''

const LiterStats = () => {
	const [selectedTab, setSelectedTab] = useState<'sessions' | 'liters'>(
		'sessions'
	)
	const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([
		new Date('2024-01-01'),
		new Date('2024-01-10'),
	])

	const [startDate, endDate] = dateRange
	const [selectedDevice, setSelectedDevice] = useState('Усі апарати')

	const filteredData = useMemo(() => {
		const start = formatDate(startDate)
		const end = formatDate(endDate)
		return DATA.filter(({ date }) => date >= start && date <= end)
	}, [startDate, endDate])

	return (
		<div className='p-6 space-y-6'>
			{/* Фильтры */}
			<div className='flex justify-between items-center'>
				<div className='flex items-center gap-2 border-b border-gray-300 pb-2'>
					<DatePicker
						selectsRange
          locale={ru} 

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

			{/* График */}
			<motion.div
				initial={{ opacity: 0, y: 10 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
				className='bg-white shadow-lg rounded-lg p-6'
			>
				{/* Таб переключения */}
				<div className='flex gap-4 mb-6 pb-2'>
					{['sessions', 'liters'].map(tab => (
						<button
							key={tab}
							onClick={() => setSelectedTab(tab as 'sessions' | 'liters')}
							className={`px-4 py-2 ${
								selectedTab === tab
									? 'text-white bg-blue-500 rounded-full shadow-md p-2'
									: 'bg-gray-200 rounded-full shadow-md p-2'
							}`}
						>
							{tab === 'sessions' ? 'Сеансы' : tab === 'liters' && 'Литры'}
						</button>
					))}
				</div>
				{/* График */}
				<div className='h-[400px]'>
					<ResponsiveContainer width='100%' height='100%'>
						<BarChart data={filteredData}>
							<CartesianGrid strokeDasharray='3 3' />
							<XAxis dataKey='container' />
							<YAxis domain={[0, 3000]} />
							<Tooltip />
							<Legend />
							{/* Столбцы графика */}
							<Bar dataKey={selectedTab} fill='#7c3aed' barSize={30} />
						</BarChart>
					</ResponsiveContainer>
				</div>
			</motion.div>

			<LiterStatsTableSection tableData={filteredData} />
		</div>
	)
}

export default LiterStats
