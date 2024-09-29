import React from 'react';
import Image from 'next/image';
import logo from '@/public/auth/logo.svg';
import authImg from '@/public/auth/authImg.svg';
import Link from 'next/link';

export const ForgotTemplate = () => {
	return (
		<div className='flex flex-col lg:flex-row justify-center items-center h-screen'>
			<div className='h-2/5 lg:h-full w-full lg:order-2'>
				<Image
					src={authImg}
					alt='authImg'
					className='max-h-full w-full object-cover object-top'
				/>
			</div>
			<div className='relative h-3/5 lg:h-full w-full p-5 flex flex-col items-center justify-center '>
				<Image
					src={logo}
					alt='authImg'
					width={75}
					height={100}
					className='absolute top-5 left-5 hidden lg:block'
				/>
				<form className='flex flex-col gap-2 w-full max-w-sm lg:max-w-md'>
					<div>
						<h2 className='text-2xl font-bold'>Forgot Password</h2>
					</div>
					<div className='my-5 text-sm'>
						<div>
							<label htmlFor='email' className='font-semibold'>
								Email
							</label>
							<div className='mt-1'>
								<input
									type='text'
									placeholder='Enter your email'
									className='border border-colors-grayBorder w-full p-2'
								/>
							</div>
						</div>
					</div>

					<div className='mb-2'>
						<button
							type='submit'
							className='flex items-center justify-center bg-colors-themeColor font-semibold text-white w-full p-2 hover:underline'
						>
							Continue
						</button>
					</div>

					<div className='text-center'>
						<p className='text-sm'>
							Back to{' '}
							<Link href='/login' className='font-semibold hover:underline'>
								Login
							</Link>
						</p>
					</div>
				</form>
			</div>
		</div>
	);
};
