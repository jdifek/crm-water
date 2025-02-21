import { motion } from 'framer-motion'
import { useEffect, useRef, useState } from 'react'
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

	const commonCellClasses = 'border px-4 py-2'
	const fixedColumnClasses = `${commonCellClasses} bg-white`
	const headerClasses = `${commonCellClasses} bg-gray-100 font-medium`
	const scrollableColumnClasses = `${commonCellClasses} text-right whitespace-nowrap`

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
				className='bg-white shadow-lg rounded-lg p-6 w-full mx-auto sm:max-w-[640px] md:max-w-[796px] lg:max-w-[748px] xl:max-w-[1024px] 2xl:max-w-[1440px]'
			>
				<div className='relative'>
					{/* Fixed Columns Container */}
					<div className='absolute left-0 top-0 z-30 bg-white'>
						<table className='border-collapse text-sm'>
							<thead>
								<tr>
									<th className={`${headerClasses} text-left w-[55px]`}>ID</th>
									<th className={`${headerClasses} text-left w-[140px]`}>
										Торгова точка
									</th>
									<th
										className={`${headerClasses} text-left w-[97px] whitespace-nowrap`}
									>
										Серійний номер
									</th>
									<th className={`${headerClasses} text-left w-[99px]`}>Тип</th>
								</tr>
							</thead>
							<tbody>
								{data.map((item, itemIndex) =>
									item.rows.map((row, rowIndex) => (
										<tr key={`fixed-${itemIndex}-${rowIndex}`}>
											{rowIndex === 0 && (
												<>
													<td
														className={`${fixedColumnClasses} w-[55px]`}
														rowSpan={3}
													>
														{item.id}
													</td>
													<td
														className={`${fixedColumnClasses} w-[140px]`}
														rowSpan={3}
													>
														{item.location}
													</td>
													<td
														className={`${fixedColumnClasses} w-[97px]`}
														rowSpan={3}
													>
														{item.serial}
													</td>
												</>
											)}
											<td className={`${fixedColumnClasses} w-[99px]`}>
												{row.type}
											</td>
										</tr>
									))
								)}
							</tbody>
						</table>
					</div>

					{/* Scrollable Container */}
					<div
						ref={scrollContainerRef}
						className='overflow-x-scroll scrollbar-hide'
						style={{
							marginLeft: '428px',
						}}
					>
						<style>
							{`
			.scrollbar-hide::-webkit-scrollbar {
				display: block;
			}
		`}
						</style>
						<table className='w-full border-collapse text-sm'>
							<thead>
								<tr>
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
										<th key={month} className={`${headerClasses} w-[100px]`}>
											{month}
										</th>
									))}
								</tr>
							</thead>
							<tbody>
								{data.map((item, itemIndex) =>
									item.rows.map((row, rowIndex) => (
										<tr key={`scroll-${itemIndex}-${rowIndex}`}>
											{Object.entries(row)
												.filter(([key]) => key !== 'type' && key !== 'total')
												.map(([key, value]) => (
													<td key={key} className={scrollableColumnClasses}>
														{value}
													</td>
												))}
											<td className={scrollableColumnClasses}>{row.total}</td>
										</tr>
									))
								)}
							</tbody>
						</table>
					</div>
				</div>
			</motion.div>
		</div>
	)
}

export default YearlyReport
