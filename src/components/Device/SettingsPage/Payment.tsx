import { useState } from 'react'
import { ButtonSave } from '../../ui/Button'

export const Payment = () => {
	const [showQR, setShowQR] = useState<boolean>(false)

	const paymentLink = 'https://pay.example.com/qr-payment' // example link

	return (
		<div>
			<h2 className='text-xl font-semibold mb-6'>Настройки платежных систем</h2>
			<div className='space-y-4'>
				<div className='flex items-center'>
					<input type='checkbox' id='useCards' className='mr-2' />
					<label htmlFor='useCards'>Использовать карты покупателей</label>
				</div>
				<div className='flex items-center'>
					<input type='checkbox' id='useSMS' className='mr-2' />
					<label htmlFor='useSMS'>Отправка SMS</label>
				</div>
				<div className='flex items-center'>
					<input
						type='checkbox'
						id='useQR'
						className='mr-2'
						checked={showQR}
						onChange={() => setShowQR(!showQR)}
					/>
					<label htmlFor='useQR'>Оплата QR-кодом (Приват24)</label>
				</div>

				{showQR && (
					<div className='p-4 border rounded-md shadow-md flex flex-col items-center'>
						<img
							src={`https://api.qrserver.com/v1/create-qr-code/?size=150x150&data=${encodeURIComponent(
								paymentLink
							)}`}
							alt='QR-код для оплаты'
							className='mb-2'
						/>
						<p className='text-sm text-gray-600'>Отсканируйте код для оплаты</p>
						<a
							href={paymentLink}
							target='_blank'
							rel='noopener noreferrer'
							className='text-blue-600 hover:underline mt-2'
						>
							Перейти к оплате
						</a>
					</div>
				)}

				<div>
					<label className='block text-sm font-medium text-gray-700'>
						Модель POS терминала
					</label>
					<select className='mt-1 block w-full rounded-md border-gray-300 shadow-sm'>
						<option>Ingenico iCT250</option>
					</select>
				</div>
				<div>
					<label className='block text-sm font-medium text-gray-700'>
						Идентификатор продавца
					</label>
					<input
						type='text'
						className='mt-1 block w-full rounded-md border-gray-300 shadow-sm'
						defaultValue='STK3223'
					/>
				</div>

				<ButtonSave />
			</div>
		</div>
	)
}
