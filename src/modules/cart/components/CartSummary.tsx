'use client';
import { RootState } from '@/store';
import { useRouter } from 'next/navigation';
import React from 'react';
import { useSelector } from 'react-redux';
import { useCartManager } from '../queries/use-cart-manager';
import SummaryItem from './SummaryItem';
import { useMutation } from '@tanstack/react-query';
import { api } from '@/api';
import { toast } from 'react-toastify';

interface CartSummaryProps {
	checkout?: boolean;
}

export const CartSummary: React.FC<CartSummaryProps> = ({ checkout }) => {
	const { cart } = useCartManager();
	const disabledCheckoutButton = useSelector(
		(state: RootState) => state.cart.disabledCheckoutButton
	);

	const router = useRouter();

	const createOrderMutation = useMutation({
		mutationFn: () => api.order.createOrder(),
		onSuccess: () => {
			toast.success('Order created successfully.');
		},
		onError: () => {
			toast.error('Something went wrong.');
		},
	});

	const handlePlaceOrder = () => {
		createOrderMutation.mutate();
	};

	return (
		<section className='flex flex-col p-8 w-full bg-white border border-solid border-neutral-100 max-md:px-5'>
			<h2 className='text-xl md:text-2xl font-semibold tracking-wide leading-snug text-neutral-800'>
				Cart summary
			</h2>
			<div className='flex flex-col mt-5 w-full max-md:max-w-full'>
				<div className='flex flex-col pb-11 w-full max-md:max-w-full'>
					<SummaryItem label={'Subtotal'} value={cart?.subTotal ?? 0} />

					<SummaryItem
						label={'Shipping'}
						value={
							cart && cart.estimatedDeliveryDate.length > 0
								? cart.shippingCost
								: null
						}
					/>

					{checkout && cart?.codCharges ? (
						<SummaryItem
							label={'COD Charges'}
							value={cart ? cart?.codCharges : null}
						/>
					) : null}

					<SummaryItem label={'Total'} value={cart?.totalCost} />
				</div>
				<button
					onClick={() => {
						checkout ? handlePlaceOrder() : router.push('/checkout');
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
