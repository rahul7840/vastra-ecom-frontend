'use client';
import 'swiper/swiper-bundle.css';
import { Swiper, SwiperSlide } from 'swiper/react';
import { Autoplay } from 'swiper/modules';
import { Title } from '../components/Title';
import { TestimonailCard } from './TestimonialCard';
import { TestimonialsSkeleton } from './TestimonialsSkeleton';

interface TestimonialsProps {
	showTitle?: boolean;
	isLoading?: boolean;
}

export const Testimonails = ({
	showTitle = true,
	isLoading,
}: TestimonialsProps) => {
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

	if (isLoading) {
		return <TestimonialsSkeleton showTitle={showTitle} />;
	}

	return (
		<div className={'flex flex-col gap-4 md:gap-9'}>
			{showTitle && <Title text='Testimonials' />}

			<div className='mx-7 my-4'>
				<Swiper
					spaceBetween={30}
					slidesPerView={5}
					autoplay={{
						delay: 2500,
						disableOnInteraction: false,
					}}
					breakpoints={{
						// Mobile first - when viewport width is >= 320px
						320: {
							slidesPerView: 1,
							spaceBetween: 10,
						},
						// Small devices (landscape phones)
						576: {
							slidesPerView: 1,
							spaceBetween: 15,
						},
						// Medium devices (tablets)
						768: {
							slidesPerView: 2,
							spaceBetween: 20,
						},
						// Large devices (desktops)
						1024: {
							slidesPerView: 2,
							spaceBetween: 25,
						},
						// Extra large devices
						1280: {
							slidesPerView: 4,
							spaceBetween: 30,
						},
						1440: {
							slidesPerView: 5,
							spaceBetween: 30,
						},
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
