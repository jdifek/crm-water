import { ButtonSave } from '../../ui/Button'

export const DispenserMode = () => {
	return (
		<div>
			<h2 className='text-xl font-semibold mb-6'>
				Настройка режима работы дозаторов
			</h2>
			<div className='space-y-4'>
				{[1, 2, 3, 4].map((el, index) => (
					<>
						<div key={index} className='flex'>
							<label className='mr-1'>#{el}</label>
							<input className='mr-6' type='checkbox' />

							<div className='flex items-center gap-2'>
								<label className='mr-1'>T1</label>
								<div className='mt-1 flex'>
									<input
										type='number'
										className='block rounded-md border-gray-300 w-[70%] shadow-sm'
										defaultValue='25'
									/>
								</div>
							</div>
							<div className='flex items-center gap-2'>
								<label className='mr-1'>T2</label>
								<div className='mt-1 flex'>
									<input
										type='number'
										className='block rounded-md border-gray-300 w-[70%] shadow-sm'
										defaultValue='25'
									/>
								</div>
							</div>
						</div>
					</>
				))}

				<div className='flex'>
					<input
						className='mr-6 inline-block'
						type='checkbox'
						id='winterMode'
					/>
					<label htmlFor='winterMode' className='mr-1'>
						Зимний режим
					</label>
				</div>

				<ButtonSave />
			</div>
		</div>
	)
}
