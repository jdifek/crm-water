import { useEffect } from 'react'
import { useNavigate, useParams } from 'react-router-dom'
import { DeviceSidebar } from '../../components/Device/DeviceSidebar'
import { DeviceNavigate } from '../../components/Device/Navigate'
import { SelectDevice } from '../../components/Device/SelectDevice'
import { devices } from '../../data/device/device'
import { useDevice } from '../../helpers/context/DeviceContext'

const DeviceDetails = () => {
	const { deviceId } = useParams()
	const navigate = useNavigate()
	const { selectedDeviceId, setSelectedDeviceId } = useDevice()

	useEffect(() => {
		const newDeviceId = Number(deviceId)
		if (
			devices.some(d => d.id === newDeviceId) &&
			newDeviceId !== selectedDeviceId
		) {
			setSelectedDeviceId(newDeviceId)
		} else if (!devices.some(d => d.id === newDeviceId)) {
			navigate(`/devices/details/${devices[0].id}`, { replace: true })
		}
	}, [deviceId, navigate, setSelectedDeviceId, selectedDeviceId])

	const selectedDevice = devices.find(device => device.id === selectedDeviceId)
	if (!selectedDevice) {
		return <div>Устройство не найдено</div>
	}

	const infoSections = [
		{
			title: 'Аппарат',
			items: [
				{ label: 'IMEI', value: selectedDevice.imei },
				{ label: 'Серийный номер', value: selectedDevice.serial },
				{ label: 'Модель аппарата', value: selectedDevice.model },
				{
					label: 'Модель микроконтроллера',
					value: selectedDevice.microcontroller,
				},
			],
		},
		{
			title: 'Датчики',
			items: [
				{ label: 'Температура', value: selectedDevice.sensors.temperature },
				{ label: 'TDS', value: selectedDevice.sensors.tds },
			],
		},
		{
			title: 'Счетчики',
			items: [
				{
					label: 'Остаток продукта',
					value: selectedDevice.counters.productRemaining,
				},
				{
					label: 'Счетчик воды на входе',
					value: selectedDevice.counters.waterMeter,
				},
				{
					label: 'Счетчик электрической энергии',
					value: selectedDevice.counters.electricityMeter,
				},
			],
		},
		{
			title: 'Статистика',
			items: [
				{
					label: 'Всего продано воды со дня запуска',
					value: selectedDevice.statistics.totalWaterSold,
				},
				{
					label: 'Всего выручено денег со дня запуска',
					value: selectedDevice.statistics.totalRevenue,
				},
				{
					label: 'Количество монет за все время',
					value: selectedDevice.statistics.coinCount,
				},
				{
					label: 'Сумма монет за все время',
					value: selectedDevice.statistics.coinAmount,
				},
				{
					label: 'Сумма купюр за все время',
					value: selectedDevice.statistics.banknoteCount,
				},
				{
					label: 'Сумма купюр за все время',
					value: selectedDevice.statistics.banknoteAmount,
				},
				{
					label: 'Дата последней активности',
					value: selectedDevice.statistics.lastActivityDate,
				},
			],
		},
		{
			title: 'Связь',
			items: [
				{
					label: 'Тип подключения',
					value: selectedDevice.connectivity.connectionType,
				},
				{
					label: 'Номер SIM-карты',
					value: selectedDevice.connectivity.simNumber,
				},
				{
					label: 'Оператор связи',
					value: selectedDevice.connectivity.operator,
				},
				{
					label: 'Уровень сигнала',
					value: selectedDevice.connectivity.signalLevel,
				},
				{
					label: 'Баланс SIM-карты',
					value: selectedDevice.connectivity.simBalance,
				},
				{
					label: 'Дата последней активности',
					value: selectedDevice.connectivity.connectivityLastActivity,
				},
			],
		},
		{
			title: 'Продукты',
			items: [
				{
					label: 'Цена "очищена вода"',
					value: selectedDevice.products.cleanWaterPrice,
				},
			],
		},
		{
			title: 'Программное обеспечение',
			items: [
				{
					label: 'Версия прошивки главного контроллера',
					value: selectedDevice.software.firmwareVersionMainController,
				},
				{
					label: 'Версия прошивки контроллера подготовки воды',
					value: selectedDevice.software.firmwareVersionWaterPrepController,
				},
				{
					label: 'Версия прошивки контроллера Дисплея',
					value: selectedDevice.software.firmwareVersionDisplayController,
				},
				{
					label: 'Дата прошивки главного контроллера',
					value: selectedDevice.software.firmwareDateMainController,
				},
			],
		},
	]

	return (
		<div className='p-4 lg:p-8'>
			<SelectDevice />

			<div className='flex gap-3 flex-nowrap w-full'>
				<div className='bg-white rounded-lg shadow p-5 flex flex-col flex-1'>
					<DeviceNavigate />

					<div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
						{infoSections.map((section, sectionIndex) => (
							<div key={sectionIndex}>
								<h2 className='text-xl font-semibold mb-6'>{section.title}</h2>
								<div className='space-y-4'>
									{section.items.map((item, itemIndex) => (
										<div key={itemIndex} className='grid grid-cols-2 gap-4'>
											<div className='text-gray-600'>{item.label}</div>
											<div>{item.value}</div>
										</div>
									))}
								</div>
							</div>
						))}
					</div>
				</div>

				<DeviceSidebar />
			</div>
		</div>
	)
}

export default DeviceDetails
