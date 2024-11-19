'use client';
import { useSession } from '@/modules/auth/queries/use-session';
import { useCartManager } from '@/modules/cart/queries/use-cart-manager';
import { ICartItem } from '@/modules/types/cart';
import { useRouter } from 'next/navigation';
import { useState } from 'react';

declare global {
	interface Window {
		location: Location;
	}
}

export const Navbar = () => {
	const [isOpen, setIsOpen] = useState(false);

	const { cart } = useCartManager();

	const linkClass = (path: any) => {
		if (!window) return 'text-[#616161]';

		return window?.location?.pathname === path
			? 'text-[#222222] font-semibold'
			: 'text-[#616161]';
	};

	const router = useRouter();
	const { user } = useSession();

	return (
		<>
			<div className='h-8 sm:h-14 text-[#871B1B] bg-[#FCEAEA] text-center truncate text-xs sm:text-base p-2 sm:p-4 font-normal'>
				Lorem ipsum dolor sit amet consectetur. Tellus nec orci faucibus mi
				faucibus magna. Egestas sed viverra rutrum justo sit praesent sit.
			</div>
			<nav className='flex h-12 md:h-24 shadow-md justify-between items-center  px-4 md:px-10  md:py-5 sticky top-0 bg-white z-50'>
				<button className='lg:hidden' onClick={() => setIsOpen(!isOpen)}>
					<img className='w-7 h-7' src='/assets/images/menu.svg' alt='Menu' />
				</button>

				<div>
					<img
						onClick={() => router.push('/')}
						className='w-16 h-16 max-md:left-8 relative md:w-28 md:h-28 cursor-pointer'
						src='/assets/images/logo.svg'
						alt='Logo'
					/>
				</div>

				<ul
					className={`hidden lg:flex flex-row font-normal py-4 z-50 gap-12 bg-transparent`}
				>
					<li className={linkClass('/')}>
						<a href='/'>Home</a>
					</li>
					<li className={linkClass('/new-arrivals')}>
						<a href='/new-arrivals'>New Arrivals</a>
					</li>
					{/* <li className={linkClass('/size-chart')}>
						<a href='/size-chart'>Size Chart</a>
					</li> */}
					<li className={linkClass('/products')}>
						<a href='/products'>Collections</a>
					</li>
					{/* <li className={linkClass('/policies')}>
						<a href='/policies'>Policies</a>
					</li> */}
					<li className={linkClass('/contact')}>
						<a href='/contact'>Contact Us</a>
					</li>
				</ul>

				<div className='flex justify-center items-center gap-8'>
					{/* <a href='/search'>
						<img
							className='w-5 h-5 md:w-7 md:h-7'
							src='/assets/images/search.svg'
							alt='Search'
						/>
					</a> */}
					<div
						onClick={() =>
							user ? router.push('/dashboard') : router.push('/login')
						}
						className='cursor-pointer'
					>
						<img
							className='w-5 h-5 md:w-7 md:h-7'
							src='/assets/images/group.svg'
							alt='Group'
						/>
					</div>
					<div
						className='relative cursor-pointer'
						onClick={() => router.push('/cart')}
					>
						<img
							className='w-5 h-5 md:w-7 md:h-7'
							src='/assets/images/cart.svg'
							alt='Cart'
						/>

						{cart?.cartItems?.length && cart?.cartItems?.length > 0 ? (
							<span className='absolute cursor-pointer flex justify-center items-center top-[-5px] right-[-7px] text-[12px] font-semibold bg-red-500 text-white rounded-full w-5 h-5'>
								{cart?.cartItems?.reduce(
									(sum: number, item: ICartItem) => sum + item.quantity,
									0
								)}
							</span>
						) : null}
					</div>
				</div>
			</nav>
			<div
				className={`fixed inset-0 bg-black bg-opacity-50 z-50 transition-opacity duration-300 lg:hidden ${
					isOpen ? 'opacity-100 visible' : 'opacity-0 invisible'
				}`}
				onClick={() => setIsOpen(false)}
			>
				<div
					className={`fixed top-0 left-0 h-full w-64 bg-white transform transition-transform duration-300 ease-in-out ${
						isOpen ? 'translate-x-0' : '-translate-x-full'
					}`}
					onClick={(e) => e.stopPropagation()}
				>
					<div className='flex justify-between items-center p-4 border-b'>
						<img
							className='w-16 h-16'
							src='/assets/images/logo.svg'
							alt='Logo'
						/>
						<button onClick={() => setIsOpen(false)}>
							<svg
								className='w-6 h-6'
								fill='none'
								stroke='currentColor'
								viewBox='0 0 24 24'
							>
								<path
									strokeLinecap='round'
									strokeLinejoin='round'
									strokeWidth={2}
									d='M6 18L18 6M6 6l12 12'
								/>
							</svg>
						</button>
					</div>

					<ul className='flex flex-col p-4 gap-6'>
						<li className={`${linkClass('/')} hover:text-[#222222]`}>
							<a href='/' className='block py-2'>
								Home
							</a>
						</li>
						<li
							className={`${linkClass('/new-arrivals')} hover:text-[#222222]`}
						>
							<a href='/new-arrivals' className='block py-2'>
								New Arrivals
							</a>
						</li>
						<li className={`${linkClass('/policies')} hover:text-[#222222]`}>
							<a href='/policies' className='block py-2'>
								Policies
							</a>
						</li>
						<li className={`${linkClass('/track-order')} hover:text-[#222222]`}>
							<a href='/track-order' className='block py-2'>
								Track Order
							</a>
						</li>
						<li className={`${linkClass('/contact')} hover:text-[#222222]`}>
							<a href='/contact' className='block py-2'>
								Contact Us
							</a>
						</li>
					</ul>
				</div>
			</div>
		</>
	);
};
