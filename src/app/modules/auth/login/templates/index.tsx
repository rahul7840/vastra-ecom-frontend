import Image from 'next/image';
import G_icon from '@/public/auth/G-icon.svg';
import logo from '@/public/auth/logo.svg';
import authImg from '@/public/auth/authImg.svg';
import Link from 'next/link';

export const LoginTemplate = () => {
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
			</div>
		</div>
	);
};
