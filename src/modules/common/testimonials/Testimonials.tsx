'use client';
import 'swiper/swiper-bundle.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import { Title } from '../components/Title';
import { TestimonailCard } from './TestimonialCard';

interface TestimonialsProps {
	showTitle?: boolean;
	
}

export const Testimonails = ({ showTitle = true }: TestimonialsProps) => {
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

	return (
		<div className={'flex flex-col gap-9'}>
			{showTitle && <Title text='Testimonials' />}

			<div className='mx-7 my-4'>
				<Swiper
					spaceBetween={30}
					slidesPerView={5}
					autoplay={{
						delay: 2500,
						disableOnInteraction: false,
					}}
					modules={[Autoplay]}
					loop={true}
				>
					{testimonials?.map((e: any, index: number) => (
						<SwiperSlide className='py-3' key={index}>
							<TestimonailCard item={e} />
						</SwiperSlide>
					))}
				</Swiper>
			</div>
		</div>
	);
};
