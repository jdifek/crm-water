import { motion } from 'framer-motion'
import { useMemo, useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
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
import DailyStatsTableSection from '../../components/statistics/DailyStatsTableSection'

const DATA = [
	{ date: '01.01', sessions: 20, liters: 400, income: 5000 },
	{ date: '02.01', sessions: 25, liters: 600, income: 7000 },
	{ date: '03.01', sessions: 18, liters: 500, income: 6200 },
	{ date: '04.01', sessions: 30, liters: 900, income: 9000 },
	{ date: '05.01', sessions: 22, liters: 1100, income: 8500 },
	{ date: '06.01', sessions: 28, liters: 750, income: 7800 },
	{ date: '07.01', sessions: 15, liters: 320, income: 4300 },
	{ date: '08.01', sessions: 35, liters: 1200, income: 10500 },
	{ date: '09.01', sessions: 12, liters: 380, income: 4900 },
	{ date: '10.01', sessions: 27, liters: 880, income: 9400 },
	{ date: '11.01', sessions: 21, liters: 670, income: 7300 },
	{ date: '12.01', sessions: 30, liters: 900, income: 11500 },
	{ date: '13.01', sessions: 14, liters: 400, income: 5200 },
	{ date: '14.01', sessions: 25, liters: 980, income: 9200 },
	{ date: '15.01', sessions: 33, liters: 1400, income: 13500 },
	{ date: '16.01', sessions: 19, liters: 550, income: 6900 },
	{ date: '17.01', sessions: 29, liters: 1100, income: 10700 },
	{ date: '18.01', sessions: 31, liters: 1300, income: 12400 },
	{ date: '19.01', sessions: 22, liters: 670, income: 7500 },
	{ date: '20.01', sessions: 26, liters: 820, income: 8900 },
	{ date: '21.01', sessions: 18, liters: 490, income: 6000 },
	{ date: '22.01', sessions: 35, liters: 1400, income: 14000 },
	{ date: '23.01', sessions: 17, liters: 430, income: 5800 },
	{ date: '24.01', sessions: 28, liters: 900, income: 10000 },
	{ date: '25.01', sessions: 15, liters: 380, income: 5100 },
	{ date: '26.01', sessions: 30, liters: 1250, income: 12300 },
	{ date: '27.01', sessions: 21, liters: 710, income: 7700 },
	{ date: '28.01', sessions: 37, liters: 1500, income: 14500 },
	{ date: '29.01', sessions: 23, liters: 620, income: 7200 },
	{ date: '30.01', sessions: 19, liters: 510, income: 6500 },
	{ date: '31.01', sessions: 40, liters: 1450, income: 15000 },
]

const formatDate = (date: Date | null) =>
	date
		? date.toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit' })
		: ''

const DailyStats = () => {
	const [selectedTab, setSelectedTab] = useState<
		'sessions' | 'liters' | 'income'
	>('liters')
	const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([
		new Date('2024-01-01'),
		new Date('2024-01-31'),
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
					{['sessions', 'liters', 'income'].map(tab => (
						<button
							key={tab}
							onClick={() =>
								setSelectedTab(tab as 'sessions' | 'liters' | 'income')
							}
							className={`px-4 py-2 ${
								selectedTab === tab
									? 'text-white bg-blue-500 rounded-full shadow-md p-2'
									: 'bg-gray-200 rounded-full shadow-md p-2'
							}`}
						>
							{tab === 'sessions'
								? 'Сеансы'
								: tab === 'liters'
								? 'Литры'
								: 'Доход'}
						</button>
					))}
				</div>
				{/* График */}
				<div className='h-[400px]'>
					<ResponsiveContainer width='100%' height='100%'>
						<BarChart data={filteredData}>
							<CartesianGrid strokeDasharray='3 3' />
							<XAxis dataKey='date' />
							<YAxis domain={[0, 4000]} />
							<Tooltip />
							<Legend />
							{/* Столбцы графика */}
							<Bar dataKey='liters' fill='#7c3aed' barSize={30} />
						</BarChart>
					</ResponsiveContainer>
				</div>
			</motion.div>

			<DailyStatsTableSection />
		</div>
	)
}

export default DailyStats
