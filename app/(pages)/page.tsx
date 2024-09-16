'use client';
import 'swiper/swiper-bundle.css';
import { CustomCarousel } from '../components/CustomCarousel';
import { TestimonailsComponent } from '../components/Testimonials';
import { TitleWithCards } from '../components/TitleWithCards';

export default function Home() {
	const images = ['/assets/images/banner.png', '/assets/images/banner.png'];

	const items = [
		{
			name: 'T-Shirt Name Lorem ipsum lorem ipsum ',
			img: '/assets/images/shirt.png',
			category: 'Category lorem ipsum',
			price: 'Rs.9,990.00',
			discountedPrice: 'Rs.9,990.00',
		},
		{
			name: 'T-Shirt Name Lorem ipsum lorem ipsum ',
			img: '/assets/images/shirt.png',
			category: 'Category lorem ipsum',
			price: 'Rs.9,990.00',
			discountedPrice: 'Rs.9,990.00',
		},
		{
			name: 'T-Shirt Name Lorem ipsum lorem ipsum ',
			img: '/assets/images/shirt.png',
			category: 'Category lorem ipsum',
			price: 'Rs.9,990.00',
			discountedPrice: 'Rs.9,990.00',
		},
		{
			name: 'T-Shirt Name Lorem ipsum lorem ipsum ',
			img: '/assets/images/shirt.png',
			category: 'Category lorem ipsum',
			price: 'Rs.9,990.00',
			discountedPrice: 'Rs.9,990.00',
		},
		{
			name: 'T-Shirt Name Lorem ipsum lorem ipsum ',
			img: '/assets/images/shirt.png',
			category: 'Category lorem ipsum',
			price: 'Rs.9,990.00',
			discountedPrice: 'Rs.9,990.00',
		},
		{
			name: 'T-Shirt Name Lorem ipsum lorem ipsum ',
			img: '/assets/images/shirt.png',
			category: 'Category lorem ipsum',
			price: 'Rs.9,990.00',
			discountedPrice: 'Rs.9,990.00',
		},
		{
			name: 'T-Shirt Name Lorem ipsum lorem ipsum ',
			img: '/assets/images/shirt.png',
			category: 'Category lorem ipsum',
			price: 'Rs.9,990.00',
			discountedPrice: 'Rs.9,990.00',
		},
		{
			name: 'T-Shirt Name Lorem ipsum lorem ipsum ',
			img: '/assets/images/shirt.png',
			category: 'Category lorem ipsum',
			price: 'Rs.9,990.00',
			discountedPrice: 'Rs.9,990.00',
		},
	];

	return (
		<div>
			<CustomCarousel
				items={images.map((e) => {
					return (
						<div>
							<img src={e} />
						</div>
					);
				})}
			/>

			<div className='flex flex-col gap-32'>
				<TitleWithCards viewAll={true} items={items} text='Trending Now' />
				<TitleWithCards items={items} text='Best Seller' />
				<TitleWithCards viewAll={true} items={items} text='New Arrival' />
			</div>

			<TestimonailsComponent />
		</div>
	);
}
