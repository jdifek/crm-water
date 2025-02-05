import { motion } from 'framer-motion'
import 'react-datepicker/dist/react-datepicker.css'
import { FiDownload } from 'react-icons/fi'
import * as XLSX from 'xlsx'

const data = [
	{
		id: '123',
		location: 'вул.Головна,49а, №123',
		serial: '123123',
		rows: [
			{
				type: 'Готівка',
				january: '12 123,12',
				february: '0,00',
				march: '0,00',
				april: '0,00',
				may: '0,00',
				june: '0,00',
				july: '0,00',
				august: '0,00',
				september: '0,00',
				october: '0,00',
				november: '0,00',
				december: '0,00',
				total: '2,50',
			},
			{
				type: 'Безготівка',
				january: '4 415,50',
				february: '0,00',
				march: '0,00',
				april: '0,00',
				may: '0,00',
				june: '0,00',
				july: '0,00',
				august: '0,00',
				september: '0,00',
				october: '0,00',
				november: '0,00',
				december: '0,00',
				total: '4 415,50',
			},
			{
				type: 'Дохід',
				january: '123 123,00',
				february: '0,00',
				march: '0,00',
				april: '0,00',
				may: '0,00',
				june: '0,00',
				july: '0,00',
				august: '0,00',
				september: '0,00',
				october: '0,00',
				november: '0,00',
				december: '0,00',
				total: '8,00',
			},
		],
	},
	{
		id: '',
		location: 'Загальна сума за місяць',
		serial: '',
		rows: [
			{
				type: 'Готівка',
				january: '123 123,00',
				february: '0,00',
				march: '0,00',
				april: '0,00',
				may: '0,00',
				june: '0,00',
				july: '0,00',
				august: '0,00',
				september: '0,00',
				october: '0,00',
				november: '0,00',
				december: '0,00',
				total: '337,00',
			},
			{
				type: 'Безготівка',
				january: '12 123,12',
				february: '0,00',
				march: '0,00',
				april: '0,00',
				may: '0,00',
				june: '0,00',
				july: '0,00',
				august: '0,00',
				september: '0,00',
				october: '0,00',
				november: '0,00',
				december: '0,00',
				total: '25,00',
			},
			{
				type: 'Дохід',
				january: '321 321,32',
				february: '0,00',
				march: '0,00',
				april: '0,00',
				may: '0,00',
				june: '0,00',
				july: '0,00',
				august: '0,00',
				september: '0,00',
				october: '0,00',
				november: '0,00',
				december: '0,00',
				total: '762,00',
			},
		],
	},
]

const YearlyReport = () => {
	const handleExportToExcel = () => {
		const flatData = data.flatMap(item =>
			item.rows.map(row => ({
				ID: item.id,
				'Торгова точка': item.location,
				'Серійний номер': item.serial,
				Тип: row.type,
				Январь: row.january,
				Февраль: row.february,
				Март: row.march,
				Апрель: row.april,
				Май: row.may,
				Июнь: row.june,
				Июль: row.july,
				Август: row.august,
				Сентябрь: row.september,
				Октябрь: row.october,
				Ноябрь: row.november,
				Декабрь: row.december,
				Сумма: row.total,
			}))
		)

		const ws = XLSX.utils.json_to_sheet(flatData)
		const wb = XLSX.utils.book_new()
		XLSX.utils.book_append_sheet(wb, ws, 'Data')
		XLSX.writeFile(wb, 'table-data.xlsx')
	}

	return (
		<div className='p-6 space-y-6'>
			{/* Фильтры */}
			<div className='flex justify-between items-center'>
				<div className='flex items-center gap-2 border-b border-gray-300 pb-2'>
					<select className='border px-2 py-1 rounded-md text-gray-700'>
						<option value=''>Выберите год</option>
						<option value='2023'>2023</option>
						<option value='2024'>2024</option>
						<option value='2025'>2025</option>
					</select>
				</div>

				<button
					onClick={handleExportToExcel}
					className='flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 transition'
				>
					<FiDownload size={18} /> Экспорт
				</button>
			</div>

			{/* Таблица */}
			<motion.div
				initial={{ opacity: 0, y: 10 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
				className='bg-white shadow-lg rounded-lg p-6 overflow-x-auto'
			>
				<table className='min-w-full'>
					<thead>
						<tr className='bg-gray-100'>
							<th className='border px-4 py-2 text-left'>ID</th>
							<th className='border px-4 py-2 text-left'>Торгова точка</th>
							<th className='border px-4 py-2 text-left'>Серійний номер</th>
							<th className='border px-4 py-2 text-left'></th>
							<th className='border px-4 py-2'>Январь</th>
							<th className='border px-4 py-2'>Февраль</th>
							<th className='border px-4 py-2'>Март</th>
							<th className='border px-4 py-2'>Апрель</th>
							<th className='border px-4 py-2'>Май</th>
							<th className='border px-4 py-2'>Июнь</th>
							<th className='border px-4 py-2'>Июль</th>
							<th className='border px-4 py-2'>Август</th>
							<th className='border px-4 py-2'>Сентябрь</th>
							<th className='border px-4 py-2'>Октябрь</th>
							<th className='border px-4 py-2'>Ноябрь</th>
							<th className='border px-4 py-2'>Декабрь</th>
							<th className='border px-4 py-2'>Сумма</th>
						</tr>
					</thead>
					<tbody>
						{data.map((item, itemIndex) =>
							item.rows.map((row, rowIndex) => (
								<tr key={`${itemIndex}-${rowIndex}`}>
									{rowIndex === 0 && (
										<>
											<td className='border px-4 py-2' rowSpan={3}>
												{item.id}
											</td>
											<td className='border px-4 py-2' rowSpan={3}>
												{item.location}
											</td>
											<td className='border px-4 py-2' rowSpan={3}>
												{item.serial}
											</td>
										</>
									)}
									<td className='border px-4 py-2'>{row.type}</td>
									<td
										className={`border px-4 py-2 text-right ${
											(row.type === 'Готівка' || row.type === 'Безготівка') &&
											Number(
												row.january.replace(/[^\d,]/g, '').replace(',', '.')
											) > 0
												? 'bg-[#ff99cc]'
												: ''
										}`}
									>
										{row.january}
									</td>
									<td className='border px-4 py-2 text-right'>
										{row.february}
									</td>
									<td className='border px-4 py-2 text-right'>{row.march}</td>
									<td className='border px-4 py-2 text-right'>{row.april}</td>
									<td className='border px-4 py-2 text-right'>{row.may}</td>
									<td className='border px-4 py-2 text-right'>{row.june}</td>
									<td className='border px-4 py-2 text-right'>{row.july}</td>
									<td className='border px-4 py-2 text-right'>{row.august}</td>
									<td className='border px-4 py-2 text-right'>
										{row.september}
									</td>
									<td className='border px-4 py-2 text-right'>{row.october}</td>
									<td className='border px-4 py-2 text-right'>
										{row.november}
									</td>
									<td className='border px-4 py-2 text-right'>
										{row.december}
									</td>
									<td className='border px-4 py-2 text-right'>{row.total}</td>
								</tr>
							))
						)}
					</tbody>
				</table>
			</motion.div>
		</div>
	)
}

export default YearlyReport
