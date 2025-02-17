import { useState } from 'react'
import PosDevicesService from '../../api/PosDevices/PosDevicesService'
import { DeviceSidebar } from '../../components/Device/DeviceSidebar'
import { DeviceNavigate } from '../../components/Device/Navigate'
import { SelectDevice } from '../../components/Device/SelectDevice'
import { ButtonSave } from '../../components/ui/Button'
import { useDevice } from '../../helpers/context/DeviceContext'

const fieldLabels: Record<string, string> = {
	water_inlet_counter: 'Счетчик воды на входе',
	total_coins_quantity: 'Количество монет за все время',
	total_coins_earned: 'Сумма монет за все время',
	total_bills_quantity: 'Количество купюр за все время',
	total_bills_earned: 'Сумма купюр за все время',
	total_water_sold: 'Всего продуктов продано',
	electricity_counter: 'Счетчик Электроэнергии',
}

// Единицы измерения для каждого поля
const units: Record<string, string> = {
	water_inlet_counter: 'л',
	total_coins_quantity: 'шт',
	total_coins_earned: '₴',
	total_bills_quantity: 'шт',
	total_bills_earned: '₴',
	total_water_sold: 'л',
	electricity_counter: 'kW h',
}

export const ReplacingValues = () => {
	const [isSaving, setIsSaving] = useState<boolean>(false)
	const [editedValues, setEditedValues] = useState<
		Record<string, string | number>
	>({})
	const { selectedDevice, loading, error } = useDevice()

	if (loading) return <p>Загрузка устройства...</p>
	if (error) return <p className='text-red-500'>{error}</p>
	if (!selectedDevice) return <p>Устройство не найдено</p>

	const handleChange = (key: string, value: string | number) => {
		setEditedValues(prev => ({ ...prev, [key]: value }))
	}

	const handleSave = async () => {
		try {
			setIsSaving(true)
			await PosDevicesService.updateDevice(selectedDevice.id, editedValues)
		} catch (error) {
			console.error('Ошибка при сохранении:', error)
		} finally {
			setIsSaving(false)
		}
	}

	return (
		<div className='p-4 lg:p-8'>
			<SelectDevice />

			<div className='flex gap-3 flex-nowrap w-full'>
				<div className='bg-white rounded-lg shadow p-5 flex flex-col flex-1'>
					<DeviceNavigate />

					<div className='p-4 lg:p-8'>
						<div className='bg-white rounded-lg shadow p-6'>
							<div className='space-y-6'>
								{Object.entries(fieldLabels).map(([key, label]) => (
									<div key={key}>
										<label className='block text-sm font-medium text-gray-700'>
											{label}
										</label>
										<div className='mt-1 flex rounded-md shadow-sm'>
											{units[key] === 'шт' ? (
												<input
													type='number'
													step={1}
													pattern='\d*'
													onKeyDown={e => {
														if (
															e.key === 'e' ||
															e.key === '.' ||
															e.key === ','
														) {
															e.preventDefault()
														}
													}}
													className='block w-full rounded-md border-gray-300 shadow-sm'
													value={editedValues[key] ?? selectedDevice[key] ?? ''}
													onChange={e => handleChange(key, e.target.value)}
												/>
											) : (
												<input
													type='number'
													className='block w-full rounded-md border-gray-300 shadow-sm'
													value={editedValues[key] ?? selectedDevice[key] ?? ''}
													onChange={e => handleChange(key, e.target.value)}
												/>
											)}

											<span className='inline-flex items-center px-3 rounded-r-md border border-l-0 border-gray-300 bg-gray-50 text-gray-500'>
												{units[key] || ''}
											</span>
										</div>
									</div>
								))}
								<ButtonSave onClick={handleSave} disabled={isSaving} />
							</div>
						</div>
					</div>
				</div>

				<DeviceSidebar />
			</div>
		</div>
	)
}
