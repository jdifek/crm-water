// Refresh Token Response
export interface IRefreshTokenResponse {
	access: string
}

// User Data
export interface IUser {
	id: number
	last_login: string
	created_at: string
	updated_at: string
	username: string
	role: string
	access: string
	email: string
	full_name: string
	phone_number: string
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
