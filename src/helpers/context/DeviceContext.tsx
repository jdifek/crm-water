import React, { createContext, useContext, useEffect, useState } from 'react'
import { useLocation, useNavigate, useParams } from 'react-router-dom'
import PosDevicesService from '../../api/PosDevices/PosDevicesService'
import {
	IPosDevice,
	IPosDeviceDetails,
} from '../../api/PosDevices/PosDevicesTypes'
import { useAuth } from '../context/AuthContext'

interface DeviceContextType {
	selectedDeviceId: number
	setSelectedDeviceId: (id: number) => void
	handleDeviceChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
	devices: IPosDevice[]
	setDevices: React.Dispatch<React.SetStateAction<IPosDevice[]>>
	selectedDevice?: IPosDeviceDetails
	loading: boolean
	error?: string
	fetchDevices: (isActive?: boolean) => void
}

const DeviceContext = createContext<DeviceContextType | undefined>(undefined)

export const DeviceProvider = ({ children }: { children: React.ReactNode }) => {
	const navigate = useNavigate()
	const location = useLocation()
	const { id } = useParams<{ id: string }>()
	const { isAuthenticated, userRole } = useAuth()

	const [devices, setDevices] = useState<IPosDevice[]>([])
	const [selectedDevice, setSelectedDevice] = useState<
		IPosDeviceDetails | undefined
	>(undefined)
	const [selectedDeviceId, setSelectedDeviceId] = useState<number | null>(null)
	const [loading, setLoading] = useState<boolean>(false)
	const [error, setError] = useState<string | undefined>(undefined)

	const fetchDevices = async (isActive?: boolean) => {
		setLoading(true)
		try {
			if (userRole === 'driver') {
				const res = await PosDevicesService.getDriverDevices(
					isActive !== undefined ? { is_active: isActive } : {}
				)
				setDevices(res.data.results)
			} else if (userRole === 'technician') {
				const res = await PosDevicesService.getTechnicianDevices(
					isActive !== undefined ? { is_active: isActive } : {}
				)
				setDevices(res.data.results)
			} else {
				const res = await PosDevicesService.getDevices(
					isActive !== undefined ? { is_active: isActive } : {}
				)
				setDevices(res.data.results)
			}
		} catch (error) {
			setError('Ошибка при загрузке устройств')
		} finally {
			setLoading(false)
		}
	}

	// Загружаем устройства при изменении состояния аутентификации
	useEffect(() => {
		if (isAuthenticated) {
			fetchDevices(true)
		} else {
			setDevices([])
			setSelectedDeviceId(null)
			setSelectedDevice(undefined)
			setLoading(false)
		}
	}, [isAuthenticated, userRole])

	// Синхронизируем selectedDeviceId с URL
	useEffect(() => {
		if (id) {
			const deviceId = Number(id)
			setSelectedDeviceId(deviceId)
		} else if (
			devices.length > 0 &&
			selectedDeviceId === null &&
			location.pathname.startsWith('/devices/details')
		) {
			setSelectedDeviceId(devices[0].id)
			navigate(`/devices/details/${devices[0].id}`, { replace: true })
		}
	}, [id, devices, navigate, location.pathname])

	// Загружаем данные устройства при изменении selectedDeviceId
	useEffect(() => {
		if (selectedDeviceId && isAuthenticated) {
			const fetchDevice = async () => {
				setLoading(true)
				try {
					if (userRole === 'technician') {
						const device = await PosDevicesService.getTechnicianDeviceById(
							selectedDeviceId
						)
						console.log('Fetched device:', device.data)
						setSelectedDevice(device.data as IPosDeviceDetails)
					} else {
						const device = await PosDevicesService.getDeviceById(
							selectedDeviceId
						)
						console.log('Fetched device:', device.data)
						setSelectedDevice(device.data as IPosDeviceDetails)
					}
				} catch (error) {
					console.log('Error fetching device:', error)
					setError('Ошибка при загрузке устройства')
					setSelectedDevice(undefined) // Очищаем, если ошибка
				} finally {
					setLoading(false)
				}
			}
			fetchDevice()
		}
	}, [selectedDeviceId, isAuthenticated, userRole])

	const handleDeviceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const newId = Number(e.target.value)
		setSelectedDeviceId(newId)
		const pathParts = location.pathname.split('/')
		const currentTab = pathParts[2] || 'details'
		navigate(`/devices/${currentTab}/${newId}`, { replace: true })
	}

	return (
		<DeviceContext.Provider
			value={{
				selectedDeviceId: selectedDeviceId || 0,
				setSelectedDeviceId,
				handleDeviceChange,
				devices,
				setDevices,
				selectedDevice,
				loading,
				error,
				fetchDevices,
			}}
		>
			{children}
		</DeviceContext.Provider>
	)
}

export const useDevice = () => {
	const context = useContext(DeviceContext)
	if (context === undefined) {
		throw new Error('useDevice must be used within a DeviceProvider')
	}
	return context
}
