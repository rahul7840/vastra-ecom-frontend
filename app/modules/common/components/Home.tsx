'use client';
import { CustomCarousel } from '@/app/components/CustomCarousel';
import { TestimonailsComponent } from '@/app/components/Testimonials';
import { TitleWithCards } from '@/app/components/TitleWithCards';
import { IProduct } from '@/app/utils/types';
import 'swiper/swiper-bundle.css';

export const Home = () => {
	const images = ['/assets/images/banner.png', '/assets/images/banner.png'];

	const items: IProduct[] = [
		{
			id: '1',
			name: 'T-Shirt Name Lorem ipsum lorem ipsum ',
			img: '/assets/images/shirt.png',
			category: 'Category lorem ipsum',
			price: 'Rs.9,990.00',
			discountedPrice: 'Rs.9,990.00',
		},
		{
			id: '2',
			name: 'T-Shirt Name Lorem ipsum lorem ipsum ',
			img: '/assets/images/shirt.png',
			category: 'Category lorem ipsum',
			price: 'Rs.9,990.00',
			discountedPrice: 'Rs.9,990.00',
		},
		{
			id: '3',
			name: 'T-Shirt Name Lorem ipsum lorem ipsum ',
			img: '/assets/images/shirt.png',
			category: 'Category lorem ipsum',
			price: 'Rs.9,990.00',
			discountedPrice: 'Rs.9,990.00',
		},
		{
			id: '4',
			name: 'T-Shirt Name Lorem ipsum lorem ipsum ',
			img: '/assets/images/shirt.png',
			category: 'Category lorem ipsum',
			price: 'Rs.9,990.00',
			discountedPrice: 'Rs.9,990.00',
		},
		{
			id: '5',
			name: 'T-Shirt Name Lorem ipsum lorem ipsum ',
			img: '/assets/images/shirt.png',
			category: 'Category lorem ipsum',
			price: 'Rs.9,990.00',
			discountedPrice: 'Rs.9,990.00',
		},
		{
			id: '6',
			name: 'T-Shirt Name Lorem ipsum lorem ipsum ',
			img: '/assets/images/shirt.png',
			category: 'Category lorem ipsum',
			price: 'Rs.9,990.00',
			discountedPrice: 'Rs.9,990.00',
		},
		{
			id: '7',
			name: 'T-Shirt Name Lorem ipsum lorem ipsum ',
			img: '/assets/images/shirt.png',
			category: 'Category lorem ipsum',
			price: 'Rs.9,990.00',
			discountedPrice: 'Rs.9,990.00',
		},
		{
			id: '8',
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
};
