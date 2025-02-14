import React, { createContext, useContext, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import PosDevicesService from '../../api/PosDevices/PosDevicesService'
import {
	IPosDevice,
	IPosDeviceDetails,
} from '../../api/PosDevices/PosDevicesTypes'

interface DeviceContextType {
	selectedDeviceId: number
	setSelectedDeviceId: (id: number) => void
	handleDeviceChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
	devices: IPosDevice[]
	selectedDevice?: IPosDeviceDetails
	loading: boolean
	error?: string
}

const DeviceContext = createContext<DeviceContextType | undefined>(undefined)

export const DeviceProvider = ({ children }: { children: React.ReactNode }) => {
	const navigate = useNavigate()
	const location = useLocation()

	const [devices, setDevices] = useState<IPosDevice[]>([])
	const [selectedDevice, setSelectedDevice] = useState<
		IPosDeviceDetails | undefined
	>(undefined)
	const [selectedDeviceId, setSelectedDeviceId] = useState<number | null>(null)
	const [loading, setLoading] = useState<boolean>(true)
	const [error, setError] = useState<string | undefined>(undefined)

	useEffect(() => {
		const fetchDevices = async () => {
			try {
				const res = await PosDevicesService.getDevices()
				setDevices(res.data.results)

				console.log('res', res)
				if (res.data.results.length > 0) {
					setSelectedDeviceId(res.data.results[0].id)
				}
			} catch (error) {
				console.log(error)
				setError('Ошибка при загрузке устройств')
			} finally {
				setLoading(false)
			}
		}
		fetchDevices()
	}, [])

	useEffect(() => {
		if (selectedDeviceId) {
			const fetchDevice = async () => {
				try {
					const device = await PosDevicesService.getDeviceById(selectedDeviceId)
					console.log('device', device.data)
					setSelectedDevice(device.data as unknown as IPosDeviceDetails)
				} catch (error) {
					console.log(error)
					setError('Ошибка при загрузке устройства')
				}
			}
			fetchDevice()
		}
	}, [selectedDeviceId])

	console.log('selectedDevice', selectedDevice)

	const handleDeviceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const newId = Number(e.target.value)
		setSelectedDeviceId(newId)

		// Обновляем URL для выбранного устройства
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
				selectedDevice,
				loading,
				error,
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

// import React, { createContext, useContext, useState } from 'react'
// import { useLocation, useNavigate } from 'react-router-dom'
// import { devices } from '../../data/device/device'

// interface DeviceContextType {
// 	selectedDeviceId: number
// 	setSelectedDeviceId: (id: number) => void
// 	handleDeviceChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
// }

// const DeviceContext = createContext<DeviceContextType | undefined>(undefined)

// export const DeviceProvider = ({ children }: { children: React.ReactNode }) => {
// 	const navigate = useNavigate()
// 	const location = useLocation()
// 	const [selectedDeviceId, setSelectedDeviceId] = useState<number>(
// 		devices[0].id
// 	)

// 	const handleDeviceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
// 		const newId = Number(e.target.value)
// 		const pathParts = location.pathname.split('/')
// 		const currentTab = pathParts[2] || 'details'

// 		// Изменяем только состояние устройства, а потом навигируем
// 		if (newId !== selectedDeviceId) {
// 			setSelectedDeviceId(newId)
// 		}

// 		// Навигация после изменения состояния
// 		navigate(`/devices/${currentTab}/${newId}`, { replace: true })
// 	}

// 	return (
// 		<DeviceContext.Provider
// 			value={{
// 				selectedDeviceId,
// 				setSelectedDeviceId,
// 				handleDeviceChange,
// 			}}
// 		>
// 			{children}
// 		</DeviceContext.Provider>
// 	)
// }

// export const useDevice = () => {
// 	const context = useContext(DeviceContext)
// 	if (context === undefined) {
// 		throw new Error('useDevice must be used within a DeviceProvider')
// 	}
// 	return context
// }
