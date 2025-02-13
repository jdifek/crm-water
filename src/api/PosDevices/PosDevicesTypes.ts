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
	data: {
		count: number
		next?: string
		previous?: string
		results: IPosDevice[]
	}
	errors: []
	status: string
}

// POS Device by ID
export interface IPosDeviceDetails {
	id: number
	alerted_users: { id: number; full_name: string }[]
	trusted_users: { id: number; full_name: string }[]
	products: { price: string; name: string }[]
	created_at: string
	updated_at: string
	name: string
	latitude: string
	longitude: string
	country: string
	city: string
	street: string
	house: string
	tank_size: string
	water_sold_since_last_refill: string
	water_amount_after_last_refill: string
	service_mode: boolean
	imei: string
	serial_number: string
	device_model: string
	bill_acceptor_model: string
	coin_acceptor_model: string
	user_interface: string
	interface_language: string
	creation_date: string
	temperature: number
	tds: number
	product_balance: string
	water_inlet_counter: string
	electricity_counter: string
	total_water_sold: string
	total_money_earned: string
	total_coins_quantity: number
	total_coins_earned: string
	total_bills_quantity: number
	total_bills_earned: string
	connection_type: string
	sim_card_number: string
	telecom_operator: string
	signal_level: number
	sim_card_balance: string
	date_of_last_activity: string
	main_controller_firmware_version: string
	water_preapration_controller_firmware_version: string
	display_controller_firmware_version: string
	main_controller_firmware_date: string
	is_active: boolean
	use_wifi: boolean
	wifi_name: string
	wifi_password: string
	use_customer_cards: boolean
	enable_privat_24_payment: boolean
	pos_terminal_model: string
	vendor_id: string
	should_update: boolean
	check_firmware_version: boolean
	send_sms: boolean
	send_filter_data: boolean
	enable_alarm: boolean
	tds_sensor: boolean
	product_concentration: string
	enable_sensor_settings_set: boolean
	sensor_impulses_0_5l: number
	sensor_impulses_1l: number
	sensor_impulses_1_5l: number
	sensor_impulses_2l: number
	sensor_impulses_5l: number
	sensor_impulses_6l: number
	sensor_impulses_10l: number
	sensor_impulses_12l: number
	sensor_impulses_19l: number
	dispenser_1_enabled: boolean
	dispenser_1_t1: number
	dispenser_1_t2: number
	dispenser_2_enabled: boolean
	dispenser_2_t1: number
	dispenser_2_t2: number
	dispenser_3_enabled: boolean
	dispenser_3_t1: number
	dispenser_3_t2: number
	dispenser_4_enabled: boolean
	dispenser_4_t1: number
	dispenser_4_t2: number
	winter_mode: boolean
	before_replacing_pre_filters: number
	before_replacing_post_filters: number
	before_membrane_replacement: number
	before_antiscalant_replacement: number
	before_minerals_replacement: number
	vibration_sensor_sensitivity: number
}

// POS Device Update Request
export interface IPosDeviceUpdateParams {
	name?: string
	address?: string
	is_active?: boolean
}
