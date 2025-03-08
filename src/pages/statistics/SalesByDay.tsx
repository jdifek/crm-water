import { ru } from 'date-fns/locale'
import { motion } from 'framer-motion'
import { useEffect, useMemo, useState } from 'react'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

import {
	Area,
	AreaChart,
	CartesianGrid,
	ResponsiveContainer,
	Tooltip,
	XAxis,
	YAxis,
} from 'recharts'
import SalesByDayTableSection from '../../components/statistics/SalesByDayTableSection'
import { useDevice } from '../../helpers/context/DeviceContext'
import { CurrentDailyStats } from '../../api/Stats/StatsTypes'
import StatsService from '../../api/Stats/StatsService'
import { formatDateToServer } from '../../helpers/function/formatDateToServer'
import { getDaysDifference } from '../../helpers/function/getDaysDifference'

// const DATA: SalesByDayTableData[] = [
// 	{ date: '01.01', sessions: 20, liters: 400, income: 5000 },
// 	{ date: '02.01', sessions: 25, liters: 600, income: 7000 },
// 	{ date: '03.01', sessions: 18, liters: 500, income: 6200 },
// 	{ date: '04.01', sessions: 30, liters: 900, income: 9000 },
// 	{ date: '05.01', sessions: 22, liters: 1100, income: 8500 },
// 	{ date: '06.01', sessions: 28, liters: 750, income: 7800 },
// 	{ date: '07.01', sessions: 15, liters: 320, income: 4300 },
// 	{ date: '08.01', sessions: 35, liters: 1200, income: 10500 },
// 	{ date: '09.01', sessions: 12, liters: 380, income: 4900 },
// 	{ date: '10.01', sessions: 27, liters: 880, income: 9400 },
// 	{ date: '11.01', sessions: 21, liters: 670, income: 7300 },
// 	{ date: '12.01', sessions: 30, liters: 900, income: 11500 },
// 	{ date: '13.01', sessions: 14, liters: 400, income: 5200 },
// 	{ date: '14.01', sessions: 25, liters: 980, income: 9200 },
// 	{ date: '15.01', sessions: 33, liters: 1400, income: 13500 },
// 	{ date: '16.01', sessions: 19, liters: 550, income: 6900 },
// 	{ date: '17.01', sessions: 29, liters: 1100, income: 10700 },
// 	{ date: '18.01', sessions: 31, liters: 1300, income: 12400 },
// 	{ date: '19.01', sessions: 22, liters: 670, income: 7500 },
// 	{ date: '20.01', sessions: 26, liters: 820, income: 8900 },
// 	{ date: '21.01', sessions: 18, liters: 490, income: 6000 },
// 	{ date: '22.01', sessions: 35, liters: 1400, income: 14000 },
// 	{ date: '23.01', sessions: 17, liters: 430, income: 5800 },
// 	{ date: '24.01', sessions: 28, liters: 900, income: 10000 },
// 	{ date: '25.01', sessions: 15, liters: 380, income: 5100 },
// 	{ date: '26.01', sessions: 30, liters: 1250, income: 12300 },
// 	{ date: '27.01', sessions: 21, liters: 710, income: 7700 },
// 	{ date: '28.01', sessions: 37, liters: 1500, income: 14500 },
// 	{ date: '29.01', sessions: 23, liters: 620, income: 7200 },
// 	{ date: '30.01', sessions: 19, liters: 510, income: 6500 },
// 	{ date: '31.01', sessions: 40, liters: 1450, income: 15000 },
// ]

const TABS = [
	{ key: 'sessions', label: 'Сеансы' },
	{ key: 'liters', label: 'Литры' },
	{ key: 'income', label: 'Доход' },
] as const

const tabToKey = {
	Сеансы: 'sessions',
	Литры: 'liters',
	Доход: 'income',
} as const

const keyToLabel = {
	sessions: 'Сеансы',
	liters: 'Литры',
	income: 'Доход',
} as const

