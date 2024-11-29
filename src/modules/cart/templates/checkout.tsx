'use client';
import { Title } from '@/modules/common/components/Title';
import { useState } from 'react';
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
	const [paymentMethods, setPaymentMethods] = useState<string[]>([]);

	// useEffect(() => {
	// 	if (typeof window === 'undefined') return;
	// 	const script = document.createElement('script');
	// 	script.src = 'https://checkout.razorpay.com/v1/checkout.js';
	// 	script.async = true;
	// 	script.onload = () => {
	// 		const rzp = new window.Razorpay({
	// 			key: process.env.NEXT_PUBLIC_RAZORPAY_KEY_ID,
	// 		});
	// 		rzp.once('ready', (response: any) => {
	// 			setPaymentMethods(response.methods);
	// 		});
	// 	};
	// 	document.body.appendChild(script);
	// }, []);

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

			<main className='flex flex-col md:flex-row justify-between mx-auto px-4 w-full md:gap-8 lg:max-w-7xl'>
				<div className='flex flex-col gap-4 w-full lg:w-3/4'>
					<div className='text-2xl font-semibold tracking-wide leading-snug text-neutral-800'>
						Shipping Address
					</div>
					<Addresses />

					<hr className='border-neutral-100' />

					<div className='text-2xl font-semibold tracking-wide leading-snug text-neutral-800'>
						Shipping
					</div>
					<div>
						<div>₹ {cart?.shippingCost} - Standard</div>
						<div>Delivery By: {cart?.estimatedDeliveryDate}</div>
					</div>

					<hr className='border-neutral-100' />

					<div className='text-2xl font-semibold tracking-wide leading-snug text-neutral-800'>
						Payment Method
					</div>
					{/* <div>
						<button
							onClick={handlePayment}
							className='px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 transition-colors'
						>
							Pay with Razorpay
						</button>
					</div> */}
				</div>
				<div className='flex flex-col gap-4 w-full mt-4 sm:mt-0 lg:w-1/3'>
					<CartSummary checkout={true} />
				</div>
			</main>
		</div>
	);
};
