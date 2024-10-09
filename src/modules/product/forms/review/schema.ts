import { z } from 'zod';

export const reviewFormSchema = z.object({
	rating: z.number().min(1).max(5),
	comment: z.string().min(10, 'Comment must be at least 10 characters'),
});

export type ReviewFormSchema = z.infer<typeof reviewFormSchema>;
