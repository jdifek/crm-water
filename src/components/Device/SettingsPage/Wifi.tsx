import { useEffect, useState } from 'react'
import PosDevicesService from '../../../api/PosDevices/PosDevicesService'
import { IPosDeviceDetails } from '../../../api/PosDevices/PosDevicesTypes'
import { ButtonSave } from '../../ui/Button'

interface IWifiProps {
	selectedDevice: IPosDeviceDetails
	loading: boolean
}

export const Wifi = ({ selectedDevice, loading }: IWifiProps) => {
	const [wifiName, setWifiName] = useState<string>(
		selectedDevice.wifi_name || ''
	)
	const [wifiPassword, setWifiPassword] = useState<string>(
		selectedDevice.wifi_password || ''
	)
	const [isSaving, setIsSaving] = useState<boolean>(false)
	const [pendingUseWifi, setPendingUseWifi] = useState<boolean>(
		selectedDevice.use_wifi
	)

	useEffect(() => {
		setPendingUseWifi(selectedDevice.use_wifi)
		setWifiName(selectedDevice.wifi_name || '')
		setWifiPassword(selectedDevice.wifi_password || '')
	}, [selectedDevice])

	const handleToggleWifi = () => {
		setPendingUseWifi(!pendingUseWifi)
		setWifiName('')
		setWifiPassword('')
	}

	const handleSave = async () => {
		if (pendingUseWifi && (!wifiName || !wifiPassword)) {
			console.log('Введите имя и пароль WiFi')
			return
		}

		try {
			setIsSaving(true)
			await PosDevicesService.updateDevice(selectedDevice.id, {
				use_wifi: pendingUseWifi,
				wifi_name: pendingUseWifi ? wifiName : null,
				wifi_password: pendingUseWifi ? wifiPassword : null,
			})
		} catch (error) {
			console.error('Ошибка при обновлении WiFi:', error)
		} finally {
			setIsSaving(false)
		}
	}

	if (loading) {
		return (
			<div className='flex justify-center items-center py-6'>
				<div className='animate-spin rounded-full h-8 w-8 border-b-2 border-gray-600'></div>
			</div>
		)
	}

	return (
		<div>
			<h2 className='text-xl font-semibold mb-6'>
				Настройки подключения к сети WiFi
			</h2>
			<div className='space-y-4'>
				{/* checkbox WiFi */}
				<div className='flex items-center'>
					<input
						type='checkbox'
						id='useWifi'
						className='mr-2'
						checked={pendingUseWifi}
						onChange={handleToggleWifi}
						disabled={isSaving}
					/>
					<label htmlFor='useWifi'>Использовать WiFi</label>
				</div>
				<div>
					<label className='block text-sm font-medium text-gray-700'>
						Имя WiFi
					</label>
					<input
						type='text'
						className='mt-1 block w-full rounded-md border-gray-300 shadow-sm'
						value={wifiName}
						onChange={e => setWifiName(e.target.value)}
						disabled={!pendingUseWifi}
					/>
				</div>
				<div>
					<label className='block text-sm font-medium text-gray-700'>
						Пароль WiFi
					</label>
					<input
						type='password'
						className='mt-1 block w-full rounded-md border-gray-300 shadow-sm'
						value={wifiPassword}
						onChange={e => setWifiPassword(e.target.value)}
						disabled={!pendingUseWifi}
					/>
				</div>

				<ButtonSave onClick={handleSave} disabled={isSaving} />
			</div>
		</div>
	)
}

// import { IPosDeviceDetails } from '../../../api/PosDevices/PosDevicesTypes'
// import { ButtonSave } from '../../ui/Button'

// interface IWifiProps {
// 	selectedDevice: IPosDeviceDetails
// 	loading: boolean
// }

// export const Wifi = ({ selectedDevice, loading }: IWifiProps) => {
// 	console.log(selectedDevice)

// 	return loading ? (
// 		<div className='flex justify-center items-center py-6'>
// 			<div className='animate-spin rounded-full h-8 w-8 border-b-2 border-gray-600'></div>
// 		</div>
// 	) : (
// 		<div>
// 			<h2 className='text-xl font-semibold mb-6'>
// 				Настройки подключения к сети WiFi
// 			</h2>
// 			<div className='space-y-4'>
// 				<div className='flex items-center'>
// 					<input type='checkbox' id='useWifi' className='mr-2' />
// 					<label htmlFor='useWifi'>Использовать WiFi</label>
// 				</div>
// 				<div>
// 					<label className='block text-sm font-medium text-gray-700'>
// 						Имя WiFi
// 					</label>
// 					<input
// 						type='text'
// 						className='mt-1 block w-full rounded-md border-gray-300 shadow-sm'
// 					/>
// 				</div>
// 				<div>
// 					<label className='block text-sm font-medium text-gray-700'>
// 						Пароль WiFi
// 					</label>
// 					<input
// 						type='password'
// 						className='mt-1 block w-full rounded-md border-gray-300 shadow-sm'
// 					/>
// 				</div>
// 				<ButtonSave />
// 			</div>
// 		</div>
// 	)
// }
