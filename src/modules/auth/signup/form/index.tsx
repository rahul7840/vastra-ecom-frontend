'use client';
import G_icon from '@/../public/assets/images/G-icon.svg';
import { zodResolver } from '@hookform/resolvers/zod';
import { FC, useState } from 'react';
import { useForm } from 'react-hook-form';
import { IApiError } from '@/api/types';
import { api } from '@/api';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';
import { populateError } from '@/modules/core/lib/error';
import Link from 'next/link';
import Image from 'next/image';
import { signupFormSchema, SignupFormSchema } from './schema';

interface SignupFormProps {}

export const SignupForm: FC<SignupFormProps> = () => {
	const [showPassword, setShowPassword] = useState(false);
	const router = useRouter();

	const form = useForm<SignupFormSchema>({
		defaultValues: {
			fullName: 'Test',
			email: 'test@gmail.com',
			phoneNumber: '9876543210',
			password: '123456',
			birthDate: '2001-01-01',
		},
		resolver: zodResolver(signupFormSchema),
	});

	const mutation = useMutation({
		mutationFn: (data: SignupFormSchema) => api.auth.signup(data),
		onSuccess: (response) => {
			toast.success('Signup successfully.');
			router.push('/');
		},
		onError: (error: IApiError) => {
			if (error.response?.data.message) {
				toast.error(error.response.data.message);
			}
			populateError(form, error);
		},
	});

	const onSubmit = (data: SignupFormSchema) => {
		mutation.mutate(data);
	};

	const { register, handleSubmit } = form;

	console.log('error', form.formState.errors);

	return (
		<form
			className='mt-10 flex flex-col gap-2 w-full max-w-sm lg:max-w-md'
			onSubmit={handleSubmit(onSubmit)}
		>
			<div>
				<h2 className='text-2xl font-bold'>Create an Account</h2>
				<p className='mt-1 text-lg font-semibold'>
					Join us by creating an Account
				</p>
			</div>
			<div className='flex flex-col gap-2 my-1 text-sm'>
				<div>
					<label htmlFor='fullName' className='font-semibold'>
						Full Name
					</label>
					<div className='mt-1'>
						<input
							type='text'
							id='fullName'
							placeholder='Enter your Fullname'
							className='border border-colors-grayBorder w-full p-2'
							{...register('fullName')}
						/>
					</div>
				</div>
				<div>
					<label htmlFor='email' className='font-semibold'>
						Email
					</label>
					<div className='mt-1'>
						<input
							type='email'
							id='email'
							placeholder='Enter your email'
							className='border border-colors-grayBorder w-full p-2'
							required
							{...register('email')}
						/>
					</div>
				</div>
				<div>
					<label htmlFor='phone' className='font-semibold'>
						Phone No
					</label>
					<div className='mt-1'>
						<input
							type='text'
							id='phone'
							placeholder='Enter your Phone no'
							className='border border-colors-grayBorder w-full p-2'
							{...register('phoneNumber')}
						/>
					</div>
				</div>
				<div>
					<label htmlFor='password' className='font-semibold'>
						Password
					</label>
					<div className='relative mt-1'>
						<input
							type={showPassword ? 'text' : 'password'}
							id='password'
							placeholder='Enter your password'
							className='border border-colors-grayBorder w-full p-2'
							{...register('password')}
						/>
						<p
							className='absolute top-3 right-2 text-xs font-medium text-colors-grayFont cursor-pointer'
							onClick={() => setShowPassword(!showPassword)}
						>
							{showPassword ? 'Hide' : 'Show'}
						</p>
					</div>
				</div>
				<div className='flex gap-5 w-full'>
					<div className='w-1/2'>
						<label htmlFor='gender' className='font-semibold'>
							Gender
						</label>
						<div className='mt-1'>
							<select
								id='gender'
								className='border border-colors-grayBorder text-colors-grayFont w-full p-2 rounded-none'
								{...register('gender')}
							>
								<option
									value=''
									disabled
									className='text-colors-darkGrayFont bg-white'
								>
									Select gender
								</option>
								<option value='MALE' className='text-colors-darkGrayFont'>
									Male
								</option>
								<option value='FEMALE' className='text-colors-darkGrayFont'>
									Female
								</option>
								<option value='OTHER' className='text-colors-darkGrayFont'>
									Other
								</option>
							</select>
						</div>
					</div>
					<div className='w-1/2'>
						<label htmlFor='birthdate' className='font-semibold'>
							Birth Date
						</label>
						<input
							type='date'
							id='birthdate'
							className='border border-colors-grayBorder text-colors-grayFont w-full p-2 mt-1'
							{...register('birthDate')}
						/>
					</div>
				</div>
			</div>
			<div>
				<button
					type='submit'
					className='flex items-center justify-center bg-colors-themeColor font-semibold text-white w-full p-2 hover:underline'
				>
					Sign Up
				</button>
			</div>
			<div>
				<button className='flex gap-2 items-center justify-center border border-colors-grayBorder w-full p-2 hover:underline'>
					<span>
						<Image src={G_icon} alt='Icon' width={20} height={100} />
					</span>
					Continue with Google
				</button>
			</div>
			<div className='text-center'>
				<p className='text-sm'>
					Already have an account?{' '}
					<Link href='login' className='font-semibold hover:underline'>
						Sign-in
					</Link>
				</p>
			</div>
		</form>
	);
};
