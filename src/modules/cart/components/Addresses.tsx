import { api } from '@/api';
import { Button } from '@/modules/common/components/Button';
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
} from '@/modules/common/components/Dialog';
import {
	RadioGroup,
	RadioGroupItem,
} from '@/modules/common/components/RadioGroup';
import { AddressForm } from '@/modules/dashboard/components/AddressForm';
import { useAddresses } from '@/modules/dashboard/queries/use-addresses';
import { IAddress } from '@/modules/types/address';
import { ICartAddress } from '@/modules/types/cart';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Pencil, Trash2 } from 'lucide-react';
import React, { useState } from 'react';
import { toast } from 'react-toastify';
import { useCartManager } from '../queries/use-cart-manager';

export const Addresses: React.FC = () => {
	const { cart, updateCartAddressMutation } = useCartManager();
	const { addresses } = useAddresses();
	const [selectedShippingId, setSelectedShippingId] = useState<string>(
		cart?.shippingAddressId || ''
	);
	const [selectedBillingId, setSelectedBillingId] = useState<string>(
		cart?.billingAddressId || ''
	);
	const [useDifferentBillingAddress, setUseDifferentBillingAddress] =
		useState(false);
	const [isCreatingAddress, setIsCreatingAddress] = useState(false);
	const [isEditing, setIsEditing] = useState(false);
	const [selectedAddress, setSelectedAddress] = useState<IAddress | null>(null);
	const [isEditingAddress, setIsEditingAddress] = useState(false);
	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
	const queryClient = useQueryClient();

	const createAddressMutation = useMutation({
		mutationFn: (data: IAddress) => api.customer.createAddress(data),
		onSuccess: () => {
			toast.success('Address created successfully');
			queryClient.invalidateQueries({ queryKey: ['addresses'] });
		},
	});

	const updateAddressMutation = useMutation({
		mutationFn: ({ id, data }: { id: string; data: IAddress }) => {
			return api.customer.updateAddress(id, data);
		},
		onSuccess: () => {
			toast.success('Address updated successfully');
			queryClient.invalidateQueries({ queryKey: ['addresses'] });
		},
	});

	const deleteAddressMutation = useMutation({
		mutationFn: (id: string) => api.customer.deleteAddress(id),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['addresses'] });
		},
	});

	const handleDeleteConfirm = () => {
		if (selectedAddress) {
			deleteAddressMutation.mutate(selectedAddress.id);
			setIsDeleteModalOpen(false);
		}
	};

	const handleCreateAddress = async (data: IAddress) => {
		await createAddressMutation.mutateAsync(data);
		setIsCreatingAddress(false);
	};

	const handleUpdateSubmit = async (data: IAddress) => {
		await updateAddressMutation.mutateAsync({
			id: selectedAddress?.id as string,
			data,
		});
		setIsEditingAddress(false);
	};

	const onSubmit = async () => {
		const addressData: ICartAddress = {
			shippingAddressId: selectedShippingId,
			billingAddressId: useDifferentBillingAddress
				? selectedBillingId
				: undefined,
		};

		const response = await updateCartAddressMutation.mutateAsync(addressData);
		if (response?.data?.success) {
			setIsEditing(false);
		}
	};

	const handleEdit = (address: IAddress) => {
		setSelectedAddress(address);
		setIsEditingAddress(true);
	};

	const handleDelete = (address: IAddress) => {
		setSelectedAddress(address);
		setIsDeleteModalOpen(true);
	};

	const EditView = () => {
		return (
			<>
				<div className='space-y-6'>
					{addresses?.length > 0 && (
						<>
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
										<div className='flex items-center'>
											<Button
												variant='ghost'
												size='icon'
												onClick={() => handleEdit(address)}
											>
												<Pencil className='h-4 w-4' />
											</Button>
											<Button
												variant='ghost'
												size='icon'
												onClick={() => handleDelete(address)}
											>
												<Trash2 className='h-4 w-4 text-red-500' />
											</Button>
										</div>
									</div>
								))}
							</RadioGroup>

							<label className='flex gap-3 items-center self-start mt-6 text-neutral-400 cursor-pointer'>
								<input
									type='checkbox'
									className='sr-only'
									checked={useDifferentBillingAddress}
									onChange={(e) =>
										setUseDifferentBillingAddress(e.target.checked)
									}
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
												<div className='flex items-center'>
													<Button
														variant='ghost'
														size='icon'
														onClick={() => handleEdit(address)}
													>
														<Pencil className='h-4 w-4' />
													</Button>
													<Button
														variant='ghost'
														size='icon'
														onClick={() => handleDelete(address)}
													>
														<Trash2 className='h-4 w-4 text-red-500' />
													</Button>
												</div>
											</div>
										))}
									</RadioGroup>
								</div>
							)}
						</>
					)}

					<Button onClick={() => setIsCreatingAddress(true)} variant='outline'>
						Add New Address
					</Button>
				</div>
				<button
					onClick={onSubmit}
					className='px-4 mt-4 w-56 rounded-full py-2 bg-red-700 text-white'
				>
					Save & Continue
				</button>

				<Dialog open={isDeleteModalOpen} onOpenChange={setIsDeleteModalOpen}>
					<DialogContent className='sm:max-w-[400px]'>
						<DialogHeader>
							<DialogTitle>Confirm Deletion</DialogTitle>
						</DialogHeader>
						<div className='py-4'>
							<p>Are you sure you want to delete this address?</p>
						</div>
						<div className='flex justify-end space-x-2'>
							<Button
								variant='outline'
								onClick={() => setIsDeleteModalOpen(false)}
							>
								Cancel
							</Button>
							<Button variant='destructive' onClick={handleDeleteConfirm}>
								Delete
							</Button>
						</div>
					</DialogContent>
				</Dialog>
			</>
		);
	};

	if (isEditingAddress) {
		return (
			<AddressForm
				initialData={selectedAddress as IAddress}
				onSubmit={handleUpdateSubmit}
				onCancel={() => setIsEditingAddress(false)}
			/>
		);
	}

	if (isCreatingAddress) {
		return (
			<AddressForm
				onSubmit={handleCreateAddress}
				onCancel={() => setIsCreatingAddress(false)}
			/>
		);
	}

	if (isEditing) {
		return <EditView />;
	}

	return (
		<>
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
				<Button onClick={() => setIsEditing(true)} variant='outline'>
					Manage Addresses
				</Button>
			</div>
		</>
	);
};
