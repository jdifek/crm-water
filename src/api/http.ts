import axios from 'axios'

export const API_URL = import.meta.env.VITE_API_URL

const $api = axios.create({
	baseURL: API_URL, // Base URL for all requests
	headers: {
		'Content-Type': 'application/json', // Set JSON as the content type
	},
})

// Add a request interceptor to attach the token dynamically
$api.interceptors.request.use(
	config => {
		const token = localStorage.getItem('authToken') // Retrieve token from localStorage
		if (token) {
			config.headers.Authorization = `Bearer ${token}` // Attach token to Authorization header
		}
		return config
	},
	error => {
		return Promise.reject(error)
	}
)

export default $api
