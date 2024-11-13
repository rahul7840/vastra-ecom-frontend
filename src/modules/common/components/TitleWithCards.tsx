'use client';
import { Title } from './Title';
import { ProductCard } from './Product';
import { IProduct } from '@/modules/types/product';
import { ProductCardSkeleton } from './ProductCardSkeleton';

interface Props {
	text: string;
	items: IProduct[] | null | undefined;
	viewAll?: boolean;
	mainDivClassName?: string;
	isLoading?: boolean;
}

export const TitleWithCards = (props: Props) => {
	const {
		text,
		items,
		viewAll = false,
		mainDivClassName = '',
		isLoading = false,
	} = props;

	return (
		<div
			className={`flex flex-col w-full max-xs:max-w-96 sm:max-w-128 ${mainDivClassName}`}
		>
			<Title text={text} />

			{items && (
				<div className='flex flex-col justify-center items-center mt-8 md:mt-16 px-4 md:px-14'>
					<div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 items-center justify-center gap-x-4 gap-y-8 sm:gap-x-8 sm:gap-y-16 w-full max-w-[1383px]'>
						{isLoading
							? [1, 2, 3, 4].map((index) => <ProductCardSkeleton key={index} />)
							: items.map((product: IProduct) => {
									return <ProductCard product={product} />;
							  })}
					</div>

					{!isLoading && viewAll && (
						<div className='flex gap-4 mt-4 sm:mt-12'>
							<img src='/assets/images/curly-light.svg' alt='' />
							<div className='underline text-sm font-semibold text-[#212121]'>
								View All
							</div>
							<img src='/assets/images/curly-light.svg' alt='' />
						</div>
					)}
				</div>
			)}
		</div>
	);
};
