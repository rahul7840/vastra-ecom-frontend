import { z } from 'zod';

const pincodeSchema = z.string().min(6, 'Pincode must be 6 digits');

export const ShippingAddressSchema = z.object({
	shippingAddress: z.string().min(1, 'Address is required'),
	shippingAddress2: z.string().optional(),
	shippingEmail: z.string().email('Invalid email'),
	shippingPhone: z
		.string()
		.min(10, 'Phone number must be of 10 digits')
		.max(10, 'Phone number must be of 10 digits'),
	shippingFirstName: z.string().min(1, 'First name is required'),
	shippingLastName: z.string().min(1, 'Last name is required'),
	shippingCity: z.string().min(1, 'City is required'),
	shippingState: z.string().min(1, 'State is required'),
	shippingPincode: pincodeSchema,
});

export type shippingAddressSchema = z.infer<typeof ShippingAddressSchema>;

export const BillingAddressSchema = z.object({
	billingAddress: z.string().min(1, 'Address is required'),
	billingAddress2: z.string().optional(),
	billingEmail: z.string().email('Invalid email'),
	billingPhone: z
		.string()
		.min(10, 'Phone number must be of 10 digits')
		.max(10, 'Phone number must be of 10 digits'),
	billingFirstName: z.string().min(1, 'First name is required'),
	billingLastName: z.string().min(1, 'Last name is required'),
	billingCity: z.string().min(1, 'City is required'),
	billingState: z.string().min(1, 'State is required'),
	billingPincode: pincodeSchema,
});

export type billingAddressSchema = z.infer<typeof BillingAddressSchema>;
