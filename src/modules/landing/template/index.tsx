'use client';
import { CustomCarousel } from '@/modules/common/components/CustomCarousel';
import { TitleWithCards } from '@/modules/common/components/TitleWithCards';
import { Testimonails } from '@/modules/common/testimonials/Testimonials';
import { useProducts } from '@/modules/product/queries/use-products';
import { useEffect, useState } from 'react';

export const LandingTemplate = () => {
	const [isSmallScreen, setIsSmallScreen] = useState(false);

	const { products: trendingNow, isLoading: trendingNowLoading } = useProducts({
		limit: 8,
		sort: 'trending',
	});

	const { products: bestSeller, isLoading: bestSellerLoading } = useProducts({
		limit: 8,
		sort: 'best_seller',
	});

	const { products: newArrival, isLoading: newArrivalLoading } = useProducts({
		limit: 8,
		sort: 'new_arrival',
	});

	useEffect(() => {
		setIsSmallScreen(window.innerWidth < 1024);
	}, [window.innerWidth]);

	return (
		<div>
			<img
				src={
					isSmallScreen
						? '/assets/images/banner-m.png'
						: '/assets/images/banner.png'
				}
				alt=''
				className='w-full object-cover h-[36rem] md:h-[665px] mb-8'
			/>

			{/* <CustomCarousel
				items={images.map((e) => {
					return (
						<img
							className='w-full object-cover h-[400px] md:h-[665px]'
							src={e}
						/>
					);
				})}
			/> */}

			<div className='flex flex-col gap-8 md:gap-32 mb-14'>
				<TitleWithCards
					viewAll={true}
					isLoading={trendingNowLoading}
					items={trendingNow}
					text='Trending Now'
					link='/products'
				/>
				<TitleWithCards
					isLoading={bestSellerLoading}
					items={bestSeller}
					text='Best Seller'
					link='/products'
				/>
				<TitleWithCards
					isLoading={newArrivalLoading}
					viewAll={true}
					items={newArrival}
					text='New Arrival'
					link='/new-arrivals'
				/>
			</div>

			<Testimonails />
		</div>
	);
};
