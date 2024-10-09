'use client';
import { useState } from 'react';
import CouponList from './CouponList';
import { ICart } from '@/modules/types/cart';

interface CouponSectionProps {
	cart: ICart;
}

export const CouponSection: React.FC<CouponSectionProps> = ({ cart }) => {
	const [isDrawerOpen, setIsDrawerOpen] = useState(false);

	const openDrawer = () => setIsDrawerOpen(true);
	const closeDrawer = () => setIsDrawerOpen(false);

	return (
		<form className='flex flex-col justify-center px-5 mt-10 w-full max-md:px-5 max-md:max-w-full'>
			<div className='flex flex-col w-full max-md:max-w-full'>
				<h2 className='text-xl text-start font-semibold text-neutral-800 max-md:max-w-full'>
					Have an coupon?
				</h2>
				<p className='mt-2.5 text-lg text-neutral-400 max-md:max-w-full'>
					Add your code for an instant discount
				</p>
			</div>
			<div className='flex mt-4 gap-3 items-center border border-solid border-neutral-400 w-full px-5 h-[69px] max-md:max-w-full'>
				<img
					src={'/assets/images/coupon.svg'}
					alt=''
					className='object-contain shrink-0 self-stretch my-auto w-8 aspect-square'
				/>
				<input
					type='text'
					placeholder='Coupon code'
					className='w-full text-xl bg-transparent border-0 border-solid h-[69px]  text-neutral-800 focus:outline-none'
				/>
				<button className='flex gap-1 items-center self-stretch my-auto text-2xl font-semibold whitespace-nowrap text-neutral-800'>
					Apply
				</button>
			</div>
			<button
				type='button'
				onClick={openDrawer}
				className='text-xl mt-4 text-start font-normal text-neutral-900'
			>
				Check Coupon Code
			</button>
			{/* <CouponList /> */}

			{isDrawerOpen && (
				<div className='fixed inset-0 bg-black bg-opacity-50 z-50'>
					<div className='fixed right-0 h-full w-[26rem] bg-white shadow-lg transition-transform duration-300 ease-in-out transform translate-x-0 p-4 overflow-y-auto scrollbar-custom'>
						<CouponList onClose={closeDrawer} />
					</div>
				</div>
			)}
		</form>
	);
};
