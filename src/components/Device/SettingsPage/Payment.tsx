import { useEffect, useState } from 'react'
import PosDevicesService from '../../../api/PosDevices/PosDevicesService'
import { IPosDeviceDetails } from '../../../api/PosDevices/PosDevicesTypes'
import { ButtonSave } from '../../ui/Button'

interface IPaymentProps {
	selectedDevice: IPosDeviceDetails
	loading: boolean
}

const POS_TERMINAL_MODEL_OPTIONS = {
	'ingenico_(iUC180B,_Self/2000)': 'Ingenico iUC180B',
}

export const Payment = ({ selectedDevice, loading }: IPaymentProps) => {
	const [isSaving, setIsSaving] = useState<boolean>(false)
	const [posTerminalModel, setPosTerminalModel] = useState<string>('')
	const [useCustomerCards, setUseCustomerCards] = useState<boolean>(
		selectedDevice.use_customer_cards
	)
	const [useEnablePrivat24, setUseEnablePrivat24] = useState<boolean>(
		selectedDevice.enable_privat_24_payment
	)
	const [useSendMessage, setUseSendMessage] = useState<boolean>(
		selectedDevice.send_sms
	)

	useEffect(() => {
		const model = selectedDevice.pos_terminal_model.toLowerCase()
		setPosTerminalModel(POS_TERMINAL_MODEL_OPTIONS[model] || 'Ingenico iUC180B')
	}, [selectedDevice])

	const handleModelChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
		setPosTerminalModel(e.target.value)
	}

	useEffect(() => {
		setUseCustomerCards(selectedDevice.use_customer_cards)
		setUseEnablePrivat24(selectedDevice.enable_privat_24_payment)
		setUseSendMessage(selectedDevice.send_sms)
	}, [selectedDevice])

	const handleToggleCustomerCard = () => {
		setUseCustomerCards(!useCustomerCards)
	}
	const handleToggleEnablePrivat24 = () => {
		setUseEnablePrivat24(!useEnablePrivat24)
	}
	const handleToggleSendMessage = () => {
		setUseSendMessage(!useSendMessage)
	}

	const handleSave = async () => {
		const newModelKey = Object.keys(POS_TERMINAL_MODEL_OPTIONS).find(
			key => POS_TERMINAL_MODEL_OPTIONS[key] === posTerminalModel
		)

		try {
			setIsSaving(true)
			await PosDevicesService.updateDevice(selectedDevice.id, {
				use_customer_cards: useCustomerCards,
				enable_privat_24_payment: useEnablePrivat24,
				send_sms: useSendMessage,
				pos_terminal_model: newModelKey,
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
			<h2 className='text-xl font-semibold mb-6'>Настройки платежных систем</h2>
			<div className='space-y-4'>
				<div className='flex items-center'>
					<input
						checked={useCustomerCards}
						onChange={handleToggleCustomerCard}
						disabled={isSaving}
						type='checkbox'
						id='useCards'
						className='mr-2'
					/>
					<label htmlFor='useCards'>Использовать карты покупателей</label>
				</div>
				<div className='flex items-center'>
					<input
						type='checkbox'
						checked={useSendMessage}
						onChange={handleToggleSendMessage}
						disabled={isSaving}
						id='useSMS'
						className='mr-2'
					/>
					<label htmlFor='useSMS'>Отправка SMS</label>
				</div>
				<div className='flex items-center'>
					<input
						type='checkbox'
						checked={useEnablePrivat24}
						onChange={handleToggleEnablePrivat24}
						disabled={isSaving}
						id='useQR'
						className='mr-2'
					/>
					<label htmlFor='useQR'>Оплата QR-кодом (Приват24)</label>
				</div>

				<div>
					<label className='block text-sm font-medium text-gray-700'>
						Модель POS терминала
					</label>
					<select
						value={posTerminalModel}
						onChange={handleModelChange}
						className='mt-1 block w-full rounded-md border-gray-300 shadow-sm'
					>
						{Object.values(POS_TERMINAL_MODEL_OPTIONS).map(model => (
							<option key={model} value={model}>
								{model}
							</option>
						))}
					</select>
				</div>
				<div>
					<label className='block text-sm font-medium text-gray-700'>
						Идентификатор продавца
					</label>
					<input
						type='text'
						className='mt-1 block w-full rounded-md border-gray-300 shadow-sm'
						defaultValue={selectedDevice.vendor_id}
					/>
				</div>

				<ButtonSave onClick={handleSave} disabled={isSaving} />
			</div>
		</div>
	)
}

// import { useState } from 'react'
// import { ButtonSave } from '../../ui/Button'

// export const Payment = () => {
// 	const [showQR, setShowQR] = useState<boolean>(false)

// 	const paymentLink = 'https://pay.example.com/qr-payment' // example link

// 	return (
// 		<div>
// 			<h2 className='text-xl font-semibold mb-6'>Настройки платежных систем</h2>
// 			<div className='space-y-4'>
// 				<div className='flex items-center'>
// 					<input type='checkbox' id='useCards' className='mr-2' />
// 					<label htmlFor='useCards'>Использовать карты покупателей</label>
// 				</div>
// 				<div className='flex items-center'>
// 					<input type='checkbox' id='useSMS' className='mr-2' />
// 					<label htmlFor='useSMS'>Отправка SMS</label>
// 				</div>
// 				<div className='flex items-center'>
// 					<input
// 						type='checkbox'
// 						id='useQR'
// 						className='mr-2'
// 						checked={showQR}
// 						onChange={() => setShowQR(!showQR)}
// 					/>
// 					<label htmlFor='useQR'>Оплата QR-кодом (Приват24)</label>
// 				</div>

// 				{showQR && (
// 					<div className='p-4 border rounded-md shadow-md flex flex-col items-center'>
// 						<img
// 							src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(
// 								paymentLink
// 							)}`}
// 							alt='QR-код для оплаты'
// 							className='mb-2'
// 						/>
// 						<p className='text-sm text-gray-600'>Отсканируйте код для оплаты</p>
// 						<a
// 							href={paymentLink}
// 							target='_blank'
// 							rel='noopener noreferrer'
// 							className='text-blue-600 hover:underline mt-2'
// 						>
// 							Перейти к оплате
// 						</a>
// 					</div>
// 				)}

// 				<div>
// 					<label className='block text-sm font-medium text-gray-700'>
// 						Модель POS терминала
// 					</label>
// 					<select className='mt-1 block w-full rounded-md border-gray-300 shadow-sm'>
// 						<option>Ingenico iCT250</option>
// 					</select>
// 				</div>
// 				<div>
// 					<label className='block text-sm font-medium text-gray-700'>
// 						Идентификатор продавца
// 					</label>
// 					<input
// 						type='text'
// 						className='mt-1 block w-full rounded-md border-gray-300 shadow-sm'
// 						defaultValue='STK3223'
// 					/>
// 				</div>

// 				<ButtonSave />
// 			</div>
// 		</div>
// 	)
// }
