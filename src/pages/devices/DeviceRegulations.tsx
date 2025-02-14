import { useState } from 'react'
import PosDevicesService from '../../api/PosDevices/PosDevicesService'
import { DeviceSidebar } from '../../components/Device/DeviceSidebar'
import { DeviceNavigate } from '../../components/Device/Navigate'
import { SelectDevice } from '../../components/Device/SelectDevice'
import { ButtonSave } from '../../components/ui/Button'
import { useDevice } from '../../helpers/context/DeviceContext'

const fieldLabels: Record<string, string> = {
	before_replacing_pre_filters: 'До замены предварительных фильтров',
	before_replacing_post_filters: 'До замены постфильтров',
	before_membrane_replacement: 'До замены (промывки) мембран',
	before_antiscalant_replacement: 'До замены антискаланта',
	before_minerals_replacement: 'До замены минералов',
}

const DeviceRegulations = () => {
	const [isSaving, setIsSaving] = useState<boolean>(false)
	const [editedValues, setEditedValues] = useState<Record<string, number>>({})
	const { selectedDevice, loading, error } = useDevice()

	if (loading) return <p>Загрузка устройства...</p>
	if (error) return <p className='text-red-500'>{error}</p>
	if (!selectedDevice) return <p>Устройство не найдено</p>

	const handleChange = (key: string, value: number) => {
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
											<input
												type='number'
												className='block w-full rounded-md border-gray-300 shadow-sm'
												value={editedValues[key] ?? selectedDevice[key] ?? 0}
												onChange={e =>
													handleChange(key, parseInt(e.target.value) || 0)
												}
											/>
											<span className='inline-flex items-center px-3 rounded-r-md border border-l-0 border-gray-300 bg-gray-50 text-gray-500'>
												л
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

export default DeviceRegulations
