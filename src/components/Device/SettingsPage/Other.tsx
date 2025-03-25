import { useEffect, useState } from 'react'
import PosDevicesService from '../../../api/PosDevices/PosDevicesService'
import {
	IPosDeviceDetails,
	IPosTechnicianDeviceDetails,
} from '../../../api/PosDevices/PosDevicesTypes'
import { ButtonSave } from '../../ui/Button'
import ConcentrationInput from '../ConcentrationInput'
import { useAuth } from '../../../helpers/context/AuthContext'

interface IOtherProps {
	selectedDevice: IPosDeviceDetails | IPosTechnicianDeviceDetails
	loading: boolean
}

export const Other = ({ selectedDevice, loading }: IOtherProps) => {
	const { userRole } = useAuth()
	const [isSaving, setIsSaving] = useState<boolean>(false)
	const [settings, setSettings] = useState<Record<string, boolean>>({})
	const [productConcentration, setProductConcentration] = useState<number>(
		parseFloat(selectedDevice.product_concentration) || 0
	)

	const OTHER_SETTING_ITEMS = [
		{ id: 'should_update', label: 'Обновить' },
		{ id: 'check_firmware_version', label: 'Проверять версию прошивки' },
		{ id: 'send_sms', label: 'Отправка смс' },
		{ id: 'send_filter_data', label: 'Отправка данных о фильтрах' },
		{ id: 'enable_alarm', label: 'Сигнализация' },
		{ id: 'tds_sensor', label: 'Датчик TDS' },
	]

	useEffect(() => {
		const initialSettings: Record<string, boolean> = {}
		OTHER_SETTING_ITEMS.forEach(item => {
			initialSettings[item.id] = selectedDevice[item.id] || false
		})
		setSettings(initialSettings)
		setProductConcentration(
			parseFloat(selectedDevice.product_concentration) || 0
		)
	}, [selectedDevice])

	const handleCheckboxChange = (e: React.ChangeEvent<HTMLInputElement>) => {
		const { id, checked } = e.target
		setSettings(prev => ({ ...prev, [id]: checked }))
	}

	const handleSave = async () => {
		try {
			setIsSaving(true)
			if (userRole === 'technician') {
				await PosDevicesService.updateTechnicianDevice(selectedDevice.id, {
					...settings,
					product_concentration: productConcentration.toFixed(2),
				})
			} else {
				await PosDevicesService.updateDevice(selectedDevice.id, {
					...settings,
					product_concentration: productConcentration.toFixed(2),
				})
			}
		} catch (error) {
			console.error('Ошибка при обновлении настроек:', error)
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
			<h2 className='text-xl font-semibold mb-6'>Другие настройки</h2>
			<div className='space-y-4'>
				{OTHER_SETTING_ITEMS.map(item => (
					<div key={item.id} className='flex items-center'>
						<input
							type='checkbox'
							id={item.id} // Используем item.id как id для чекбокса
							className='mr-2'
							checked={settings[item.id]} // Получаем значение состояния по item.id
							onChange={handleCheckboxChange}
							disabled={isSaving}
						/>
						<label htmlFor={item.id}>{item.label}</label>
					</div>
				))}

				<ConcentrationInput
					value={productConcentration}
					onChange={setProductConcentration}
				/>

				<ButtonSave onClick={handleSave} disabled={isSaving} />
			</div>
		</div>
	)
}

// import { ButtonSave } from '../../ui/Button'
// import ConcentrationInput from '../ConcentrationInput'

// const OTHER_SETTING_ITEMS = [
// 	{
// 		id: 'update',
// 		label: 'Обновить',
// 	},
// 	{
// 		id: 'firmwareVersion',
// 		label: 'Проверять версию прошивки',
// 	},
// 	{
// 		id: 'sms',
// 		label: 'Отправка смс',
// 	},
// 	{
// 		id: 'filterData',
// 		label: 'Отправка данных о фильтрах',
// 	},
// 	{
// 		id: 'signaling',
// 		label: 'Сигнализация',
// 	},
// 	{
// 		id: 'tdsSensor',
// 		label: 'Датчик TDS',
// 	},
// 	{
// 		id: 'oneBranch',
// 		label: 'Работа в одной филии',
// 	},
// 	{
// 		id: 'automaticPayment',
// 		label: 'Автооплата тарифа',
// 	},
// ]

// export const Other = () => {
// 	return (
// 		<div>
// 			<h2 className='text-xl font-semibold mb-6'>Другие настройки</h2>
// 			<div className='space-y-4'>
// 				{OTHER_SETTING_ITEMS.map((item, index) => (
// 					<div key={index} className='flex items-center'>
// 						<input type='checkbox' id={item.id} className='mr-2' />
// 						<label htmlFor={item.id}>{item.label}</label>
// 					</div>
// 				))}

// 				<ConcentrationInput />

// 				<ButtonSave />
// 			</div>
// 		</div>
// 	)
// }
