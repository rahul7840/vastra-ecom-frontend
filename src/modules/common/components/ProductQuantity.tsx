'use client';

interface ProductQuantityProps {
	quantity: number;
	handleQuantityChange: any;
}

export const ProductQuantity: React.FC<ProductQuantityProps> = ({
	quantity,
	handleQuantityChange,
}) => {
	const incrementQuantity = () => {
		handleQuantityChange(Math.min(quantity + 1, 10));
	};

	const decrementQuantity = () => {
		handleQuantityChange(Math.max(quantity - 1, 1));
	};

	return (
		<div className='flex justify-between items-center self-stretch px-4 py-2.5 my-auto whitespace-nowrap border border-solid border-neutral-800 min-h-[51px] text-neutral-500 w-[125px]'>
			<button onClick={decrementQuantity} className='self-stretch my-auto'>
				-
			</button>
			<span className='self-stretch my-auto tracking-wide text-neutral-700'>
				{quantity}
			</span>
			<button onClick={incrementQuantity} className='self-stretch my-auto'>
				+
			</button>
		</div>
	);
};
