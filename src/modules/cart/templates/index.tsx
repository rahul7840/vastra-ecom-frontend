'use client';
import { Title } from '@/modules/common/components/Title';
import { ICart } from '@/modules/types/cart';
import ShoppingCartList from '../components/CartList';
import { CartSummary } from '../components/CartSummary';
import { CouponSection } from '../components/CouponSection';
import { useCartManager } from '../queries/use-cart-manager';

export const CartTemplate = () => {
	const { cart } = useCartManager();

	return (
		<div>
			<Title className='my-12' text='Cart' />

			<main className='flex flex-col w-full md:flex-row justify-between px-4  lg:gap-10 lg:mx-auto'>
				<ShoppingCartList />
				<div className='flex flex-col gap-4'>
					<CartSummary />
					<CouponSection cart={cart as ICart} />
				</div>
			</main>
		</div>
	);
};
