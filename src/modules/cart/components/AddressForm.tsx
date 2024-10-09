import React from 'react';
import InputField from './InputField';
import { UseFormReturn } from 'react-hook-form';
import {
	billingAddressSchema,
	shippingAddressSchema,
} from './contact-info-schema';

interface AddressFormProps {
	prefix: 'shipping' | 'billing';
	form: UseFormReturn<shippingAddressSchema | billingAddressSchema>;
	onSubmit: (data: shippingAddressSchema | billingAddressSchema) => void;
}

export const AddressForm: React.FC<AddressFormProps> = ({
	prefix,
	onSubmit,
	form,
}) => {
	const { handleSubmit, register } = form;

	const errors = form.formState.errors as any;

	console.log('errors ', prefix, errors);

	return (
		<form
			onSubmit={handleSubmit(onSubmit)}
			className='flex flex-wrap gap-6 items-start mt-6 max-md:max-w-full'
		>
			<InputField
				label='Address'
				placeholder='Address'
				inputProps={{
					...register(`${prefix}Address`),
				}}
				error={errors[`${prefix}Address`]?.message}
			/>
			<InputField
				label='City'
				placeholder='City'
				inputProps={{
					...register(`${prefix}City`),
				}}
				error={errors[`${prefix}City`]?.message}
			/>
			<InputField
				label='State'
				placeholder='State'
				inputProps={{
					...register(`${prefix}State`),
				}}
				error={errors[`${prefix}State`]?.message}
			/>
			<InputField
				label='Zip Code'
				placeholder='Zip Code'
				inputProps={{
					...register(`${prefix}ZipCode`),
				}}
				error={errors[`${prefix}ZipCode`]?.message}
			/>
			{/* <InputField
				label='Country'
				placeholder='Country'
				inputProps={{
					...register(`${prefix}Country`),
				}}
				error={errors[`${prefix}Country`]?.message}
			/> */}
		</form>
	);
};
