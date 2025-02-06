import { motion } from 'framer-motion'
import { useState } from 'react'
import 'react-datepicker/dist/react-datepicker.css'
import { FiDownload } from 'react-icons/fi'
import * as XLSX from 'xlsx'
import { YearlyReportTableData } from '../../types'

const TABLE_DATA: YearlyReportTableData = {
	2023: [
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
	],
	2024: [
		{
			id: '165',
			location: 'вул.Головна,125, №389',
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
	],
	2025: [
		{
			id: '172',
			location: 'вул.Головна,12б, №127',
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
	],
}

const YearlyReport = () => {
	const [selectedYear, setSelectedYear] = useState(2025)
	const data = TABLE_DATA[selectedYear]

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
		<div className='p-6 space-y-6 w-full'>
			{/* Фильтры */}
			<div className='flex justify-between items-center'>
				<div className='flex items-center gap-2 pb-2 w-40'>
					<select
						className='border rounded px-3 py-1 w-full'
						value={selectedYear}
						onChange={e => setSelectedYear(Number(e.target.value))}
					>
						<option value={2023}>2023</option>
						<option value={2024}>2024</option>
						<option value={2025}>2025</option>
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
				className='bg-white shadow-lg rounded-lg p-6 overflow-x-auto w-full'
			>
				<table className='w-full min-w-[1000px] border-collapse text-[12px]'>
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
									{Object.entries(row)
										.filter(([key]) => key !== 'type' && key !== 'total')
										.map(([key, value]) => (
											<td
												key={key}
												className={`border px-4 py-2 text-right ${
													item.id &&
													key === 'january' &&
													(row.type === 'Готівка' ||
														row.type === 'Безготівка' ||
														'Дохід') &&
													Number(
														value
															.toString()
															.replace(/[^\d,]/g, '')
															.replace(',', '.')
													) > 0
														? 'bg-[#ff99cc]'
														: item.id
														? 'bg-gray-700 text-white'
														: ''
												}`}
											>
												{value}
											</td>
										))}
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
