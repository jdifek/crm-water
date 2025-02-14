import axios from 'axios'
import TokenService from './Token/TokenService'

export const API_URL = import.meta.env.VITE_API_URL

const $api = axios.create({
	baseURL: API_URL,
	headers: { 'Content-Type': 'application/json' },
})

// Перехват запросов – автоматически подставляем токен
$api.interceptors.request.use(config => {
	const token = localStorage.getItem('authToken')
	if (token) {
		config.headers.Authorization = `Bearer ${token}`
	}
	return config
})

// Перехват ответов – обновляем токен, если он истёк
$api.interceptors.response.use(
	response => response,
	async error => {
		const originalRequest = error.config

		// Если ошибка 401 и это не попытка обновления токена
		if (error.response?.status === 401 && !originalRequest._retry) {
			originalRequest._retry = true

			try {
				const refreshToken = localStorage.getItem('refreshToken')
				if (!refreshToken) throw new Error('No refresh token')

				const response = await TokenService.refreshToken({
					refresh: refreshToken,
				})
				console.log('Refresh token response:', response) // 👈 Логируем ответ
				const newAccessToken = response.data.access

				if (!newAccessToken) {
					console.error('Failed to get new access token')
					throw new Error('No access token received')
				}

				// Обновляем токены
				localStorage.setItem('authToken', newAccessToken)

				// Повторяем оригинальный запрос с новым токеном
				originalRequest.headers.Authorization = `Bearer ${newAccessToken}`
				return $api(originalRequest)
			} catch (refreshError) {
				console.error('Token refresh failed', refreshError)
				localStorage.removeItem('authToken')
				localStorage.removeItem('refreshToken')
			}
		}

		return Promise.reject(error)
	}
)

export default $api

/* вариант без автоматического обновления accessToken */
// import axios from 'axios'

// export const API_URL = import.meta.env.VITE_API_URL

// const $api = axios.create({
// 	baseURL: API_URL, // Base URL for all requests
// 	headers: {
// 		'Content-Type': 'application/json', // Set JSON as the content type
// 	},
// })

// // Add a request interceptor to attach the token dynamically
// $api.interceptors.request.use(
// 	config => {
// 		const token = localStorage.getItem('authToken') // Retrieve token from localStorage
// 		if (token) {
// 			config.headers.Authorization = `Bearer ${token}` // Attach token to Authorization header
// 		}
// 		return config
// 	},
// 	error => {
// 		return Promise.reject(error)
// 	}
// )

// export default $api
