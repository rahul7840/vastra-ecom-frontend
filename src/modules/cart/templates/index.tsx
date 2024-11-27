'use client';
import { Title } from '@/modules/common/components/Title';
import ShoppingCartList from '../components/CartList';
import { CartSummary } from '../components/CartSummary';

export const CartTemplate = () => {
	return (
		<div>
			<Title className=' my-6 md:my-12' text='Cart' />

			<main className='flex flex-col justify-self-center items-center w-full 2xl:max-w-[110rem] xl:flex-row px-8 gap-8 lg:gap-10'>
				<div className='flex w-full xl:w-[60%]'>
					<ShoppingCartList />
				</div>
				<div className='flex flex-col gap-4 w-full xl:w-[40%]'>
					<CartSummary />
					{/* <CouponSection /> */}
				</div>
			</main>
		</div>
	);
};
