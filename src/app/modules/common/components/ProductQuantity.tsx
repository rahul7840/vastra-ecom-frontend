'use client';
import { useState } from 'react';

interface ProductQuantityProps {
	initialQuantity: number;
}

export const ProductQuantity: React.FC<ProductQuantityProps> = ({
	initialQuantity,
}) => {
	const [quantity, setQuantity] = useState(initialQuantity);

	const incrementQuantity = () => {
		setQuantity((prev) => Math.min(prev + 1, 10));
	};

	const decrementQuantity = () => {
		setQuantity((prev) => Math.max(prev - 1, 1));
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
