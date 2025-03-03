import $api from '../http'
import {
	CurrentByDeviceResponse,
	CurrentByVolumeResponse,
	CurrentDailyResponse,
	CurrentDaySummaryResponse,
	CurrentHourlyResponse,
	Last30DaysResponse,
} from './StatsTypes'

export default class StatsService {
	static async currentDaySummary(): Promise<CurrentDaySummaryResponse> {
		return (
			await $api.get<CurrentDaySummaryResponse>(
				'stats/general/current-day-summary/'
			)
		).data
	}
	static async currentLast(): Promise<Last30DaysResponse> {
		return (await $api.get<Last30DaysResponse>('stats/general/last-30-days/'))
			.data
	}

	static async currentDaily(
		dateSt: string,
		dateFn: string
	): Promise<CurrentDailyResponse> {
		console.log('Fetching daily stats with params:', {
			date_st: dateSt,
			date_fn: dateFn,
		})
		return (
			await $api.get<CurrentDailyResponse>('stats/daily/', {
				params: {
					date_st: dateSt,
					date_fn: dateFn,
				},
			})
		).data
	}

	static async currentHourly(
		dateSt: string,
		dateFn?: string,
		deviceId?: number
	): Promise<CurrentHourlyResponse> {
		return (
			await $api.get<CurrentHourlyResponse>('stats/hourly/', {
				params: { date_st: dateSt, date_fn: dateFn, device_id: deviceId },
			})
		).data
	}
	static async currentByVolume(
		dateSt: string,
		dateFn?: string,
		deviceId?: number
	): Promise<CurrentByVolumeResponse> {
		return (
			await $api.get<CurrentByVolumeResponse>('stats/by-volume/', {
				params: { date_st: dateSt, date_fn: dateFn, device_id: deviceId },
			})
		).data
	}

	static async currentByDevice(
		dateSt: string,
		dateFn?: string
	): Promise<CurrentByDeviceResponse> {
		return (
			await $api.get<CurrentByDeviceResponse>('stats/by-device/', {
				params: { date_st: dateSt, date_fn: dateFn },
			})
		).data
	}
}
