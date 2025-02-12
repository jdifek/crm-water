// POS Device Response
export interface IPosDevice {
	id: number
	name: string
	serial_number: string
	address: string
	has_connection: boolean
	sensor_is_ok: boolean
	system_is_ok: boolean
	tank_size: string
	water_sold_since_last_refill: string
	water_amount_after_last_refill: string
	water_left: number
}

// POS Devices List Response
export interface IPosDevicesListResponse {
	count: number
	next?: string
	previous?: string
	results: IPosDevice[]
}

// POS Device Update Request
export interface IPosDeviceUpdateParams {
	name?: string
	address?: string
	is_active?: boolean
}
