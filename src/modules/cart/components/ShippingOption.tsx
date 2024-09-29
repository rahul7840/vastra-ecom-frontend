'use client';
import React from 'react';
import { CartRadio } from './CartRadio';

interface ShippingOptionProps {
	label: string;
	price: string;
	isSelected: boolean;
	onChange: () => void;
	name: string;
}

const ShippingOption: React.FC<ShippingOptionProps> = ({
	label,
	price,
	isSelected,
	onChange,
	name,
}) => {
	return (
		<div
			className={`flex gap-10 items-center px-5 py-4 w-full border border-solid ${
				isSelected
					? 'bg-neutral-50 border-neutral-500'
					: 'bg-white border-zinc-100'
			} max-md:px-5 max-md:max-w-full`}
		>
			<div className='flex flex-1 shrink gap-5 justify-between self-stretch py-px my-auto w-full basis-0 min-w-[240px] max-md:max-w-full'>
				<div className='flex gap-4 items-center self-start'>
					<CartRadio
						label={label}
						name={name}
						isSelected={isSelected}
						onChange={onChange}
					/>

					<label
						htmlFor={label}
						className='self-stretch my-auto text-2xl font-semibold tracking-wide leading-snug text-neutral-800'
					>
						{label}
					</label>
				</div>
				<div className='text-2xl font-semibold tracking-wide leading-snug text-right text-neutral-800'>
					{price}
				</div>
			</div>
		</div>
	);
};

export default ShippingOption;
