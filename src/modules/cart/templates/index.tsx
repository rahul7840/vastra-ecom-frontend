'use client';
import { Title } from '@/modules/common/components/Title';
import ShoppingCartList from '../components/CartList';
import { CartSummary } from '../components/CartSummary';

export const CartTemplate = () => {
	return (
		<div>
			<Title className=' my-6 md:my-12' text='Cart' />

			<main className='flex flex-col w-full lg:max-w-7xl md:flex-row justify-between px-4 gap-8 lg:gap-10 lg:mx-auto'>
				<div className='flex w-full lg:w-3/4'>
					<ShoppingCartList />
				</div>
				<div className='flex flex-col gap-4 w-full lg:w-2/4'>
					<CartSummary />
					{/* <CouponSection /> */}
				</div>
			</main>
		</div>
	);
};
