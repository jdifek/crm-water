import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'

interface StatisticsFilterProps {
	startDate: Date | null
	endDate: Date | null
	setDateRange: React.Dispatch<React.SetStateAction<[Date | null, Date | null]>>
}

const StatisticsFilter = ({
	startDate,
	endDate,
	setDateRange,
}: StatisticsFilterProps) => {
	return (
		<div className='bg-white p-5 pb-7 rounded-lg shadow-md mb-4'>
			<h2 className='font-semibold mb-2'>Фильтр</h2>
			<div className='border-b border-gray-300 pb-2 mb-10 w-56'>
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
			<div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-6 gap-2 text-[14px]'>
				<select className='border p-2 rounded w-full'>
					<option>Все торговые точки</option>
				</select>
				<select className='border p-2 rounded w-full'>
					<option>Все типы</option>
				</select>
				<select className='border p-2 rounded w-full'>
					<option>Все товары</option>
				</select>
				<select className='border p-2 rounded w-full'>
					<option>Все типы оплаты</option>
				</select>
				<select className='border p-2 rounded w-full'>
					<option>Все типы покупок</option>
				</select>
				<select className='border p-2 rounded w-full'>
					<option>Все покупатели</option>
				</select>
			</div>
		</div>
	)
}

export default StatisticsFilter
