import { useState } from 'react'
import { ButtonSave } from '../../ui/Button'

interface DialSensorProps {
	isOn: boolean
	setIsOn: React.Dispatch<React.SetStateAction<boolean>>
}

export const DialSensor = ({ isOn, setIsOn }: DialSensorProps) => {
	// Литражи для настройки
	const litersArray = [1, 0.5, 1.0, 1.5, 2.0, 5.0, 6.0, 10.0, 12.0, 19.0]

	// Состояние для импульсов
	const [pulseValues, setPulseValues] = useState<{ [key: number]: number }>(
		() => Object.fromEntries(litersArray.map(l => [l, l === 1 ? 0 : 25])) // 1 л = 0, остальные = 25
	)

	// Обновление импульсов
	const handleInputChange = (liters: number, value: string) => {
		const newValue = parseInt(value, 10) || 0

		setPulseValues(prev => {
			const updatedValues = { ...prev, [liters]: newValue }

			// Если вводится значение для 1 л, пересчитываем другие
			if (liters === 1) {
				setIsOn(false) // Отключаем автоматический режим

				// Пересчитываем остальные литражи
				litersArray.forEach(l => {
					if (l !== 1) {
						updatedValues[l] = Math.round((newValue / 1) * l)
					}
				})
			}

			return updatedValues
		})
	}

	return (
		<div>
			<h2 className='text-xl font-semibold mb-6'>Настройка датчика набора</h2>
			<div className='space-y-4'>
				<div className='flex gap-3'>
					<label className='relative flex items-center cursor-pointer'>
						<input
							type='checkbox'
							className='sr-only'
							checked={isOn}
							onChange={() => setIsOn(!isOn)}
						/>
						<div
							className={`w-14 h-7 bg-gray-300 rounded-full p-1 transition ${
								isOn ? 'bg-green-500' : ''
							}`}
						>
							<div
								className={`w-5 h-5 bg-white rounded-full shadow-md transform transition ${
									isOn ? 'translate-x-7' : ''
								}`}
							></div>
						</div>
					</label>

					<p className='text-gray-400 font-semibold'>
						Рассчитать автоматически из:
					</p>
				</div>

				{litersArray.map((el, index) => (
					<div key={index} className='flex items-center gap-2'>
						<label className='block text-sm font-medium text-blue-300 mr-2'>
							{index === 0 ? el : el.toFixed(1)}л
						</label>
						<div className='mt-1 flex'>
							<input
								type='number'
								className='block w-full rounded-md border-gray-300 shadow-sm'
								value={pulseValues[el] || ''}
								onChange={e => handleInputChange(el, e.target.value)}
							/>
						</div>
						{index === 0 && (
							<p className='text-gray-400 font-semibold text-sm'>импульсов</p>
						)}
					</div>
				))}

				<ButtonSave />
			</div>
		</div>
	)
}
