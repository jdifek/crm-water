import React, { createContext, useContext, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom'
import { devices } from '../../data/device/device'

interface DeviceContextType {
	selectedDeviceId: number
	setSelectedDeviceId: (id: number) => void
	handleDeviceChange: (e: React.ChangeEvent<HTMLSelectElement>) => void
}

const DeviceContext = createContext<DeviceContextType | undefined>(undefined)

export const DeviceProvider = ({ children }: { children: React.ReactNode }) => {
	const navigate = useNavigate()
	const location = useLocation()
	const [selectedDeviceId, setSelectedDeviceId] = useState<number>(
		devices[0].id
	)

	const handleDeviceChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		const newId = Number(e.target.value)
		const pathParts = location.pathname.split('/')
		const currentTab = pathParts[2] || 'details'

		if (newId !== selectedDeviceId) {
			setSelectedDeviceId(newId)
			navigate(`/devices/${currentTab}/${newId}`, { replace: true })
		}
	}

	return (
		<DeviceContext.Provider
			value={{
				selectedDeviceId,
				setSelectedDeviceId,
				handleDeviceChange,
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
