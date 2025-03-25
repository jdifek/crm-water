import { useEffect, useState } from 'react'
import PosDevicesService from '../../../api/PosDevices/PosDevicesService'
import {
	IPosDeviceDetails,
	IPosTechnicianDeviceDetails,
} from '../../../api/PosDevices/PosDevicesTypes'
import { ButtonSave } from '../../ui/Button'
import { useAuth } from '../../../helpers/context/AuthContext'

interface IDispenserModeProps {
	selectedDevice: IPosDeviceDetails | IPosTechnicianDeviceDetails
	loading: boolean
}

const DISPENSER_IDS = [1, 2, 3, 4]

export const DispenserMode = ({
	selectedDevice,
	loading,
}: IDispenserModeProps) => {
	const { userRole } = useAuth()
	const [dispensers, setDispensers] = useState<
		Record<number, { enabled: boolean; t1: number; t2: number }>
	>({})
	const [winterMode, setWinterMode] = useState<boolean>(false)
	const [isSaving, setIsSaving] = useState<boolean>(false)

	useEffect(() => {
		const initialDispensers: typeof dispensers = {}

		DISPENSER_IDS.forEach(id => {
			initialDispensers[id] = {
				enabled: selectedDevice[`dispenser_${id}_enabled`] ?? false,
				t1: selectedDevice[`dispenser_${id}_t1`] ?? 0,
				t2: selectedDevice[`dispenser_${id}_t2`] ?? 0,
			}
		})

		setDispensers(initialDispensers)
		setWinterMode(selectedDevice.winter_mode ?? false)
	}, [selectedDevice])

	const handleChange = (
		id: number,
		key: 'enabled' | 't1' | 't2',
		value: boolean | number
	) => {
		setDispensers(prev => ({
			...prev,
			[id]: {
				...prev[id],
				[key]: value,
			},
		}))
	}

	const handleSave = async () => {
		try {
			setIsSaving(true)

			const updatedParams: Partial<IPosDeviceDetails> = {
				winter_mode: winterMode,
			}

			DISPENSER_IDS.forEach(id => {
				updatedParams[`dispenser_${id}_enabled`] = dispensers[id].enabled
				updatedParams[`dispenser_${id}_t1`] = dispensers[id].t1
				updatedParams[`dispenser_${id}_t2`] = dispensers[id].t2
			})

			if (userRole === 'technician') {
				await PosDevicesService.updateTechnicianDevice(
					selectedDevice.id,
					updatedParams
				)
			} else {
				await PosDevicesService.updateDevice(selectedDevice.id, updatedParams)
			}
		} catch (error) {
			console.error('Ошибка при обновлении данных:', error)
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
				Настройка режима работы дозаторов
			</h2>
			<div className='space-y-4'>
				{DISPENSER_IDS.map(id => (
					<div key={id} className='flex items-center gap-4'>
						<label className='mr-1'>#{id}</label>
						<input
							type='checkbox'
							checked={dispensers[id]?.enabled || false}
							onChange={e => handleChange(id, 'enabled', e.target.checked)}
						/>

						<div className='flex items-center gap-2'>
							<label className='mr-1'>T1</label>
							<input
								type='number'
								className='block rounded-md border-gray-300 w-[70%] shadow-sm'
								value={dispensers[id]?.t1 || ''}
								onChange={e =>
									handleChange(id, 't1', parseInt(e.target.value) || 0)
								}
							/>
						</div>

						<div className='flex items-center gap-2'>
							<label className='mr-1'>T2</label>
							<input
								type='number'
								className='block rounded-md border-gray-300 w-[70%] shadow-sm'
								value={dispensers[id]?.t2 || ''}
								onChange={e =>
									handleChange(id, 't2', parseInt(e.target.value) || 0)
								}
							/>
						</div>
					</div>
				))}

				<div className='flex items-center gap-2'>
					<input
						type='checkbox'
						id='winterMode'
						checked={winterMode}
						onChange={e => setWinterMode(e.target.checked)}
					/>
					<label htmlFor='winterMode' className='mr-1'>
						Зимний режим
					</label>
				</div>

				<ButtonSave onClick={handleSave} disabled={isSaving} />
			</div>
		</div>
	)
}
