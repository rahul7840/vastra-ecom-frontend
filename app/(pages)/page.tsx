'use client';
import { Swiper, SwiperSlide } from 'swiper/react';
import 'swiper/swiper-bundle.css';
import { CustomCarousel } from '../components/CustomCarousel';
import { Title } from '../components/Title';
import { TitleWithCards } from '../components/TitleWithCards';
import { TestimonailCard } from '../components/TestimonialCard';
import { Autoplay } from 'swiper/modules';
import { useState } from 'react';

export default function Home() {
	const images = ['/assets/images/banner.png', '/assets/images/banner.png'];

	const testimonials = [
		{
			name: 'Nelson Kuhlman',
			text: "I was hesitant to try this brand, but I'm so glad I did! The reviews were spot on. This product is a must-have.",
			stars: 3,
			createdAt: '24/05/2024',
		},
		{
			name: 'Sally Thiel',
			text: 'Best purchase ever! Fast shipping and excellent customer service.',
			stars: 3,
			createdAt: '24/05/2024',
		},
		{
			name: 'Omar Watsica',
			text: 'Amazing quality! This product exceeded my expectations. Highly recommend',
			stars: 3,
			createdAt: '24/05/2024',
		},
		{
			name: 'Omar Watsica',
			text: 'Amazing quality! This product exceeded my expectations. Highly recommend',
			stars: 3,
			createdAt: '24/05/2024',
		},
		{
			name: 'Omar Watsica',
			text: 'Amazing quality! This product exceeded my expectations. Highly recommend',
			stars: 3,
			createdAt: '24/05/2024',
		},
		{
			name: 'Omar Watsica',
			text: 'Amazing quality! This product exceeded my expectations. Highly recommend',
			stars: 3,
			createdAt: '24/05/2024',
		},
	];

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

			<div className='flex flex-col gap-9 mt-44'>
				<Title text='Testimonials' />

				<div className='mx-7 my-4'>
					<Swiper
						spaceBetween={30}
						slidesPerView={5}
						// onSlideChange={(swiper) => setActiveIndex(swiper.activeIndex)}
						autoplay={{
							delay: 2500,
							disableOnInteraction: false,
						}}
						modules={[Autoplay]}
						loop={true}
					>
						{testimonials.map((e, index) => (
							<SwiperSlide className='py-3' key={index}>
								<TestimonailCard item={e} />
							</SwiperSlide>
						))}
					</Swiper>
				</div>
			</div>
		</div>
	);
}
