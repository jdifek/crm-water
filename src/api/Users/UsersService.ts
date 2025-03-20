import $api from '../http'
import { IAuthTokenResponse, IRefreshToken } from '../Token/TokenTypes'
import {
	IRefreshTokenResponse,
	IUser,
	IUserMeResponse,
	IUsersListResponse,
	IUserTokenParams,
} from './UsersTypes'

export default class UsersService {
	static async getUsers(): Promise<IUsersListResponse> {
		return (await $api.get<IUsersListResponse>('users/')).data
	}

	static async getUserById(id: number): Promise<IUser> {
		return (await $api.get<IUser>(`users/${id}/`)).data
	}

	static async getUserToken(
		params: IUserTokenParams
	): Promise<IAuthTokenResponse> {
		return (await $api.post<IAuthTokenResponse>('users/token/', params)).data
	}

	static async refreshUserToken(
		params: IRefreshToken
	): Promise<IRefreshTokenResponse> {
		return (
			await $api.post<IRefreshTokenResponse>('users/token/refresh/', params)
		).data
	}

	static async getMe(): Promise<IUserMeResponse> {
		return (await $api.get<IUserMeResponse>('users/me/')).data
	}
}
