import { motion } from 'framer-motion'
import { useMemo, useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import {
	Bar,
	BarChart,
	CartesianGrid,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from 'recharts'
import DeviceStatsTableSection from '../../components/statistics/DeviceStatsTableSection'

const DATA = [
	{ date: '01.01', devices: '111756', sessions: 20, liters: 400, income: 5000 },
	{ date: '02.01', devices: '111757', sessions: 25, liters: 600, income: 7000 },
	{ date: '03.01', devices: '111758', sessions: 18, liters: 500, income: 6200 },
	{ date: '04.01', devices: '111709', sessions: 30, liters: 900, income: 9000 },
	{
		date: '05.01',
		devices: '111579',
		sessions: 22,
		liters: 1100,
		income: 8500,
	},
	{ date: '06.01', devices: '111782', sessions: 28, liters: 750, income: 7800 },
	{ date: '07.01', devices: '110675', sessions: 15, liters: 320, income: 4300 },
	{
		date: '08.01',
		devices: '101247',
		sessions: 35,
		liters: 1200,
		income: 10500,
	},
	{ date: '09.01', devices: '101578', sessions: 12, liters: 380, income: 4900 },
	{ date: '10.01', devices: '111443', sessions: 27, liters: 880, income: 9400 },
]

const formatDate = (date: Date | null) =>
	date
		? date.toLocaleDateString('ru-RU', { day: '2-digit', month: '2-digit' })
		: ''

const DeviceStats = () => {
	const [selectedTab, setSelectedTab] = useState<
		'sessions' | 'liters' | 'income'
	>('liters')
	const [dateRange, setDateRange] = useState<[Date | null, Date | null]>([
		new Date('2024-01-01'),
		new Date('2024-01-10'),
	])

	const [startDate, endDate] = dateRange

	const filteredData = useMemo(() => {
		const start = formatDate(startDate)
		const end = formatDate(endDate)
		return DATA.filter(({ date }) => date >= start && date <= end)
	}, [startDate, endDate])

	return (
		<div className='p-6 space-y-6'>
			{/* Фильтры */}
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
						<BarChart data={filteredData} layout='vertical'>
							<CartesianGrid strokeDasharray='3 3' />
							<XAxis type='number' />
							<YAxis dataKey='devices' type='category' width={100} />
							<Tooltip />
							<Bar
								dataKey={selectedTab}
								fill='#7c3aed'
								label={{ position: 'insideRight', fill: 'white' }}
								barSize={30}
							/>
						</BarChart>
					</ResponsiveContainer>
				</div>
			</motion.div>

			<DeviceStatsTableSection />
		</div>
	)
}

export default DeviceStats
