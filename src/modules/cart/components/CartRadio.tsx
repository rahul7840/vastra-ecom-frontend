interface CartRadioProps {
	label: string;
	name: string;
	isSelected: boolean;
	onChange: () => void;
}

export const CartRadio: React.FC<CartRadioProps> = ({
	label,
	name,
	isSelected,
	onChange,
}) => {
	return (
		<div className='relative w-6 h-6'>
			<input
				type='radio'
				id={label}
				name={name}
				checked={isSelected}
				onChange={onChange}
				className='absolute w-6 h-6 border border-solid border-neutral-800 rounded-full appearance-none cursor-pointer checked:border-[#222222] focus:outline-none focus:ring-2 focus:ring-[#222222]'
			/>
			{isSelected && (
				<div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-[#222222] rounded-full'></div>
			)}
		</div>
	);
};
