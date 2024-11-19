'use client';
import { api } from '@/api';
import { Badge } from '@/modules/common/components/Badge';
import { Button } from '@/modules/common/components/Button';
import {
	Dialog,
	DialogContent,
	DialogHeader,
	DialogTitle,
	DialogTrigger,
} from '@/modules/common/components/Dialog';
import { IAddress } from '@/modules/types/address';
import { useMutation, useQueryClient } from '@tanstack/react-query';
import { Pencil, PlusCircle, Trash2 } from 'lucide-react';
import { useState } from 'react';
import { AddressForm } from '../components/AddressForm';
import { useAddresses } from '../queries/use-addresses';

export const AddressTemplate = () => {
	const { addresses } = useAddresses();
	// const [addresses, setAddresses] = useState<IAddress[]>([]);
	const [selectedAddress, setSelectedAddress] = useState<IAddress | null>(null);
	const [isEditModalOpen, setIsEditModalOpen] = useState(false);
	const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);

	const queryClient = useQueryClient();

	const updateAddressMutation = useMutation({
		mutationFn: ({ id, data }: { id: string; data: IAddress }) => {
			return api.customer.updateAddress(id, data);
		},
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['addresses'] });
		},
	});

	const deleteAddressMutation = useMutation({
		mutationFn: (id: string) => api.customer.deleteAddress(id),
		onSuccess: () => {
			queryClient.invalidateQueries({ queryKey: ['addresses'] });
		},
	});

	const handleEdit = (address: IAddress) => {
		setSelectedAddress(address);
		setIsEditModalOpen(true);
	};

	const handleDelete = (address: IAddress) => {
		setSelectedAddress(address);
		setIsDeleteModalOpen(true);
	};

	const handleUpdateAddress = (data: IAddress) => {
		if (selectedAddress) {
			updateAddressMutation.mutate({
				id: selectedAddress.id,
				data,
			});
		}
		setIsEditModalOpen(false);
	};

	const handleDeleteConfirm = () => {
		if (selectedAddress) {
			deleteAddressMutation.mutate(selectedAddress.id);
			setIsDeleteModalOpen(false);
		}
	};

	return (
		<div className=' mx-auto p-6'>
			<div className='flex justify-between items-center mb-6'>
				<h1 className='text-xl md:text-2xl font-bold'>My Addresses</h1>
				<Dialog>
					<DialogTrigger asChild>
						<Button variant='default'>
							<PlusCircle className='mr-2 h-4 w-4' />
							Add New Address
						</Button>
					</DialogTrigger>
					<DialogContent className='sm:max-w-[500px]'>
						<DialogHeader>
							<DialogTitle>Add New Address</DialogTitle>
						</DialogHeader>
						<AddressForm
							onSubmit={(newAddress) => {
								// setAddresses([...addresses, newAddress]);
							}}
							onCancel={() => setIsEditModalOpen(false)}
						/>
					</DialogContent>
				</Dialog>
			</div>

			<div className='grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4'>
				{addresses?.map((address: IAddress) => (
					<div
						key={address.id}
						className='relative group p-4 border rounded-lg hover:bg-gray-50'
					>
						<div className='flex items-center justify-between mb-2'>
							<span className='font-medium'>
								{address.firstName} {address.lastName}
							</span>
							{address.isDefault && (
								<Badge variant='outline' className='text-xs'>
									Default
								</Badge>
							)}
						</div>

						<div className='space-y-1 text-sm text-gray-600'>
							<p>{address.address}</p>
							{address.address2 && <p>{address.address2}</p>}
							<p>
								{address.city}, {address.state} {address.pincode}
							</p>
							<p>{address.country}</p>
							<p className='mt-2'>
								<span className='inline-block mr-4'>
									<span className='text-gray-500'>📧</span> {address.email}
								</span>
								<span>
									<span className='text-gray-500'>📞</span> {address.phone}
								</span>
							</p>
						</div>

						<div className='absolute top-4 right-4 space-x-2 opacity-0 group-hover:opacity-100 transition-opacity'>
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
			</div>

			{/* Edit Modal */}
			<Dialog open={isEditModalOpen} onOpenChange={setIsEditModalOpen}>
				<DialogContent className='sm:max-w-[500px]'>
					<DialogHeader>
						<DialogTitle>Edit Address</DialogTitle>
					</DialogHeader>
					{selectedAddress && (
						<AddressForm
							initialData={selectedAddress}
							onCancel={() => setIsEditModalOpen(false)}
							onSubmit={handleUpdateAddress}
						/>
					)}
				</DialogContent>
			</Dialog>

			{/* Delete Confirmation Modal */}
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
		</div>
	);
};
