import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
import 'react-datepicker/dist/react-datepicker.css'
import { FiDownload } from 'react-icons/fi'
import * as XLSX from 'xlsx'
import PosDevicesService from '../../api/PosDevices/PosDevicesService'
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
	const [isScrolled, setIsScrolled] = useState(false)
	const scrollContainerRef = useRef<HTMLDivElement>(null)

	useEffect(() => {
		const handleScroll = () => {
			if (scrollContainerRef.current) {
				setIsScrolled(scrollContainerRef.current.scrollLeft > 0)
			}
		}

		const scrollContainer = scrollContainerRef.current
		if (scrollContainer) {
			scrollContainer.addEventListener('scroll', handleScroll)
		}

		return () => {
			if (scrollContainer) {
				scrollContainer.removeEventListener('scroll', handleScroll)
			}
		}
	}, [])

	useEffect(() => {
		PosDevicesService.getDevices()
			.then(response => {
				console.log('Devices:', response)
			})
			.catch(error => {
				console.error('Error fetching devices:', error)
			})
	}, [])

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

	const stickyClass = (position: string, isHeader: boolean = false) =>
		`
    sticky ${position} 
    ${isHeader ? 'z-30 bg-gray-100' : 'z-20 bg-white'}
   after:absolute after:top-0 after:bottom-0 after:left-0 after:w-[1px] after:bg-gray-300
   
    ${
			isScrolled
				? 'shadow-[0_0_0_1px_rgba(0,0,0,0.1)]  after:absolute after:top-0 after:bottom-0 after:left-0 after:w-[1px] after:bg-gray-300'
				: ''
		}
  `.trim()

	return (
		<div className='p-4 space-y-6 w-full max-w-7xl mx-auto'>
			<div className='flex justify-between items-center'>
				<select
					className='border rounded px-3 py-1 w-40'
					value={selectedYear}
					onChange={e => setSelectedYear(Number(e.target.value))}
				>
					<option value={2023}>2023</option>
					<option value={2024}>2024</option>
					<option value={2025}>2025</option>
				</select>

				<button
					onClick={handleExportToExcel}
					className='flex items-center gap-2 bg-blue-500 text-white px-4 py-2 rounded-lg shadow-md hover:bg-blue-600 transition'
				>
					<FiDownload size={18} /> Экспорт
				</button>
			</div>

			<motion.div
				initial={{ opacity: 0, y: 10 }}
				animate={{ opacity: 1, y: 0 }}
				transition={{ duration: 0.5 }}
				className='bg-white shadow-lg rounded-lg p-6 w-full mx-auto overflow-hidden'
			>
				<div
					ref={scrollContainerRef}
					className='overflow-x-auto relative'
					style={{
						maxWidth: '100%',
					}}
				>
					<table className='w-full border-collapse text-sm'>
						<thead>
							<tr>
								<th
									className={`${stickyClass(
										'left-0',
										true
									)} border px-4 py-2 text-left w-[55px] min-w-[55px]`}
								>
									ID
								</th>
								<th
									className={`${stickyClass(
										'left-[55px]',
										true
									)} border px-4 py-2 text-left w-[140px] min-w-[140px]`}
								>
									Торгова точка
								</th>
								<th
									className={`${stickyClass(
										'left-[194px]',
										true
									)} border px-4 py-2 text-left w-[97px] min-w-[97px]`}
								>
									Серійний номер
								</th>
								<th
									className={`${stickyClass(
										'left-[290px]',
										true
									)} border px-4 py-2 text-left w-[99px] min-w-[99px]`}
								>
									Тип
								</th>
								{[
									'Январь',
									'Февраль',
									'Март',
									'Апрель',
									'Май',
									'Июнь',
									'Июль',
									'Август',
									'Сентябрь',
									'Октябрь',
									'Ноябрь',
									'Декабрь',
									'Сумма',
								].map(month => (
									<th
										key={month}
										className='border px-4 py-2 w-[100px] min-w-[100px] bg-gray-100'
									>
										{month}
									</th>
								))}
							</tr>
						</thead>
						<tbody>
							{data.map((item, itemIndex) =>
								item.rows.map((row, rowIndex) => (
									<tr key={`${itemIndex}-${rowIndex}`}>
										{rowIndex === 0 && (
											<>
												<td
													className={`${stickyClass(
														'left-0'
													)} border px-4 py-2 w-[55px] min-w-[55px]`}
													rowSpan={3}
												>
													{item.id}
												</td>
												<td
													className={`${stickyClass(
														'left-[55px]'
													)} border px-4 py-2 w-[140px] min-w-[140px]`}
													rowSpan={3}
												>
													{item.location}
												</td>
												<td
													className={`${stickyClass(
														'left-[194px]'
													)} border px-4 py-2 w-[97px] min-w-[97px]`}
													rowSpan={3}
												>
													{item.serial}
												</td>
											</>
										)}
										<td
											className={`${stickyClass(
												'left-[290px]'
											)} border px-4 py-2 w-[99px] min-w-[99px]`}
										>
											{row.type}
										</td>
										{Object.entries(row)
											.filter(([key]) => key !== 'type' && key !== 'total')
											.map(([key, value]) => (
												<td
													key={key}
													className='border px-4 py-2 text-right whitespace-nowrap'
												>
													{value}
												</td>
											))}
										<td className='border px-4 py-2 text-right whitespace-nowrap'>
											{row.total}
										</td>
									</tr>
								))
							)}
						</tbody>
					</table>
				</div>
			</motion.div>
		</div>
	)
}

export default YearlyReport
