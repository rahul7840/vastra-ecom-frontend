'use client';
import { CustomCarousel } from '@/modules/common/components/CustomCarousel';
import { TitleWithCards } from '@/modules/common/components/TitleWithCards';
import { Testimonails } from '@/modules/common/testimonials/Testimonials';
import { useProducts } from '@/modules/product/queries/use-products';

export const LandingTemplate = () => {
	const images = ['/assets/images/banner.png', '/assets/images/banner.png'];

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
						<div>
							<img src={e} />
						</div>
					);
				})}
			/>

			<div className='flex flex-col gap-8 md:gap-32 mb-14'>
				<TitleWithCards
					viewAll={true}
					isLoading={trendingNowLoading}
					items={trendingNow}
					text='Trending Now'
				/>
				<TitleWithCards
					isLoading={bestSellerLoading}
					items={bestSeller}
					text='Best Seller'
				/>
				<TitleWithCards
					isLoading={newArrivalLoading}
					viewAll={true}
					items={newArrival}
					text='New Arrival'
				/>
			</div>

			<Testimonails />
		</div>
	);
};
