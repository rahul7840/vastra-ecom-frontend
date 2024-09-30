import { z } from 'zod';

const Gender = z.enum(['MALE', 'FEMALE', 'OTHER']);

export const signupFormSchema = z.object({
	fullName: z.string().min(1, 'Full name is required'),
	email: z.string().email('Invalid email address'),
	password: z.string().min(6, 'Password must be at least 6 characters long'),
	phoneNumber: z.string().regex(/^\d{10}$/, 'Invalid phone number'),
	birthDate: z.string().refine((value) => !isNaN(Date.parse(value)), {
		message: 'Invalid date format',
	}),
	gender: Gender,
});

export type SignupFormSchema = z.infer<typeof signupFormSchema>;
