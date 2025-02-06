// Statistics - Sales statistics
export type SaleTableData = {
	id: string
	date: string
	cost: number
	issued: number
	ordered: number
	product: string
	payment: string
	store: string
}

// Statistics - Sales by day
export type SalesByDayTableData = {
	date: string
	sessions: number
	liters: number
	income: number
}

// Statistics - Daily stats
export type DailyStatsTableData = {
	time: string
	sessions: number
	liters: number
	income: number
}

export type DailyStatsSortDirection = 'asc' | 'desc'

// Statistics - Collection
export type CollectionTableData = {
	id: number
	date: string
	device: string
	type: string
	collector: string
	quantity: number
	amount: number
}

// Statistics - Liter stats
export type LiterStatsTableData = {
	date: string
	container: number
	sessions: number
	liters: number
}

// Statistics - Yearly report
type MonthData = {
	january: string
	february: string
	march: string
	april: string
	may: string
	june: string
	july: string
	august: string
	september: string
	october: string
	november: string
	december: string
	total: string
}

type Row = {
	type: 'Готівка' | 'Безготівка' | 'Дохід'
} & MonthData

type TableItem = {
	id: string
	location: string
	serial: string
	rows: Row[]
}

export type YearlyReportTableData = {
	[year: number]: TableItem[]
}

// Cards - Card list
export type CardData = {
	id: number
	date: string
	number: string
	code: string
	type: string
	holder: string
	active: boolean
	device: string
	address: string
	registered: boolean
}