const SalesByDay = () => {
	const [selectedTab, setSelectedTab] = useState<'Сеансы' | 'Литры' | 'Доход'>(
		'Литры'
	)
	const [dateRange, setDateRange] = useState<[Date | null, Date | null]>(() => {
		const endDate = new Date()
		const startDate = new Date()
		startDate.setDate(startDate.getDate() - 30)
		return [startDate, endDate]
	})
	const [startDate, endDate] = dateRange
	const [selectedDeviceId, setSelectedDeviceId] = useState<number | null>(null)
	const [salesByDayStats, setSalesByDayStats] = useState<CurrentDailyStats[]>(
		[]
	)
	const [loading, setLoading] = useState(false)
	const [error, setError] = useState<string | null>(null)
	const { devices } = useDevice()

	useEffect(() => {
		const fetchSalesByDayStats = async () => {
			setLoading(true)
			setError(null)
			try {
				const dateSt = formatDateToServer(startDate)
				const dateFn = formatDateToServer(endDate)
				const limit = getDaysDifference(startDate, endDate)
				if (dateSt) {
					console.log('Request params:', {
						date_st: dateSt,
						date_fn: dateFn,
						device_id: selectedDeviceId,
						limit: limit,
					})
					const response = await StatsService.currentDaily(
						dateSt,
						dateFn || undefined,
						selectedDeviceId || undefined,
						limit
					)
					setSalesByDayStats(response.data.results)
					console.log('Hourly stats fetched:', response.data.results)
					if (response.data.results.length === 0) {
						setError('Нет данных за указанный период')
					}
				}
			} catch (err) {
				console.error('Error fetching hourly stats:', err)
				setError('Ошибка при загрузке данных')
				setSalesByDayStats([])
			} finally {
				setLoading(false)
			}
		}

		fetchSalesByDayStats()
	}, [startDate, endDate, selectedDeviceId])

	const filteredData = useMemo(() => {
		return salesByDayStats.map(item => ({
			date: item.when.split('T')[0]?.substring(5) || item.when,
			sessions: item.sessions,
			liters: Number(item.litres),
			income: Number(item.income),
		}))
	}, [salesByDayStats])

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
					value={selectedDeviceId === null ? 'Усі апарати' : selectedDeviceId}
					onChange={e =>
						setSelectedDeviceId(
							e.target.value === 'Усі апарати' ? null : Number(e.target.value)
						)
					}
					className='border border-gray-300 rounded-lg w-48 py-2 pl-2 pr-4 outline-none text-gray-700'
				>
					<option value='Усі апарати'>Усі апарати</option>
					{devices.map(device => (
						<option key={device.id} value={device.id}>
							{device.name}
						</option>
					))}
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
					{TABS.map(({ key, label }) => (
						<button
							key={key}
							onClick={() =>
								setSelectedTab(label as 'Сеансы' | 'Литры' | 'Доход')
							}
							className={`px-4 py-2 ${
								selectedTab === label
									? 'text-white bg-blue-500 rounded-full shadow-md p-2'
									: 'bg-gray-200 rounded-full shadow-md p-2'
							}`}
						>
							{label}
						</button>
					))}
				</div>

				{/* График */}
				{loading ? (
					<div className='flex justify-center items-center h-[400px]'>
						<div className='animate-spin rounded-full h-8 w-8 border-b-2 border-gray-600'></div>
						<p className='ml-2'>Загрузка...</p>
					</div>
				) : error && filteredData.length === 0 ? (
					<p className='text-center text-red-500 p-4'>{error}</p>
				) : (
					<div className='h-[400px] bg-white shadow-lg rounded-lg p-6'>
						<ResponsiveContainer width='100%' height='100%'>
							<AreaChart data={filteredData}>
								<defs>
									<linearGradient id='colorUv' x1='0' y1='0' x2='0' y2='1'>
										<stop offset='5%' stopColor='#7c3aed' stopOpacity={0.4} />
										<stop offset='95%' stopColor='#7c3aed' stopOpacity={0} />
									</linearGradient>
								</defs>
								<CartesianGrid strokeDasharray='3 3' />
								<XAxis dataKey='date' />
								<YAxis domain={[0, 1500]} />
								<Tooltip
									formatter={value => [
										`${value}`,
										keyToLabel[tabToKey[selectedTab]],
									]}
								/>
								<Area
									type='monotone'
									dataKey={tabToKey[selectedTab]}
									name={selectedTab}
									stroke='#7c3aed'
									strokeWidth={4}
									fill='url(#colorUv)'
									fillOpacity={1}
								/>
							</AreaChart>
						</ResponsiveContainer>
					</div>
				)}
			</motion.div>

			<SalesByDayTableSection tableData={filteredData} />
		</div>
	)
}

export default SalesByDay
