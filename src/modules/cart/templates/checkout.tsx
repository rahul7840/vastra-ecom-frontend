'use client';
import { Title } from '@/modules/common/components/Title';
import { RootState } from '@/store';
import { useEffect, useState } from 'react';
import { useSelector } from 'react-redux';
import { toast } from 'react-toastify';
import { Addresses } from '../components/Addresses';
import { CartSummary } from '../components/CartSummary';
import { useCartManager } from '../queries/use-cart-manager';

declare global {
	interface Window {
		Razorpay: any;
	}
}

export const CheckoutTemplate = () => {
	const { cart } = useCartManager();
	const charges = useSelector((state: RootState) => state.cart.shippingCharges);
	const [paymentMethods, setPaymentMethods] = useState<string[]>([]);

	useEffect(() => {
		const script = document.createElement('script');
		script.src = 'https://checkout.razorpay.com/v1/checkout.js';
		script.async = true;
		script.onload = () => {
			const rzp = new window.Razorpay({
				key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
			});
			rzp.once('ready', (response: any) => {
				setPaymentMethods(response.methods);
			});
		};
		document.body.appendChild(script);
	}, []);

	const handlePayment = async () => {
		if (!cart) {
			toast.error('Cart is empty');
			return;
		}

		try {
			if (!window) {
				toast.error('Razorpay is not available');
				return;
			}

			// const order = await api.order.createOrder(cart.id);

			// const razorpay = new window.Razorpay(order.data);
			// console.log('razorpay', razorpay);
			// razorpay.open();
		} catch (error) {
			console.error('Error creating order:', error);
			toast.error('Failed to initiate payment. Please try again.');
		}
	};

	console.log('payment methods', paymentMethods);

	return (
		<div>
			<Title className='my-12' text='Checkout' />

			<main className='container flex justify-between mx-auto px-4'>
				<div className='flex flex-col gap-4 w-full mr-8'>
					<div className='text-2xl font-semibold tracking-wide leading-snug text-neutral-800'>
						Shipping Address
					</div>
					<Addresses />

					<hr className='border-neutral-100' />

					<div className='text-2xl font-semibold tracking-wide leading-snug text-neutral-800'>
						Shipping
					</div>
					<div>
						<div>₹ {charges?.shippingCost} - Standard</div>
						<div>Delivery By: {charges?.estimatedDeliveryDate}</div>
					</div>

					<hr className='border-neutral-100' />

					<div className='text-2xl font-semibold tracking-wide leading-snug text-neutral-800'>
						Payment Method
					</div>
					<div>
						<button
							onClick={handlePayment}
							className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors'
						>
							Pay with Razorpay
						</button>
					</div>
				</div>
				<div className='flex flex-col gap-4'>
					<CartSummary checkout={true} />
				</div>
			</main>
		</div>
	);
};
