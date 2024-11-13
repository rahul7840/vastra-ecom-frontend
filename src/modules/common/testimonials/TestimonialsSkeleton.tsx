import 'swiper/swiper-bundle.css';
import { Swiper, SwiperSlide } from 'swiper/react';

interface TestimonialSkeletonProps {
	showTitle?: boolean;
}

const TestimonialCardSkeleton = () => {
	return (
		<div className='bg-white p-6 rounded-lg shadow-sm border border-gray-100'>
			{/* Profile and Rating */}
			<div className='flex justify-between items-center mb-4'>
				{/* Profile */}
				<div className='flex items-center gap-3'>
					{/* Avatar */}
					<div className='animate-pulse bg-gray-200 w-10 h-10 rounded-full' />
					{/* Name */}
					<div className='animate-pulse bg-gray-200 h-4 w-32 rounded' />
				</div>
				{/* Rating Stars */}
				<div className='flex gap-1'>
					{[1, 2, 3, 4, 5].map((i) => (
						<div key={i} className='animate-pulse bg-gray-200 w-4 h-4' />
					))}
				</div>
			</div>

			{/* Review Text */}
			<div className='space-y-2'>
				<div className='animate-pulse bg-gray-200 h-4 w-full rounded' />
				<div className='animate-pulse bg-gray-200 h-4 w-3/4 rounded' />
			</div>

			{/* Date */}
			<div className='animate-pulse bg-gray-200 h-3 w-24 mt-4 rounded' />
		</div>
	);
};

export const TestimonialsSkeleton = ({
	showTitle = true,
}: TestimonialSkeletonProps) => {
	return (
		<div className='flex flex-col gap-4 md:gap-9'>
			{/* Title Skeleton */}
			{showTitle && (
				<div className='flex justify-center'>
					<div className='animate-pulse bg-gray-200 h-8 w-48 rounded' />
				</div>
			)}

			{/* Testimonials Slider Skeleton */}
			<div className='mx-7 my-4'>
				<Swiper
					spaceBetween={30}
					slidesPerView={5}
					breakpoints={{
						320: {
							slidesPerView: 1,
							spaceBetween: 10,
						},
						576: {
							slidesPerView: 1,
							spaceBetween: 15,
						},
						768: {
							slidesPerView: 2,
							spaceBetween: 20,
						},
						1024: {
							slidesPerView: 2,
							spaceBetween: 25,
						},
						1280: {
							slidesPerView: 4,
							spaceBetween: 30,
						},
						1440: {
							slidesPerView: 5,
							spaceBetween: 30,
						},
					}}
				>
					{/* Generate 6 skeleton cards */}
					{Array(6)
						.fill(0)
						.map((_, index) => (
							<SwiperSlide className='py-3' key={index}>
								<TestimonialCardSkeleton />
							</SwiperSlide>
						))}
				</Swiper>
			</div>
		</div>
	);
};
