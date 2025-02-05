export type DailyStatsTableData = {
	time: string
	sessions: number
	liters: number
	income: number
}

export type DailyStatsSortDirection = 'asc' | 'desc'

export type CollectionTableData = {
	id: number
	date: string
	device: string
	type: string
	collector: string
	quantity: number
	amount: number
}

export type LiterStatsTableData = {
	date: string
	container: number
	sessions: number
	liters: number
}
