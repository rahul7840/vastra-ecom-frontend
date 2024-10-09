'use client';
import { Title } from '@/modules/common/components/Title';
import { RootState } from '@/store';
import { useSelector } from 'react-redux';
import ShoppingCartList from '../components/CartList';
import { CartProgress } from '../components/CartProgress';
import { CartSummary } from '../components/CartSummary';
import { CheckoutDetails } from '../components/CheckoutDetails';
import { CouponSection } from '../components/CouponSection';
import { useCartManager } from '../queries/use-cart-manager';
import { ICart } from '@/modules/types/cart';

export const CartTemplate = () => {
	const { progressStep } = useSelector((state: RootState) => state.cart);
	const { cart } = useCartManager();

	const steps = [
		<CheckoutDetails />,
		<ShoppingCartList cart={cart as ICart} />,
	];

	const labelSteps = [
		{ number: 1, text: 'Checkout details' },
		{ number: 2, text: 'Shopping cart' },
		{ number: 3, text: 'Order complete' },
	];

	return (
		<div>
			<Title className='my-12' text='Cart' />

			<CartProgress currentStep={progressStep} steps={labelSteps} />

			<main className='container flex justify-between mx-auto px-4'>
				{steps[progressStep - 1]}
				<div className='flex flex-col gap-4'>
					<CartSummary cart={cart as ICart} />
					<CouponSection cart={cart as ICart} />
				</div>
			</main>
		</div>
	);
};
