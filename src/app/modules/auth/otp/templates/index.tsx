'use client';
import React, { useEffect, useState } from 'react';
import Image from 'next/image';
import logo from '@/public/auth/logo.svg';
import authImg from '@/public/auth/authImg.svg';
import Link from 'next/link';

export const OtpTemplate = () => {
	const [otp, setOtp] = useState<string[]>(['', '', '', '']);
	const [timer, setTimer] = useState<number>(30);

	useEffect(() => {
		if (timer > 0) {
			const interval = setInterval(() => {
				setTimer((prev) => prev - 1);
			}, 1000);
			return () => clearInterval(interval);
		}
	}, [timer]);

	const handleChange = (index: number, value: string) => {
		const newOtp = [...otp];
		newOtp[index] = value;
		setOtp(newOtp);
		if (index < otp.length - 1 && value) {
			document.getElementById(`otp-input-${index + 1}`)?.focus();
		}
	};

	const handleKeyDown = (
		index: number,
		event: React.KeyboardEvent<HTMLInputElement>
	) => {
		if (event.key === 'Backspace' && otp[index] === '') {
			if (index > 0) {
				document.getElementById(`otp-input-${index - 1}`)?.focus();
			}
		}
	};

	const onSubmit = (event: React.FormEvent<HTMLFormElement>) => {
		event.preventDefault();
		console.log('OTP Submitted:', otp.join(''));
	};
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
				<form
					onSubmit={onSubmit}
					className='flex flex-col gap-2 w-full max-w-sm lg:max-w-md'
				>
					<div>
						<h2 className='text-2xl font-bold'>OTP Verification</h2>
					</div>
					<div className='flex justify-center my-5 text-sm'>
						{otp.map((value, index) => (
							<input
								key={index}
								id={`otp-input-${index}`}
								className='w-14 h-14 text-center text-colors-darkGrayFont text-lg rounded-2xl mx-2 px-3 py-2 shadow focus:outline-none focus:ring-2 focus:ring-colors-themeColor ring-colors-darkGrayFont'
								type='text'
								maxLength={1}
								value={value}
								onChange={(e) => handleChange(index, e.target.value)}
								onKeyDown={(e) => handleKeyDown(index, e)}
							/>
						))}
					</div>

					<div className='mb-2'>
						<button
							type='submit'
							className='flex items-center justify-center bg-colors-themeColor font-semibold text-white w-full p-2 hover:underline'
						>
							Continue
						</button>
					</div>

					<div className='text-center mt-5 text-colors-darkGrayFont text-sm'>
						{timer > 0 ? (
							<p>
								Resend OTP in{' '}
								<span className='text-colors-fontColor'>{timer} seconds</span>
							</p>
						) : (
							<Link href='/forgot' className='text-colors-fontColor'>
								Resend OTP
							</Link>
						)}
					</div>
				</form>
			</div>
		</div>
	);
};
