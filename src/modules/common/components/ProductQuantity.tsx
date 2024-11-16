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
		<div className='flex justify-between items-center px-4 py-2.5 whitespace-nowrap border border-solid border-neutral-800 h-[45px] md:h-[51px] text-neutral-500 w-24 md:w-32'>
			<button onClick={decrementQuantity}>-</button>
			<span className='text-lg text-neutral-700'>{quantity}</span>
			<button onClick={incrementQuantity}>+</button>
		</div>
	);
};
