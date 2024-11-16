import { Button } from '@/modules/common/components/Button';
import {
	RadioGroup,
	RadioGroupItem,
} from '@/modules/common/components/RadioGroup';
import { AddressForm } from '@/modules/dashboard/components/AddressForm';
import { useAddresses } from '@/modules/dashboard/queries/use-addresses';
import { IAddress } from '@/modules/types/address';
import { ICartAddress } from '@/modules/types/cart';
import React, { useState } from 'react';
import { useCartManager } from '../queries/use-cart-manager';

export const Addresses: React.FC = () => {
	const { cart, updateAddressMutation } = useCartManager();
	const { addresses } = useAddresses();
	const [selectedShippingId, setSelectedShippingId] = useState<string>(
		cart?.shippingAddressId || ''
	);
	const [selectedBillingId, setSelectedBillingId] = useState<string>(
		cart?.billingAddressId || ''
	);
	const [useDifferentBillingAddress, setUseDifferentBillingAddress] =
		useState(false);
	const [showForm, setShowForm] = useState(false);
	const [isEditing, setIsEditing] = useState(false);

	const onSubmit = async () => {
		const addressData: ICartAddress = {
			shippingAddressId: addresses?.find(
				(addr: IAddress) => addr.id === selectedShippingId
			)?.id,
			billingAddressId: useDifferentBillingAddress
				? addresses?.find((addr: IAddress) => addr.id === selectedBillingId)
				: undefined,
		};

		// const response = await updateAddressMutation.mutateAsync(addressData);
		// if (response?.data?.success) {
		// 	setShowForm(false);
		// }
	};

	const EditView = () => {
		return (
			<>
				<div className='space-y-6'>
					<RadioGroup
						value={selectedShippingId}
						onValueChange={setSelectedShippingId}
						className='grid grid-cols-1 gap-4'
					>
						{addresses?.map((address: IAddress) => (
							<div
								key={address.id}
								className='flex items-start space-x-4 border rounded-lg p-4 hover:bg-gray-50'
								onClick={() => setSelectedShippingId(address.id)}
							>
								<RadioGroupItem
									value={address.id}
									id={address.id}
									className='mt-1'
								/>
								<div className='flex-1'>
									<label
										htmlFor={address.id}
										className='font-medium cursor-pointer'
									>
										{address.firstName} {address.lastName}
										{address.isDefault && (
											<span className='ml-2 text-xs bg-gray-100 px-2 py-1 rounded'>
												Default
											</span>
										)}
									</label>
									<p className='text-sm text-gray-600 mt-1'>
										{address.address}
										{address.address2 && <>, {address.address2}</>}
									</p>
									<p className='text-sm text-gray-600'>
										{address.city}, {address.state} {address.pincode}
									</p>
									<p className='text-sm text-gray-600 mt-1'>
										<span className='inline-block mr-4'>
											📧 {address.email}
										</span>
										<span>📞 {address.phone}</span>
									</p>
								</div>
							</div>
						))}
					</RadioGroup>

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
						<div className='mt-6'>
							<h3 className='text-lg font-medium mb-4'>Billing Address</h3>
							<RadioGroup
								value={selectedBillingId}
								onValueChange={setSelectedBillingId}
								className='grid grid-cols-1 gap-4'
							>
								{addresses?.map((address: IAddress) => (
									<div
										key={`billing-${address.id}`}
										className='flex items-start space-x-4 border rounded-lg p-4 hover:bg-gray-50'
									>
										<RadioGroupItem
											value={address.id}
											id={`billing-${address.id}`}
											className='mt-1'
										/>
										<div className='flex-1'>
											<label
												htmlFor={`billing-${address.id}`}
												className='font-medium cursor-pointer'
											>
												{address.firstName} {address.lastName}
											</label>
											<p className='text-sm text-gray-600 mt-1'>
												{address.address}
												{address.address2 && <>, {address.address2}</>}
											</p>
											<p className='text-sm text-gray-600'>
												{address.city}, {address.state} {address.pincode}
											</p>
										</div>
									</div>
								))}
							</RadioGroup>
						</div>
					)}

					<Button onClick={() => setShowForm(true)} variant='outline'>
						Add New Address
					</Button>
				</div>
				<button
					onClick={onSubmit}
					className='px-4 mt-4 w-56 rounded-full py-2 bg-red-700 text-white'
				>
					Save & Continue
				</button>
			</>
		);
	};

	if (showForm) {
		return (
			<AddressForm onSubmit={onSubmit} onCancel={() => setShowForm(false)} />
		);
	}

	if (isEditing) {
		return <EditView />;
	}

	return (
		<>
			<div>
				{cart?.shippingAddress ? (
					<>
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
					</>
				) : (
					<Button onClick={() => setIsEditing(true)} variant='outline'>
						Manage Addresses
					</Button>
				)}
			</div>
		</>
	);
};
