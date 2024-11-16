import Link from 'next/link';

export const ResetTemplate = () => {
	return (
		<div className='flex flex-col lg:flex-row justify-center items-center h-screen'>
			<div className='h-2/5 lg:h-full w-full lg:order-2'>
				<img
					src={'/assets/images/authImg.svg'}
					alt='authImg'
					className='max-h-full w-full object-cover object-top'
				/>
			</div>
			<div className='relative h-3/5 lg:h-full w-full p-5 flex flex-col items-center justify-center '>
				<img
					src={'/assets/images/logo.svg'}
					alt='authImg'
					className='absolute w-[75px] h-[100px] top-5 left-5 hidden lg:block'
				/>
				<form className='flex flex-col gap-2 w-full max-w-sm lg:max-w-md'>
					<div>
						<h2 className='text-2xl font-bold'>Change Password</h2>
					</div>
					<div className='flex flex-col gap-2 my-1 text-sm'>
						<div>
							<label htmlFor='n-password' className='font-semibold'>
								New Password
							</label>
							<div className='relative mt-1'>
								<input
									type='password'
									id='n-password'
									placeholder='Enter your password'
									className='border border-colors-grayBorder w-full p-2'
								/>
								<p className='absolute top-3 right-2 text-xs font-medium text-colors-grayFont'>
									Show
								</p>
							</div>
						</div>
						<div>
							<label htmlFor='c-password' className='font-semibold'>
								Confirm Password
							</label>
							<div className='relative mt-1'>
								<input
									type='password'
									id='c-password'
									placeholder='Enter your password'
									className='border border-colors-grayBorder w-full p-2'
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
								<img
									src={'/assets/images/G-icon.svg'}
									alt='Icon'
									className='w-[20px] h-[100px]'
								/>
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
			</div>
		</div>
	);
};
