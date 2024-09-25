import React from 'react';
import { ProductQuantity } from '../../common/components/ProductQuantity';

interface ShoppingCartItemProps {
	imageSrc: string;
	productName: string;
	color: string;
	price: number;
	quantity: number;
}

export const ShoppingCartItem: React.FC<ShoppingCartItemProps> = ({
	imageSrc,
	productName,
	color,
	price,
	quantity,
}) => {
	return (
		<article className='flex my-6 gap-14 justify-between items-center w-full max-md:max-w-full'>
			<div className='flex gap-8 items-center self-stretch my-auto min-w-[240px]'>
				<img
					loading='lazy'
					src={imageSrc}
					alt={`${productName} in ${color}`}
					className='object-contain shrink-0 self-stretch my-auto aspect-[0.84] w-[107px]'
				/>
				<div className='flex gap-5 items-start self-stretch my-auto min-w-[240px] w-[280px]'>
					<div className='flex flex-col justify-center min-w-[240px] w-[280px]'>
						<div className='flex flex-col w-full'>
							<h3 className='text-xl font-semibold text-neutral-900'>
								{productName}
							</h3>
							<p className='mt-2 text-sm text-zinc-500'>Color: {color}</p>
						</div>
						<button className='flex gap-1 items-center self-start mt-3 text-lg font-semibold whitespace-nowrap border-0 border-solid border-zinc-600 text-zinc-600'>
							<img
								loading='lazy'
								src='https://cdn.builder.io/api/v1/image/assets/TEMP/45422142bd2f78eb70ac24c02f6e039b8c76a09e7f5fd7b035e31d75c080ca18?placeholderIfAbsent=true&apiKey=58620f448f4d4934b34d4e1e054160c6'
								alt=''
								className='object-contain shrink-0 self-stretch my-auto w-5 aspect-square'
							/>
							<span className='self-stretch my-auto'>Remove</span>
						</button>
					</div>
				</div>
			</div>
			<div className='flex gap-10 justify-between items-center self-stretch my-auto text-2xl font-semibold whitespace-nowrap min-w-[240px] w-[435px] max-md:max-w-full'>
				<ProductQuantity initialQuantity={quantity} />
				<div className='self-stretch my-auto text-right text-neutral-800'>
					${(price * quantity).toFixed(2)}
				</div>
			</div>
		</article>
	);
};
