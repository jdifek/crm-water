export interface CurrentDaySummaryResponse {
	data: CurrentDaySummary
	errors: string[]
	status: string
}

export interface CurrentDaySummary {
	sessions: number
	litres: string
	income: string
}

export interface Last30DaysResponse {
	data: Last30DaysData[]
	errors: string[]
	status: string
}

export interface Last30DaysData {
	[date: string]: DailyStats
}

export interface DailyStats {
	sessions: number
	litres: number
	income: number
}

export interface CurrentDailyResponse {
	data: {
		count: number
		next: string
		previous: string
		results: CurrentDailyStats[]
	}
	errors: string[]
	status: string
}

export interface CurrentDailyStats {
	when: string
	sessions: number
	litres: string
	income: string
}

export interface CurrentHourlyResponse {
	data: {
		count: number
		next: string
		previous: string
		results: CurrentHourlyStats[]
	}
	errors: string[]
	status: string
}

export interface CurrentHourlyStats {
	when: string
	sessions: number
	litres: string
	income: string
}

export interface CurrentByVolumeResponse {
	data: {
		count: number
		next: string
		previous: string
		results: CurrentByVolumeStats[]
	}
	errors: string[]
	status: string
}

export interface CurrentByVolumeStats {
	volume: string
	sessions: number
	litres: string
	income: string
}

export interface CurrentByDeviceResponse {
	data: {
		count: number
		next: string
		previous: string
		results: CurrentByDeviceStats[]
	}
	errors: string[]
	status: string
}

export interface CurrentByDeviceStats {
	device_name: string
	sessions: number
	litres: string
	income: string
}
