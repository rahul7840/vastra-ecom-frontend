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
				<div className='lg:hidden'>
					<button onClick={() => setIsOpen(!isOpen)}>
						<img className='w-7 h-7' src='/assets/images/menu.svg' alt='Menu' />
					</button>
				</div>

				<div>
					<img
						onClick={() => router.push('/')}
						className='w-12 h-12 max-md:left-8 relative md:w-16 md:h-16 cursor-pointer'
						src='/assets/images/logo.svg'
						alt='Logo'
					/>
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
					{/* <li className={linkClass('/size-chart')}>
						<a href='/size-chart'>Size Chart</a>
					</li> */}
					{/* <li className={linkClass('/collections')}>
						<a href='/collections'>Collections</a>
					</li> */}
					<li className={linkClass('/policies')}>
						<a href='/policies'>Policies</a>
					</li>
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
		</>
	);
};
