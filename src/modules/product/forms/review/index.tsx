import { StarRating } from '@/modules/common/components/StarRating';
import React, { useState } from 'react';
import { reviewFormSchema, ReviewFormSchema } from './schema';
import { useForm } from 'react-hook-form';
import { zodResolver } from '@hookform/resolvers/zod';

interface ReviewFormProps {
	onSubmit: (data: ReviewFormSchema) => void;
}

export const ReviewForm: React.FC<ReviewFormProps> = ({ onSubmit }) => {
	const form = useForm<ReviewFormSchema>({
		defaultValues: {
			rating: 0,
			comment: '',
		},
		resolver: zodResolver(reviewFormSchema),
	});

	const { register, handleSubmit } = form;

	console.log('form rating', form.watch('rating'));

	console.log(form.formState.errors, 'errors');
	return (
		<form
			className='flex flex-col self-center justify-center w-full max-w-[626px]'
			onSubmit={handleSubmit(onSubmit)}
		>
			<h1 className='text-2xl font-semibold tracking-wider leading-snug text-center text-neutral-800 max-md:max-w-full'>
				Write a review
			</h1>
			<div className='flex flex-col self-center mt-6 w-full max-md:max-w-full'>
				<div className='flex gap-2'>
					<span>Rating:</span>
					<StarRating
						rating={form.watch('rating')}
						onChange={(rating) => {
							console.log('rating', rating, 'typeof', typeof rating);
							form.setValue('rating', rating);
						}}
					/>
					{form.formState.errors.rating && (
						<p className='text-red-500'>
							{form.formState.errors.rating.message}
						</p>
					)}
				</div>

				<div className='flex flex-col items-end mt-6 w-full text-sm tracking-wide leading-snug max-md:max-w-full'>
					<label htmlFor='reviewComment' className='sr-only'>
						Enter your comment here
					</label>
					<textarea
						id='reviewComment'
						className='gap-2.5 px-5 pt-2 pb-28 w-full border border-solid border-neutral-400 min-h-[144px] text-neutral-400 max-md:pb-24 max-md:max-w-full'
						placeholder='Enter your comment here'
						{...register('comment')}
					/>
					{form.formState.errors.comment && (
						<p className='text-red-500'>
							{form.formState.errors.comment.message}
						</p>
					)}
					<button
						type='submit'
						disabled={form.formState.isSubmitting || !form.formState.isValid}
						className='gap-2.5 self-stretch disabled:opacity-50 px-5 py-2 mt-6 max-w-full font-semibold text-white whitespace-nowrap border border-solid bg-neutral-800 border-neutral-800 w-[113px]'
					>
						Submit
					</button>
				</div>
			</div>
		</form>
	);
};
