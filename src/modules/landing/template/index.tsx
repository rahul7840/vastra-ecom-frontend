'use client';
import { CustomCarousel } from '@/modules/common/components/CustomCarousel';
import { TitleWithCards } from '@/modules/common/components/TitleWithCards';
import { Testimonails } from '@/modules/common/testimonials/Testimonials';
import { useProducts } from '@/modules/product/queries/use-products';

export const LandingTemplate = () => {
	const images = [
		'/assets/images/banner.png',
		'/assets/images/banner-mobile.svg',
	];

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

	return (
		<div>
			<CustomCarousel
				items={images.map((e) => {
					return (
						<img
							className='w-full object-cover h-[400px] md:h-[665px]'
							src={e}
						/>
					);
				})}
			/>

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
