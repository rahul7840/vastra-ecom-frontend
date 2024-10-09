import { api } from '@/api';
import { IApiError } from '@/api/types';
import { ICheckServiceability } from '@/modules/types/cart';
import { zodResolver } from '@hookform/resolvers/zod';
import { useMutation } from '@tanstack/react-query';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { toast } from 'react-toastify';
import { AddressForm } from './AddressForm';
import {
	BillingAddressSchema,
	billingAddressSchema,
	ContactInformation,
	ContactInformationSchema,
	ShippingAddressSchema,
	shippingAddressSchema,
} from './contact-info-schema';
import InputField from './InputField';
import { setShippingCharges } from '@/store/slices/cartSlice';
import { useDispatch } from 'react-redux';

export const CheckoutDetails: React.FC = () => {
	const [useDifferentBillingAddress, setUseDifferentBillingAddress] =
		useState(false);

	const methods = useForm<ContactInformation>({
		defaultValues: {
			email: 'test@gmail.com',
			firstName: 'test',
			lastName: 'test',
			phoneNumber: '9876543210',
		},
		resolver: zodResolver(ContactInformationSchema),
	});

	const billingAddressForm = useForm<billingAddressSchema>({
		resolver: zodResolver(BillingAddressSchema),
	});

	const shippingAddressForm = useForm<shippingAddressSchema>({
		defaultValues: {
			shippingAddress: 'BazarGate gate 1',
			shippingCity: 'BazarGate',
			shippingState: 'Mumbai',
			shippingZipCode: '400001',
		},
		resolver: zodResolver(ShippingAddressSchema),
	});

	const {
		register,
		handleSubmit,
		formState: { errors },
	} = methods;

	console.log('errors', errors);

	const dispatch = useDispatch();

	const mutation = useMutation({
		mutationFn: (data: ICheckServiceability) => api.shipping.getCharges(data),
		onSuccess: (response) => {
			dispatch(
				setShippingCharges({
					shippingCost: response.data.data?.shippingCost ?? 0,
					estimatedDeliveryDate:
						response.data.data?.estimatedDeliveryDate ?? '',
				})
			);
			toast.success('Signup successfully.');
		},
		onError: (error: IApiError) => {
			if (error.response?.data.message) {
				toast.error(error.response.data.message);
			}
		},
	});

	const onSubmit = (data: ContactInformation) => {
		shippingAddressForm.handleSubmit(onShippingSubmit)();

		if (useDifferentBillingAddress) {
			billingAddressForm.handleSubmit(onBillingSubmit)();
		}

		if (shippingAddressForm.getValues('shippingZipCode')) {
			mutation.mutate({
				cod: 0,
				delivery_postcode: shippingAddressForm.getValues('shippingZipCode'),
			});
		}
	};

	const onShippingSubmit = (data: shippingAddressSchema) => {};

	const onBillingSubmit = (data: billingAddressSchema) => {};

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className='flex flex-col tracking-wide leading-snug max-w-[688px]'
		>
			<section className='flex flex-col  py-12 w-full border-zinc-100 max-md:px-5 max-md:max-w-full'>
				<h2 className='text-2xl font-semibold text-neutral-800'>
					Contact Information
				</h2>
				<div className='flex flex-wrap gap-6 items-start mt-6 max-md:max-w-full'>
					<div className='flex flex-row gap-6 w-full'>
						<InputField
							label='First Name'
							placeholder='First name'
							inputProps={{
								...register('firstName'),
							}}
							error={errors.firstName?.message}
						/>
						<InputField
							label='Last Name'
							placeholder='Last name'
							inputProps={{
								...register('lastName'),
							}}
							error={errors.lastName?.message}
						/>
					</div>

					<InputField
						label='Phone Number'
						placeholder='Phone number'
						inputProps={{
							...register('phoneNumber', {
								required: 'Phone number is required',
								pattern: {
									value: /^[0-9+\-\s()]+$/,
									message: 'Invalid phone number format',
								},
							}),
						}}
						error={errors.phoneNumber?.message}
					/>
					<InputField
						label='Email address'
						placeholder='Your Email'
						inputProps={{
							...register('email'),
						}}
						error={errors.email?.message}
					/>
				</div>
			</section>

			<h2 className='text-2xl font-semibold text-neutral-800 mt-8 mb-4'>
				Shipping Address
			</h2>
			<AddressForm
				prefix='shipping'
				onSubmit={onShippingSubmit as any}
				form={shippingAddressForm as any}
			/>

			<label className='flex gap-3 items-center self-start mt-6 text-neutral-400 cursor-pointer'>
				<input
					type='checkbox'
					className='sr-only'
					checked={useDifferentBillingAddress}
					onChange={(e) => setUseDifferentBillingAddress(e.target.checked)}
				/>
				<span
					className={`flex items-center justify-center w-5 h-5 border border-neutral-400 rounded-sm ${
						useDifferentBillingAddress ? 'bg-red-700' : ''
					}`}
				>
					{useDifferentBillingAddress && (
						<svg
							className='w-3 h-3 text-white'
							fill='none'
							stroke='currentColor'
							viewBox='0 0 24 24'
							xmlns='http://www.w3.org/2000/svg'
						>
							<path
								strokeLinecap='round'
								strokeLinejoin='round'
								strokeWidth='2'
								d='M5 13l4 4L19 7'
							></path>
						</svg>
					)}
				</span>
				<span>Use a different billing address (optional)</span>
			</label>

			{useDifferentBillingAddress && (
				<>
					<h2 className='text-2xl font-semibold text-neutral-800 mt-8 mb-4'>
						Billing Address
					</h2>
					<AddressForm
						prefix='billing'
						onSubmit={onBillingSubmit as any}
						form={billingAddressForm as any}
					/>
				</>
			)}

			<button
				type='submit'
				className='gap-3 self-stretch px-8 py-3.5 mt-6 w-full text-2xl font-bold text-center text-white bg-red-700 max-md:px-5 max-md:max-w-full'
			>
				Place Order
			</button>
		</form>
	);
};
