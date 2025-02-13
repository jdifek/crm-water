interface IButtonSaveProps {
	onClick: () => void
	disabled?: boolean
}

export const ButtonSave = ({ onClick, disabled }: IButtonSaveProps) => {
	return (
		<button
			onClick={onClick}
			disabled={disabled}
			className={`bg-blue-500 text-white px-4 py-2 rounded ${
				disabled ? 'opacity-50 cursor-not-allowed' : ''
			}`}
		>
			{disabled ? 'Сохранение...' : 'Сохранить'}
		</button>
	)
}
