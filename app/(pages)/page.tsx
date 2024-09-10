'use client';
import { useRouter } from 'next/navigation';
import { CustomCarousel } from '../components/CustomCarousel';

export default function Home() {
	const images = ['/assets/images/banner.png', '/assets/images/banner.png'];
	const linkClass = (path: any) =>
		window.location.pathname === path
			? 'text-[#222222] font-semibold'
			: 'text-[#616161]';

	console.log('window location pathname', window.location);

	return (
		<div>
			<div className='text-[#871B1B] bg-[#FCEAEA] text-center text-base py-4 px-4 font-normal'>
				Lorem ipsum dolor sit amet consectetur. Tellus nec orci faucibus mi
				faucibus magna. Egestas sed viverra rutrum justo sit praesent sit. Mi
				adipiscing fames accumsan ac maecenas massa euismod non. Non massa nisl
				viverra donec vivamus lectus. Mi consectetur habitant nec.
			</div>

			<nav className='flex justify-between px-10 py-5'>
				<div>
					<img src='/assets/images/logo.svg' alt='Logo' />
				</div>

				<ul className='flex justify-center items-center gap-12 font-normal'>
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
					<a href='/account'>
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

			<CustomCarousel
				items={images.map((e) => {
					return (
						<div>
							<img src={e} />
						</div>
					);
				})}
			/>

			<div className='flex justify-center gap-8'>
				<img src='/assets/images/curly.svg' alt='' />
				<div className='font-bold'>Trending Now</div>
				<img src='/assets/images/curly.svg' alt='' />
			</div>
		</div>
	);
}
