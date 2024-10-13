import React from 'react';
import { FieldErrors, UseFormRegister, UseFormReturn } from 'react-hook-form';
import InputField from './InputField';
import {
	shippingAddressSchema,
	billingAddressSchema,
} from './contact-info-schema';

interface AddressFormProps {
	prefix: 'shipping' | 'billing';
	errors: FieldErrors<shippingAddressSchema | billingAddressSchema>;
	register: UseFormRegister<shippingAddressSchema | billingAddressSchema>;
}

export const AddressForm: React.FC<AddressFormProps> = ({
	prefix,
	errors,
	register,
}) => {
	console.log('errors ', prefix, errors);

	const typedErrors = errors as Record<
		`${typeof prefix}${string}`,
		{ message?: string }
	>;

	return (
		<div className='flex flex-wrap gap-6 items-start mt-6 max-md:max-w-full'>
			<div className='flex w-full gap-4'>
				<InputField
					label='First Name'
					placeholder='First Name'
					inputProps={{
						...register(`${prefix}FirstName`),
					}}
					error={typedErrors[`${prefix}FirstName`]?.message}
				/>
				<InputField
					label='Last Name'
					placeholder='Last Name'
					inputProps={{
						...register(`${prefix}LastName`),
					}}
					error={typedErrors[`${prefix}LastName`]?.message}
				/>
			</div>
			<InputField
				label='Email'
				placeholder='Email'
				inputProps={{
					...register(`${prefix}Email`),
				}}
				error={typedErrors[`${prefix}Email`]?.message}
			/>
			<InputField
				label='Phone'
				placeholder='Phone'
				inputProps={{
					type: 'tel',
					maxLength: 10,
					...register(`${prefix}Phone`, {
						validate: (value) =>
							value.length === 10 || 'Phone number must be 10 digits',
					}),
				}}
				error={typedErrors[`${prefix}Phone`]?.message}
			/>
			<InputField
				label='Address'
				placeholder='Address'
				inputProps={{
					...register(`${prefix}Address`),
				}}
				error={typedErrors[`${prefix}Address`]?.message}
			/>
			<InputField
				label='Address Line 2'
				placeholder='Address Line 2'
				inputProps={{
					...register(`${prefix}Address2`),
				}}
				error={typedErrors[`${prefix}Address2`]?.message}
			/>

			<div className='flex w-full gap-4'>
				<InputField
					label='Zip Code'
					placeholder='Zip Code'
					inputProps={{
						maxLength: 6,
						...register(`${prefix}Pincode`, {
							validate: (value) => {
								return value.length > 6 || 'Pincode must be 6 digits';
							},
						}),
					}}
					error={typedErrors[`${prefix}Pincode`]?.message}
				/>
				<InputField
					label='City'
					placeholder='City'
					inputProps={{
						...register(`${prefix}City`),
					}}
					readonly
					error={typedErrors[`${prefix}City`]?.message}
				/>
				<InputField
					label='State'
					placeholder='State'
					inputProps={{
						...register(`${prefix}State`),
					}}
					readonly
					error={typedErrors[`${prefix}State`]?.message}
				/>
			</div>
		</div>
	);
};
