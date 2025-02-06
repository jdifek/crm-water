import { devices } from '../../data/device/device'
import { useDevice } from '../../helpers/context/DeviceContext'

export const SelectDevice = () => {
	const { selectedDeviceId, handleDeviceChange } = useDevice()

	return (
		<select
			className='mb-3 border p-2 rounded'
			value={selectedDeviceId}
			onChange={handleDeviceChange}
		>
			{devices.map(device => (
				<option key={device.id} value={device.id}>
					{device.name}
				</option>
			))}
		</select>
	)
}
