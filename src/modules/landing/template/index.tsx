'use client';
import { CustomCarousel } from '@/modules/common/components/CustomCarousel';
import { TitleWithCards } from '@/modules/common/components/TitleWithCards';
import { Testimonails } from '@/modules/common/testimonials/Testimonials';
import { useProducts } from '@/modules/product/queries/use-products';

export const LandingTemplate = () => {
	const images = ['/assets/images/banner.png', '/assets/images/banner.png'];

	const { products: trendingNow, isLoading } = useProducts({
		limit: 10,
		sort: 'trending',
	});

	const { products: bestSeller, isLoading: bestSellerLoading } = useProducts({
		limit: 10,
		sort: 'best_seller',
	});

	const { products: newArrival, isLoading: newArrivalLoading } = useProducts({
		limit: 10,
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

			<div className='flex flex-col gap-32 mb-14'>
				<TitleWithCards
					viewAll={true}
					items={trendingNow}
					text='Trending Now'
				/>
				<TitleWithCards items={bestSeller} text='Best Seller' />
				<TitleWithCards viewAll={true} items={newArrival} text='New Arrival' />
			</div>

			<Testimonails />
		</div>
	);
};
