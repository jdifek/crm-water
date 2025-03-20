// Refresh Token Response
export interface IRefreshTokenResponse {
	access: string
}

export interface IUser {
	id: number
	last_login: string
	created_at: string
	updated_at: string
	username: string
	role:
		| 'super_admin'
		| 'admin'
		| 'operator'
		| 'driver'
		| 'technician'
		| 'collector'
		| 'accountant'
	access: string
	email: string
	full_name: string
	phone_number: string
}

// UserMe Response
export interface IUserMeResponse {
	data: IUser
	errors: []
	status: string
}

// Users List Response
export interface IUsersListResponse {
	data: { count: number; next?: string; previous?: string; results: IUser[] }
	errors: []
	status: string
}

// User Token Request
export interface IUserTokenParams {
	username: string
	password: string
}
