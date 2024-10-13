import { IUpdateAddress } from '@/modules/types/cart';
import { zodResolver } from '@hookform/resolvers/zod';
import React, { useCallback, useEffect, useState } from 'react';
import { useForm, UseFormReturn } from 'react-hook-form';
import { useCartManager } from '../queries/use-cart-manager';
import { AddressForm } from './AddressForm';
import {
	billingAddressSchema,
	BillingAddressSchema,
	shippingAddressSchema,
	ShippingAddressSchema,
} from './contact-info-schema';

export const Addresses: React.FC = () => {
	const { cart, updateAddressMutation, validatePincode } = useCartManager();

	const [isPincodeLoading, setIsPincodeLoading] = useState(false);

	const [useDifferentBillingAddress, setUseDifferentBillingAddress] =
		useState(false);

	const [showForm, setShowForm] = useState(false);

	const shippingAddressForm = useForm<shippingAddressSchema>({
		resolver: zodResolver(ShippingAddressSchema),
	});

	const billingAddressForm = useForm<billingAddressSchema>({
		resolver: zodResolver(BillingAddressSchema),
	});

	const onSubmit = async (
		data: shippingAddressSchema | billingAddressSchema
	) => {
		console.log(
			'shipping dataa logs 3333333 ',
			shippingAddressForm.getValues()
		);
		const isValid = await shippingAddressForm.trigger();
		console.log('isValid', isValid);
		if (!isValid) return;

		if (useDifferentBillingAddress) {
			const isValidBilling = await billingAddressForm.trigger();
			console.log('isValidBilling', isValidBilling);
			if (!isValidBilling) return;
		}

		const shippingFormData = shippingAddressForm.getValues();
		const billingData = billingAddressForm.getValues();

		const shippingData = {
			firstName: shippingFormData.shippingFirstName,
			lastName: shippingFormData.shippingLastName,
			address: shippingFormData.shippingAddress,
			address2: shippingFormData.shippingAddress2,
			email: shippingFormData.shippingEmail,
			phone: shippingFormData.shippingPhone,
			city: shippingFormData.shippingCity,
			state: shippingFormData.shippingState,
			pincode: Number(shippingFormData.shippingPincode),
			country: 'India',
		};

		const addressData: IUpdateAddress = {
			shipping: shippingData,
			billing_same_as_shipping: !useDifferentBillingAddress,
			billing: useDifferentBillingAddress
				? {
						firstName: billingData.billingFirstName ?? '',
						lastName: billingData.billingLastName ?? '',
						address: billingData.billingAddress ?? '',
						address2: billingData.billingAddress2 ?? '',
						email: billingData.billingEmail ?? '',
						phone: billingData.billingPhone ?? '',
						city: billingData.billingCity ?? '',
						state: billingData.billingState ?? '',
						pincode: Number(billingData.billingPincode),
						country: 'India',
				  }
				: undefined,
		};

		const response = await updateAddressMutation.mutateAsync(addressData);
		if (response?.data?.success) {
			setShowForm(false);
		}
	};

	const handlePincodeChange = useCallback(
		async (formType: 'shipping' | 'billing', pincode: number) => {
			const form: any =
				formType === 'shipping' ? shippingAddressForm : billingAddressForm;
			const prefix = formType === 'shipping' ? 'shipping' : 'billing';
			if (pincode?.toString().length === 6) {
				setIsPincodeLoading(true);

				try {
					const validationResult = await validatePincode(pincode);

					if (validationResult && validationResult.isValid) {
						form.setValue(`${prefix}City`, validationResult?.city, {
							shouldValidate: true,
						});
						form.setValue(`${prefix}State`, validationResult?.state, {
							shouldValidate: true,
						});
						form.clearErrors(`${prefix}Pincode`);
					} else {
						form.setError(`${prefix}Pincode`, {
							type: 'manual',
							message: validationResult?.error || 'Invalid pincode',
						});
					}
				} catch (error) {
					console.error(
						'Error validating pincode: logs 11111 in address component',
						error
					);
					form.setError(`${prefix}Pincode`, {
						type: 'manual',
						message: 'Invalid pincode',
					});
				} finally {
					setIsPincodeLoading(false);
				}
			}
		},
		[shippingAddressForm, billingAddressForm, validatePincode]
	);

	useEffect(() => {
		const shippingSubscription = shippingAddressForm.watch(
			(value, { name, type }) => {
				if (
					name === 'shippingPincode' &&
					type === 'change' &&
					value.shippingPincode
				) {
					handlePincodeChange('shipping', Number(value.shippingPincode));
				}
			}
		);

		const billingSubscription = billingAddressForm.watch(
			(value, { name, type }) => {
				if (
					name === 'billingPincode' &&
					type === 'change' &&
					value.billingPincode
				) {
					handlePincodeChange('billing', Number(value.billingPincode));
				}
			}
		);

		return () => {
			shippingSubscription.unsubscribe();
			billingSubscription.unsubscribe();
		};
	}, [shippingAddressForm, billingAddressForm, handlePincodeChange]);

	useEffect(() => {
		console.log('cart logs 111111', cart);

		if (cart?.shippingAddress?.firstName) {
			shippingAddressForm.setValue(
				'shippingFirstName',
				cart.shippingAddress.firstName
			);
		}

		if (cart?.shippingAddress?.lastName) {
			shippingAddressForm.setValue(
				'shippingLastName',
				cart.shippingAddress.lastName
			);
		}

		if (cart?.shippingAddress?.email) {
			shippingAddressForm.setValue('shippingEmail', cart.shippingAddress.email);
		}

		if (cart?.shippingAddress?.phone) {
			shippingAddressForm.setValue('shippingPhone', cart.shippingAddress.phone);
		}

		if (cart?.shippingAddress?.address) {
			shippingAddressForm.setValue(
				'shippingAddress',
				cart.shippingAddress.address
			);
		}

		if (cart?.shippingAddress?.address2) {
			shippingAddressForm.setValue(
				'shippingAddress2',
				cart.shippingAddress.address2
			);
		}

		if (cart?.shippingAddress?.city) {
			shippingAddressForm.setValue('shippingCity', cart.shippingAddress.city);
		}

		if (cart?.shippingAddress?.state) {
			shippingAddressForm.setValue('shippingState', cart.shippingAddress.state);
		}

		if (cart?.shippingAddress?.pincode) {
			shippingAddressForm.setValue(
				'shippingPincode',
				cart.shippingAddress.pincode.toString()
			);
		}

		if (cart?.billingAddress?.firstName) {
			billingAddressForm.setValue(
				'billingFirstName',
				cart.billingAddress.firstName
			);
		}

		if (cart?.billingAddress?.lastName) {
			billingAddressForm.setValue(
				'billingLastName',
				cart.billingAddress.lastName
			);
		}

		if (cart?.billingAddress?.email) {
			billingAddressForm.setValue('billingEmail', cart.billingAddress.email);
		}

		if (cart?.billingAddress?.phone) {
			billingAddressForm.setValue('billingPhone', cart.billingAddress.phone);
		}

		if (cart?.billingAddress?.address) {
			billingAddressForm.setValue(
				'billingAddress',
				cart.billingAddress.address
			);
		}

		if (cart?.billingAddress?.address2) {
			billingAddressForm.setValue(
				'billingAddress2',
				cart.billingAddress.address2
			);
		}

		if (cart?.billingAddress?.city) {
			billingAddressForm.setValue('billingCity', cart.billingAddress.city);
		}

		if (cart?.billingAddress?.state) {
			billingAddressForm.setValue('billingState', cart.billingAddress.state);
		}

		if (cart?.billingAddress?.pincode) {
			billingAddressForm.setValue(
				'billingPincode',
				cart.billingAddress.pincode.toString()
			);
		}

		if (cart?.shippingAddressId) {
			setUseDifferentBillingAddress(
				cart?.shippingAddressId !== cart?.billingAddressId
			);
		}
	}, [cart]);

	return (
		<>
			{showForm === false ? (
				<div>
					{cart?.shippingAddress && (
						<div className='border p-4 mb-4'>
							<h3 className='font-semibold'>Shipping Address</h3>
							<p>{cart?.shippingAddress?.address}</p>
							<p>
								{cart?.shippingAddress?.city}, {cart?.shippingAddress?.state}{' '}
								{cart?.shippingAddress?.pincode}
							</p>
						</div>
					)}
					{cart?.billingAddress && (
						<div className='border p-4 mb-4'>
							<h3 className='font-semibold'>Billing Address</h3>
							<p>{cart?.billingAddress?.address}</p>
							<p>
								{cart?.billingAddress?.city}, {cart?.billingAddress?.state}{' '}
								{cart?.billingAddress?.pincode}
							</p>
						</div>
					)}
					<button
						onClick={() => setShowForm(true)}
						className='px-4 py-2 bg-red-700 text-white rounded'
					>
						Edit Addresses
					</button>
				</div>
			) : (
				<form
					onSubmit={(event) => {
						event.preventDefault();
						shippingAddressForm.handleSubmit(onSubmit)(event);

						if (useDifferentBillingAddress) {
							billingAddressForm.handleSubmit(onSubmit)(event);
						}
					}}
					className='flex flex-col tracking-wide leading-snug max-w-[688px]'
				>
					<AddressForm
						prefix='shipping'
						errors={shippingAddressForm.formState.errors}
						register={shippingAddressForm.register as any}
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
								errors={billingAddressForm.formState.errors}
								register={billingAddressForm.register as any}
							/>
						</>
					)}

					<button
						type='submit'
						className='gap-3 self-stretch px-8 py-3.5 mt-6 w-full text-2xl font-bold text-center text-white bg-red-700 max-md:px-5 max-md:max-w-full'
					>
						Save
					</button>
				</form>
			)}
		</>
	);
};
