import { IUser } from '../../api/Users/UsersTypes'

type Role = IUser['role']

const pageAccess: Record<Role, string[]> = {
	super_admin: ['/', '/users', '/devices', '/stats', '/maintenance'],
	admin: ['/', '/devices', '/stats', '/maintenance'],
	operator: ['/', '/devices'],
	driver: ['/', '/devices'],
	technician: ['/', '/devices', '/maintenance'],
	collector: ['/', '/devices'],
	accountant: ['/', '/stats'],
}

export const hasPageAccess = (
	role: Role | undefined,
	path: string
): boolean => {
	if (!role) return false
	return pageAccess[role].includes(path)
}

export const getVisibleDeviceFields = (role: Role | undefined) => {
	switch (role) {
		case 'super_admin':
		case 'admin':
		case 'operator':
			return 'all'
		case 'driver':
			return [
				'id',
				'name',
				'address',
				'tank_size',
				'water_amount_after_last_refill',
			]
		case 'technician':
			return [
				'id',
				'name',
				'address',
				'tds_sensor',
				'signal_level',
				'connection_type',
				'sensor_impulses_0_5l',
				'sensor_impulses_1l',
				'sensor_impulses_1_5l',
				'sensor_impulses_2l',
				'sensor_impulses_5l',
				'sensor_impulses_6l',
				'sensor_impulses_10l',
				'sensor_impulses_12l',
				'sensor_impulses_19l',
			]
		case 'collector':
			return [
				'id',
				'name',
				'address',
				'coin_count',
				'coin_amount',
				'bill_count',
				'bill_amount',
				'total_amount',
			]
		case 'accountant':
			return []
		default:
			return []
	}
}
