'use client';
import React from 'react';
import ShippingOption from './ShippingOption';
import SummaryItem from './SummaryItem';

interface CartSummaryProps {
	shippingOptions: Array<{
		label: string;
		price: string;
		isSelected: boolean;
	}>;
	summaryItems: Array<{
		label: string;
		value: string;
		isBold?: boolean;
	}>;
}

export const CartSummary: React.FC<CartSummaryProps> = ({
	shippingOptions,
	summaryItems,
}) => {
	return (
		<section className='flex flex-col p-8 max-w-full bg-white border border-solid border-neutral-100 w-[551px] max-md:px-5'>
			<h2 className='text-2xl font-semibold tracking-wide leading-snug text-neutral-800'>
				Cart summary
			</h2>
			<div className='flex flex-col mt-5 w-full max-md:max-w-full'>
				<div className='flex flex-col pb-11 w-full max-md:max-w-full'>
					<div className='flex flex-col pb-5 w-full max-md:max-w-full'>
						{shippingOptions.map((option, index) => (
							<ShippingOption
								name='shipping'
								onChange={() => {}}
								key={index}
								label={option.label}
								price={option.price}
								isSelected={option.isSelected}
							/>
						))}
					</div>
					{summaryItems.map((item, index) => (
						<SummaryItem
							key={index}
							label={item.label}
							value={item.value}
							isBold={item.isBold}
						/>
					))}
				</div>
				<button className='gap-3 self-stretch px-9 py-3.5 w-full text-2xl font-bold tracking-wide leading-snug text-center text-white whitespace-nowrap bg-red-700 max-md:px-5 max-md:max-w-full'>
					Checkout
				</button>
			</div>
		</section>
	);
};
