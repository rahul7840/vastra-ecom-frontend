'use client';
import G_icon from '@/../public/assets/images/G-icon.svg';
import { zodResolver } from '@hookform/resolvers/zod';
import { FC } from 'react';
import { useForm } from 'react-hook-form';
import { loginFormSchema, LoginFormSchema } from './index';
import { IApiError } from '@/api/types';
import { api } from '@/api';
import { toast } from 'react-toastify';
import { useRouter } from 'next/navigation';
import { useMutation } from '@tanstack/react-query';

interface LoginFormProps {}

export const LoginForm: FC<LoginFormProps> = () => {
	const router = useRouter();
	const form = useForm<LoginFormSchema>({
		defaultValues: {
			email: '',
			password: '',
		},
		resolver: zodResolver(loginFormSchema),
	});

	const mutation = useMutation({
		mutationFn: (data: LoginFormSchema) => api.auth.login(data),
		onSuccess: (response) => {
			console.log('response', response);
			toast.success("You're now logged in successfully.");
			router.push('/');
			window.location.reload();
		},
		onError: (error: IApiError) => {
			populateError(form, error);
		},
	});

	const onSubmit = (data: LoginFormSchema) => {
		console.log('dataaaa submit', data);
		mutation.mutate(data);
	};

	return (
		<form
			onSubmit={form.handleSubmit(onSubmit)}
			className='flex flex-col gap-2 w-full max-w-sm lg:max-w-md'
		>
			<div>
				<h2 className='text-2xl font-bold'>Welcome Back</h2>
				<p className='mt-1 text-lg font-semibold'>Login in your account</p>
			</div>
			<div className='flex flex-col gap-2 my-1 text-sm'>
				<div>
					<label htmlFor='email' className='font-semibold'>
						Email
					</label>
					<div className='mt-1'>
						<input
							type='text'
							placeholder='Enter your email'
							className='border border-colors-grayBorder w-full p-2'
							required
						/>
					</div>
				</div>
				<div>
					<label htmlFor='password' className='font-semibold'>
						Password
					</label>
					<div className='relative mt-1'>
						<input
							type='password'
							id='password'
							placeholder='Enter your password'
							className='border border-colors-grayBorder w-full p-2'
							required
						/>
						<p className='absolute top-3 right-2 text-xs font-medium text-colors-grayFont'>
							Show
						</p>
					</div>
				</div>
			</div>
			<div className='text-right'>
				<Link
					href='/forgot'
					className='text-colors-fontColor text-sm font-semibold hover:underline'
				>
					Forgot Password?
				</Link>
			</div>
			<div>
				<button
					type='submit'
					className='flex items-center justify-center bg-colors-themeColor font-semibold text-white w-full p-2 hover:underline'
				>
					Sign in
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
					Didn't have an account?{' '}
					<Link href='/signup' className='font-semibold hover:underline'>
						Sign-up
					</Link>
				</p>
			</div>
		</form>
	);
};
