import { z } from 'zod';

export const ShippingAddressSchema = z.object({
	shippingAddress: z.string().min(1, 'Address is required'),
	shippingCity: z.string().min(1, 'City is required'),
	shippingState: z.string().min(1, 'State is required'),
	shippingZipCode: z.string().min(1, 'Zip code is required'),
});

export type shippingAddressSchema = z.infer<typeof ShippingAddressSchema>;

export const BillingAddressSchema = z.object({
	billingAddress: z.string(),
	billingCity: z.string(),
	billingState: z.string(),
	billingZipCode: z.string(),
});

export type billingAddressSchema = z.infer<typeof BillingAddressSchema>;

export const ContactInformationSchema = z.object({
	firstName: z
		.string()
		.min(1, 'First name is required')
		.max(50, 'First name must be 50 characters or less'),
	lastName: z
		.string()
		.min(1, 'Last name is required')
		.max(50, 'Last name must be 50 characters or less'),
	phoneNumber: z
		.string()
		.min(10, 'Phone number must be at least 10 digits')
		.max(15, 'Phone number must be 15 digits or less')
		.regex(/^[0-9+\-\s()]+$/, 'Invalid phone number format'),
	email: z.string().email('Invalid email address'),
});

export type ContactInformation = z.infer<typeof ContactInformationSchema>;
