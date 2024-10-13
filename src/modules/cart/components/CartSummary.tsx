'use client';
import { RootState } from '@/store';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useSelector } from 'react-redux';
import { useCartManager } from '../queries/use-cart-manager';
import SummaryItem from './SummaryItem';

interface CartSummaryProps {
	checkout?: boolean;
}

export const CartSummary: React.FC<CartSummaryProps> = ({ checkout }) => {
	const { cart } = useCartManager();
	const charges = useSelector((state: RootState) => state.cart.shippingCharges);
	const disabledCheckoutButton = useSelector(
		(state: RootState) => state.cart.disabledCheckoutButton
	);

	const router = useRouter();

	return (
		<section className='flex flex-col p-8 max-w-full bg-white border border-solid border-neutral-100 w-[551px] max-md:px-5'>
			<h2 className='text-2xl font-semibold tracking-wide leading-snug text-neutral-800'>
				Cart summary
			</h2>
			<div className='flex flex-col mt-5 w-full max-md:max-w-full'>
				<div className='flex flex-col pb-11 w-full max-md:max-w-full'>
					<SummaryItem label={'Subtotal'} value={charges?.subTotal ?? 0} />

					<SummaryItem
						label={'Shipping'}
						value={
							charges && charges.estimatedDeliveryDate.length > 0
								? charges.shippingCost
								: null
						}
					/>

					{checkout && charges?.codCharges ? (
						<SummaryItem
							label={'COD Charges'}
							value={charges ? charges.codCharges : null}
						/>
					) : null}

					<SummaryItem label={'Total'} value={charges?.totalCost} />
				</div>
				<button
					onClick={() => {
						checkout ? '' : router.push('/checkout');
					}}
					disabled={
						checkout
							? disabledCheckoutButton
							: !cart || cart?.cartItems?.length === 0
					}
					className='gap-3 disabled:opacity-50 disabled:cursor-not-allowed self-stretch px-9 py-3.5 w-full text-2xl font-bold tracking-wide leading-snug text-center text-white whitespace-nowrap bg-red-700 max-md:px-5 max-md:max-w-full'
				>
					{checkout ? 'Place Order' : 'Checkout'}
				</button>
			</div>
		</section>
	);
};
