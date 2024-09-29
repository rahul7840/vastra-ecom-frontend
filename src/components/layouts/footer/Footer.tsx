import Image from 'next/image';
import React from 'react';
import logo from '@/../public/assets/images/logo.svg';
import facebook from '@/../public/assets/images/facebook.svg';
import instagram from '@/../public/assets/images/instagram.svg';
import pinterest from '@/../public/assets/images/pinterest.svg';
import youtube from '@/../public/assets/images/youtube.svg';
import twitter from '@/../public/assets/images/twitter.svg';
import email from '@/../public/assets/images/mailIcon.svg';
import call from '@/../public/assets/images/callIcon.svg';
import location from '@/../public/assets/images/locationIcon.svg';

export const Footer = () => {
	return (
		<footer className='text-black-100 mt-5 border-t border-gray-100'>
			<div className='my-5 text-center'>
				<p className='text-gray-700'>
					Over <span className='font-bold'>15 Thousand</span> Happy Customers
				</p>
			</div>
			<div className='flex flex-col gap-5 px-12 my-10 lg:flex-row xl:justify-between'>
				<div className='w-[25%]'>
					<Image
						src={logo}
						alt='logo'
						width={90}
						height={37}
						className='object-contain '
					/>
					<p className='mb-6 mt-10 text-sm text-gray-500'>
						About us ipsum dolor sit amet, consectetuer adipiscing elit, sed
						diam nonummy dolor sit amet, consectetuer adipiscing elit, sed diam
						nonummy.
					</p>
					<div className='flex flex-wrap gap-2'>
						<Image
							src={facebook}
							alt='Facebook'
							width={45}
							height={41}
							className='object-contain '
						/>
						<Image
							src={instagram}
							alt='Instagram'
							width={45}
							height={41}
							className='object-contain '
						/>
						<Image
							src={pinterest}
							alt='Pinterest'
							width={45}
							height={41}
							className='object-contain '
						/>
						<Image
							src={youtube}
							alt='YouTube'
							width={45}
							height={41}
							className='object-contain '
						/>
						<Image
							src={twitter}
							alt='Twitter'
							width={45}
							height={41}
							className='object-contain '
						/>
					</div>
				</div>
				{/* Contact Section */}
				<div className='flex flex-col gap-5 text-base w-[20%]'>
					<h3 className='font-bold text-gray-600'>Contact</h3>
					<div className='flex gap-2 items-start'>
						<Image
							src={email}
							alt='email'
							width={20}
							height={20}
							className='object-contain '
						/>
						<a
							href='mailto:thingslinker@gmail.com'
							className='text-gray-500 text-sm'
						>
							demoemail@gmail.com
						</a>
					</div>

					<div className='flex gap-2 items-start'>
						<Image
							src={call}
							alt='Call'
							width={20}
							height={20}
							className='object-contain '
						/>
						<a href='/' className='text-gray-500 text-sm'>
							+91-00000-00000
						</a>
					</div>

					<div className='flex gap-2 items-start'>
						<Image
							src={location}
							alt='location'
							width={20}
							height={20}
							className='object-contain '
						/>
						<a href='/' className='text-gray-500 text-sm'>
							Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
							nonummy
						</a>
					</div>
				</div>

				{/* Customer Service */}
				<div className='flex flex-col gap-5 text-base w-[15%]'>
					<h3 className='font-bold text-gray-600'>Customer Service</h3>
					<a href='/' className='text-gray-500 text-sm'>
						Contact us
					</a>
					<a href='/' className='text-gray-500 text-sm'>
						FAQ's
					</a>
					<a href='/' className='text-gray-500 text-sm'>
						Shipping and Returns
					</a>
					<a href='/' className='text-gray-500 text-sm'>
						Size Guide
					</a>
				</div>

				{/* Legal Section */}
				<div className='flex flex-col gap-5 text-base w-[15%]'>
					<h3 className='font-bold text-gray-600'>Legal</h3>
					<a href='/' className='text-gray-500 text-sm'>
						Privacy Policy
					</a>
					<a href='/' className='text-gray-500 text-sm'>
						Terms & Conditions
					</a>
				</div>

				{/* Sign Up for Offers Section */}
				<div className='flex flex-col text-base w-[25%]'>
					<h3 className='font-bold mb-5 text-gray-600'>
						Sign up for exciting offers
					</h3>
					<div>
						<p className='text-sm text-gray-500 mb-5'>
							About us ipsum dolor sit amet, consectetuer adipiscing elit, sed
							diam nonummy dolor sit amet, consectetuer adipiscing elit, sed
							diam nonummy.
						</p>
					</div>
					<div className='flex gap-2'>
						<input
							type='text'
							placeholder='Enter your email'
							className='px-5 py-2 border-gray-400 border-[1.5px] text-sm'
						/>
						<button className='px-5 py-2 bg-[#871B1B] text-md text-white'>
							Submit
						</button>
					</div>
				</div>
			</div>
		</footer>
	);
};
