import { ButtonSave } from '../../ui/Button'
import ConcentrationInput from '../ConcentrationInput'

const OTHER_SETTING_ITEMS = [
	{
		id: 'update',
		label: 'Обновить',
	},
	{
		id: 'firmwareVersion',
		label: 'Проверять версию прошивки',
	},
	{
		id: 'sms',
		label: 'Отправка смс',
	},
	{
		id: 'filterData',
		label: 'Отправка данных о фильтрах',
	},
	{
		id: 'signaling',
		label: 'Сигнализация',
	},
	{
		id: 'tdsSensor',
		label: 'Датчик TDS',
	},
	{
		id: 'oneBranch',
		label: 'Работа в одной филии',
	},
	{
		id: 'automaticPayment',
		label: 'Автооплата тарифа',
	},
]

export const Other = () => {
	return (
		<div>
			<h2 className='text-xl font-semibold mb-6'>Другие настройки</h2>
			<div className='space-y-4'>
				{OTHER_SETTING_ITEMS.map((item, index) => (
					<div key={index} className='flex items-center'>
						<input type='checkbox' id={item.id} className='mr-2' />
						<label htmlFor={item.id}>{item.label}</label>
					</div>
				))}

				<ConcentrationInput />

				<ButtonSave />
			</div>
		</div>
	)
}
