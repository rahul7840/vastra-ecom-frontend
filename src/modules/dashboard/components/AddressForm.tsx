'use client';
import InputField from '@/modules/cart/components/InputField';
import { useCartManager } from '@/modules/cart/queries/use-cart-manager';
import { Button } from '@/modules/common/components/Button';
import { Checkbox } from '@/modules/common/components/Checkbox';
import {
	Form,
	FormControl,
	FormField,
	FormItem,
	FormLabel,
} from '@/modules/common/components/Form';
import { zodResolver } from '@hookform/resolvers/zod';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import * as z from 'zod';

const addressSchema = z.object({
	firstName: z.string().min(2, 'First name is required'),
	lastName: z.string().min(2, 'Last name is required'),
	email: z.string().email('Invalid email address'),
	phone: z.string().min(10, 'Invalid phone number'),
	address: z.string().min(5, 'Address is required'),
	address2: z.string().optional(),
	city: z.string().min(2, 'City is required'),
	state: z.string().min(2, 'State is required'),
	country: z.string().min(2, 'Country is required'),
	pincode: z.number().min(1, 'Pincode is required'),
	isDefault: z.boolean().default(false),
});

type AddressFormValues = z.infer<typeof addressSchema>;

interface AddressFormProps {
	initialData?: AddressFormValues;
	onSubmit: (data: any) => void;
	onCancel: () => void;
}

export const AddressForm = ({
	initialData,
	onSubmit,
	onCancel,
}: AddressFormProps) => {
	const [isPincodeLoading, setIsPincodeLoading] = useState(false);
	const { validatePincode } = useCartManager();
	const form = useForm<AddressFormValues>({
		resolver: zodResolver(addressSchema),
		defaultValues: initialData || {
			firstName: '',
			lastName: '',
			email: '',
			phone: '',
			address: '',
			address2: '',
			city: '',
			state: '',
			country: '',
			pincode: 0,
			isDefault: false,
		},
	});

	const {
		register,
		formState: { errors },
	} = form;

	const handlePincodeChange = async (
		formType: 'shipping' | 'billing',
		pincode: number
	) => {
		if (pincode?.toString().length === 6) {
			setIsPincodeLoading(true);

			try {
				const validationResult = await validatePincode(pincode);

				if (validationResult && validationResult.isValid) {
					form.setValue('city', validationResult?.city as string, {
						shouldValidate: true,
					});
					form.setValue('state', validationResult?.state as string, {
						shouldValidate: true,
					});
					form.clearErrors('pincode');
				} else {
					form.setError('pincode', {
						type: 'manual',
						message: validationResult?.error || 'Invalid pincode',
					});
				}
			} catch (error) {
				console.error(
					'Error validating pincode: logs 11111 in address component',
					error
				);
				form.setError('pincode', {
					type: 'manual',
					message: 'Invalid pincode',
				});
			} finally {
				setIsPincodeLoading(false);
			}
		}
	};

	useEffect(() => {
		const subscription = form.watch((value, { name, type }) => {
			if (name === 'pincode' && type === 'change' && value.pincode) {
				handlePincodeChange('shipping', Number(value.pincode));
			}
		});

		return () => {
			subscription.unsubscribe();
		};
	}, [form, handlePincodeChange]);

	return (
		<Form {...form}>
			<form onSubmit={form.handleSubmit(onSubmit)} className='space-y-4'>
				<div className='grid grid-cols-2 gap-4'>
					<InputField
						label='First Name'
						placeholder='First Name'
						inputProps={{
							...register('firstName'),
						}}
						error={errors.firstName?.message}
					/>
					<InputField
						label='Last Name'
						placeholder='Last Name'
						inputProps={{
							...register('lastName'),
						}}
						error={errors.lastName?.message}
					/>
				</div>

				<div className='grid grid-cols-2 gap-4'>
					<InputField
						label='Email'
						placeholder='Email'
						inputProps={{
							...register('email'),
						}}
						error={errors.email?.message}
					/>
					<InputField
						label='Phone'
						placeholder='Phone'
						inputProps={{
							...register('phone'),
						}}
						error={errors.phone?.message}
					/>
				</div>

				<InputField
					label='Address'
					placeholder='Address'
					inputProps={{
						...register('address'),
					}}
					error={errors.address?.message}
				/>

				<InputField
					label='Address 2 (Optional)'
					placeholder='Address 2 (Optional)'
					inputProps={{
						...register('address2'),
					}}
					error={errors.address2?.message}
				/>

				<div className='grid grid-cols-2 gap-4'>
					<InputField
						label='City'
						placeholder='City'
						inputProps={{
							...register('city'),
						}}
						error={errors.city?.message}
					/>
					<InputField
						label='State'
						placeholder='State'
						inputProps={{
							...register('state'),
						}}
						error={errors.state?.message}
					/>
				</div>

				<div className='grid grid-cols-2 gap-4'>
					<InputField
						label='Country'
						placeholder='Country'
						inputProps={{
							...register('country'),
						}}
						error={errors.country?.message}
					/>
					<InputField
						label='Pincode'
						placeholder='Pincode'
						inputProps={{
							...register('pincode'),
						}}
						error={errors.pincode?.message}
					/>
				</div>

				<FormField
					control={form.control}
					name='isDefault'
					render={({ field }) => (
						<FormItem className='flex flex-row items-center space-x-3 space-y-0'>
							<FormControl>
								<Checkbox
									checked={field.value}
									onCheckedChange={field.onChange}
								/>
							</FormControl>
							<FormLabel>Set as default address</FormLabel>
						</FormItem>
					)}
				/>

				<div className='flex gap-4'>
					<Button
						type='submit'
						className='w-48 bg-red-700 hover:bg-red-800 text-white'
					>
						{initialData ? 'Update Address' : 'Add Address'}
					</Button>

					<Button
						type='button'
						onClick={() => {
							form.reset();
							onCancel();
						}}
						className='w-48 bg-neutral-700 hover:bg-neutral-800 text-white'
					>
						Cancel
					</Button>
				</div>
			</form>
		</Form>
	);
};
