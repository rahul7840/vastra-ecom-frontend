'use client';
import { IProduct } from '@/app/utils/types';
import { Testimonails } from '../../common/testimonials/Testimonials';
import { CustomCarousel } from '../../common/components/CustomCarousel';
import { TitleWithCards } from '../../common/components/TitleWithCards';

export const LandingTemplate = () => {
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

			<Testimonails />
		</div>
	);
};
