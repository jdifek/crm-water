import { DeviceSidebar } from '../../components/Device/DeviceSidebar'
import { DeviceNavigate } from '../../components/Device/Navigate'
import { SelectDevice } from '../../components/Device/SelectDevice'
import { useDevice } from '../../helpers/context/DeviceContext'

const DeviceDetails = () => {
	const { selectedDevice, loading, error } = useDevice()

	if (loading) return <p>Загрузка устройства...</p>
	if (error) return <p className='text-red-500'>{error}</p>
	if (!selectedDevice) return <p>Устройство не найдено</p>

	console.log('selectedDevice:', selectedDevice)

	const infoSections = [
		{
			title: 'Аппарат',
			items: [
				{ label: 'IMEI', value: selectedDevice.imei },
				{ label: 'Серийный номер', value: selectedDevice.serial_number },
				{ label: 'Модель аппарата', value: selectedDevice.device_model },
				{
					label: 'Модель купюроприемника',
					value: selectedDevice.bill_acceptor_model,
				},
				{
					label: 'Модель монетоприемника',
					value: selectedDevice.coin_acceptor_model,
				},
				{
					label: 'Интерфейс пользователя',
					value: selectedDevice.user_interface,
				},
				{
					label: 'Язык интерфейса',
					value: selectedDevice.interface_language,
				},
				{
					label: 'Дата создания',
					value: selectedDevice.creation_date,
				},
			],
		},
		{
			title: 'Датчики',
			items: [
				{ label: 'Температура', value: selectedDevice.temperature },
				{ label: 'ТДС', value: selectedDevice.tds },
			],
		},
		{
			title: 'Счетчики',
			items: [
				{
					label: 'Остаток продукта',
					value: selectedDevice.product_balance,
				},
				{
					label: 'Счетчик воды на входе',
					value: selectedDevice.water_inlet_counter,
				},
				{
					label: 'Счетчик электрической энергии',
					value: selectedDevice.electricity_counter,
				},
			],
		},
		{
			title: 'Статистика',
			items: [
				{
					label: 'Всего продано воды со дня запуска',
					value: selectedDevice.total_water_sold,
				},
				{
					label: 'Всего выручено денег со дня запуска',
					value: selectedDevice.total_money_earned,
				},
				{
					label: 'Количество монет за все время',
					value: selectedDevice.total_coins_quantity,
				},
				{
					label: 'Сумма монет за все время',
					value: selectedDevice.total_coins_earned,
				},
				{
					label: 'Количество купюр за все время',
					value: selectedDevice.total_bills_quantity,
				},
				{
					label: 'Сумма купюр за все время',
					value: selectedDevice.total_bills_earned,
				},
			],
		},
		{
			title: 'Связь',
			items: [
				{
					label: 'Тип подключения',
					value: selectedDevice.connection_type,
				},
				{
					label: 'Номер SIM-карты',
					value: selectedDevice.sim_card_number,
				},
				{
					label: 'Оператор связи',
					value: selectedDevice.telecom_operator,
				},
				{
					label: 'Уровень сигнала',
					value: selectedDevice.signal_level,
				},
				{
					label: 'Баланс SIM-карты',
					value: selectedDevice.sim_card_balance,
				},
				{
					label: 'Дата последней активности',
					value: selectedDevice.date_of_last_activity,
				},
			],
		},
		{
			title: 'Продукты',
			items: selectedDevice.products.length
				? selectedDevice.products.map(product => ({
						label: `Цена "${product.name}"`,
						value: product.price,
				  }))
				: [{ label: 'Продукты отсутствуют', value: '-' }],
		},
		{
			title: 'Программное обеспечение',
			items: [
				{
					label: 'Версия прошивки главного контроллера',
					value: selectedDevice.main_controller_firmware_version,
				},
				{
					label: 'Версия прошивки контроллера подготовки воды',
					value: selectedDevice.water_preapration_controller_firmware_version,
				},
				{
					label: 'Версия прошивки контроллера Дисплея',
					value: selectedDevice.display_controller_firmware_version,
				},
				{
					label: 'Дата прошивки главного контроллера',
					value: selectedDevice.main_controller_firmware_date,
				},
			],
		},
	]

	console.log('infoSections:', infoSections)

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
									{section.items?.map((item, itemIndex) => (
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

// import { DeviceSidebar } from '../../components/Device/DeviceSidebar'
// import { DeviceNavigate } from '../../components/Device/Navigate'
// import { SelectDevice } from '../../components/Device/SelectDevice'
// import { devices } from '../../data/device/device'
// import { useDevice } from '../../helpers/context/DeviceContext'

// const DeviceDetails = () => {
// 	const { selectedDeviceId } = useDevice()

// 	const selectedDevice = devices.find(device => device.id === selectedDeviceId)
// 	if (!selectedDevice) {
// 		return <div>Устройство не найдено</div>
// 	}

// 	const infoSections = [
// 		{
// 			title: 'Аппарат',
// 			items: [
// 				{ label: 'IMEI', value: selectedDevice.imei },
// 				{ label: 'Серийный номер', value: selectedDevice.serial },
// 				{ label: 'Модель аппарата', value: selectedDevice.model },
// 				{
// 					label: 'Модель купюроприемника',
// 					value: selectedDevice.banknoteSuccessor,
// 				},
// 				{
// 					label: 'Модель монетоприемника',
// 					value: selectedDevice.coinsSuccessor,
// 				},
// 				{
// 					label: 'Интерфейс пользователя',
// 					value: selectedDevice.userInterface,
// 				},
// 				{
// 					label: 'Язык интерфейса',
// 					value: selectedDevice.interfaceLanguage,
// 				},
// 				{
// 					label: 'Дата создания',
// 					value: selectedDevice.createdDate,
// 				},
// 			],
// 		},
// 		{
// 			title: 'Датчики',
// 			items: [
// 				{ label: 'Температура', value: selectedDevice.sensors.temperature },
// 				{ label: 'ТДС', value: selectedDevice.sensors.tds },
// 			],
// 		},
// 		{
// 			title: 'Счетчики',
// 			items: [
// 				{
// 					label: 'Остаток продукта',
// 					value: selectedDevice.counters.productRemaining,
// 				},
// 				{
// 					label: 'Счетчик воды на входе',
// 					value: selectedDevice.counters.waterMeter,
// 				},
// 				{
// 					label: 'Счетчик электрической энергии',
// 					value: selectedDevice.counters.electricityMeter,
// 				},
// 			],
// 		},
// 		{
// 			title: 'Статистика',
// 			items: [
// 				{
// 					label: 'Всего продано воды со дня запуска',
// 					value: selectedDevice.statistics.totalWaterSold,
// 				},
// 				{
// 					label: 'Всего выручено денег со дня запуска',
// 					value: selectedDevice.statistics.totalRevenue,
// 				},
// 				{
// 					label: 'Количество монет за все время',
// 					value: selectedDevice.statistics.coinCount,
// 				},
// 				{
// 					label: 'Сумма монет за все время',
// 					value: selectedDevice.statistics.coinAmount,
// 				},
// 				{
// 					label: 'Сумма купюр за все время',
// 					value: selectedDevice.statistics.banknoteCount,
// 				},
// 				{
// 					label: 'Сумма купюр за все время',
// 					value: selectedDevice.statistics.banknoteAmount,
// 				},
// 			],
// 		},
// 		{
// 			title: 'Связь',
// 			items: [
// 				{
// 					label: 'Тип подключения',
// 					value: selectedDevice.connectivity.connectionType,
// 				},
// 				{
// 					label: 'Номер SIM-карты',
// 					value: selectedDevice.connectivity.simNumber,
// 				},
// 				{
// 					label: 'Оператор связи',
// 					value: selectedDevice.connectivity.operator,
// 				},
// 				{
// 					label: 'Уровень сигнала',
// 					value: selectedDevice.connectivity.signalLevel,
// 				},
// 				{
// 					label: 'Баланс SIM-карты',
// 					value: selectedDevice.connectivity.simBalance,
// 				},
// 				{
// 					label: 'Дата последней активности',
// 					value: selectedDevice.connectivity.connectivityLastActivity,
// 				},
// 			],
// 		},
// 		{
// 			title: 'Продукты',
// 			items: [
// 				{
// 					label: 'Цена "очищена вода"',
// 					value: selectedDevice.products.cleanWaterPrice,
// 				},
// 			],
// 		},
// 		{
// 			title: 'Программное обеспечение',
// 			items: [
// 				{
// 					label: 'Версия прошивки главного контроллера',
// 					value: selectedDevice.software.firmwareVersionMainController,
// 				},
// 				{
// 					label: 'Версия прошивки контроллера подготовки воды',
// 					value: selectedDevice.software.firmwareVersionWaterPrepController,
// 				},
// 				{
// 					label: 'Версия прошивки контроллера Дисплея',
// 					value: selectedDevice.software.firmwareVersionDisplayController,
// 				},
// 				{
// 					label: 'Дата прошивки главного контроллера',
// 					value: selectedDevice.software.firmwareDateMainController,
// 				},
// 			],
// 		},
// 	]

// 	return (
// 		<div className='p-4 lg:p-8'>
// 			<SelectDevice />

// 			<div className='flex gap-3 flex-nowrap w-full'>
// 				<div className='bg-white rounded-lg shadow p-5 flex flex-col flex-1'>
// 					<DeviceNavigate />

// 					<div className='grid grid-cols-1 lg:grid-cols-2 gap-8'>
// 						{infoSections.map((section, sectionIndex) => (
// 							<div key={sectionIndex}>
// 								<h2 className='text-xl font-semibold mb-6'>{section.title}</h2>
// 								<div className='space-y-4'>
// 									{section.items.map((item, itemIndex) => (
// 										<div key={itemIndex} className='grid grid-cols-2 gap-4'>
// 											<div className='text-gray-600'>{item.label}</div>
// 											<div>{item.value}</div>
// 										</div>
// 									))}
// 								</div>
// 							</div>
// 						))}
// 					</div>
// 				</div>

// 				<DeviceSidebar />
// 			</div>
// 		</div>
// 	)
// }

// export default DeviceDetails
