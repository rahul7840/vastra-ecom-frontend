'use client';
import logo from '@/../public/assets/images/logo.svg';
import Image from 'next/image';
import { useState } from 'react';

export const Navbar = () => {
	const [isOpen, setIsOpen] = useState(false);

	const linkClass = (path: any) =>
		window?.location?.pathname === path
			? 'text-[#222222] font-semibold'
			: 'text-[#616161]';

	return (
		<>
			<div className='text-[#871B1B] bg-[#FCEAEA] text-center text-base py-4 px-4 font-normal'>
				Lorem ipsum dolor sit amet consectetur. Tellus nec orci faucibus mi
				faucibus magna. Egestas sed viverra rutrum justo sit praesent sit.
			</div>
			<nav className='flex justify-between items-center px-10 py-5'>
				<div>
					<Image src={logo} alt='Logo' width={64} height={64} />
				</div>

				<div className='lg:hidden'>
					<button onClick={() => setIsOpen(!isOpen)}>
						<img
							className='w-7 h-7'
							src='/assets/images/hamburger-icon.svg'
							alt='Menu'
						/>
					</button>
				</div>

				<ul
					className={`${
						isOpen ? 'flex' : 'hidden'
					} lg:flex flex-col lg:flex-row lg:items-center lg:gap-12 max-xl:gap-9 max-lg:gap-6 font-normal absolute lg:static bg-white top-16 left-0 right-0 lg:top-auto lg:bg-transparent py-4 lg:py-0 z-50`}
				>
					<li className={linkClass('/')}>
						<a href='/'>Home</a>
					</li>
					<li className={linkClass('/new-arrivals')}>
						<a href='/new-arrivals'>New Arrivals</a>
					</li>
					<li className={linkClass('/size-chart')}>
						<a href='/size-chart'>Size Chart</a>
					</li>
					<li className={linkClass('/collections')}>
						<a href='/collections'>Collections</a>
					</li>
					<li className={linkClass('/policies')}>
						<a href='/policies'>Policies</a>
					</li>
					<li className={linkClass('/track-order')}>
						<a href='/track-order'>Track Order</a>
					</li>
					<li className={linkClass('/contact')}>
						<a href='/contact'>Contact Us</a>
					</li>
				</ul>

				<div className='flex justify-center items-center gap-8'>
					<a href='/search'>
						<img
							className='w-7 h-7'
							src='/assets/images/search.svg'
							alt='Search'
						/>
					</a>
					<a href='/login'>
						<img
							className='w-7 h-7'
							src='/assets/images/group.svg'
							alt='Group'
						/>
					</a>
					<a href='/cart'>
						<img className='w-7 h-7' src='/assets/images/cart.svg' alt='Cart' />
					</a>
				</div>
			</nav>
		</>
	);
};
