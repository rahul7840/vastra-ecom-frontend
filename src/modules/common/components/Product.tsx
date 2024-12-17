import { IProduct } from '@/modules/types/product';
import { useRouter } from 'next/navigation';

interface Props {
	product: IProduct;
}

export const ProductCard = (props: Props) => {
	const { product } = props;
	const router = useRouter();

	const hasVariants = product.hasVariants;

	console.log(product, 'has variants', hasVariants);
	const thumbnail = hasVariants
		? product?.variants?.[0]?.thumbnail
		: product?.thumbnail;

	const price = hasVariants ? product?.variants?.[0]?.price : product?.price;
	const discountedPrice = hasVariants
		? product?.variants?.[0]?.discountedPrice
		: product?.discountedPrice;

	return (
		<div
			onClick={(e) => router.push(`/product/${product.id}`)}
			className='flex justify-center items-center cursor-pointer'
		>
			<div className='flex flex-col gap-4 md:gap-8 min-w-40 max-w-40 lg:max-w-72 lg:min-w-72 '>
				<img
					className='min-w-40 max-w-40 min-h-52  max-h-52 lg:min-w-72 lg:max-w-72 lg:max-h-96  lg:min-h-96 object-cover'
					src={thumbnail ?? ''}
					alt='Thumbnail'
				/>
				<div className='flex flex-col gap-2'>
					<div className='font-semibold truncate h-8 text-wrap capitalize text-xs lg:text-xl text-[#212121]'>
						{product.name}
					</div>
					{/* {product.category && (
						<div className='text-[#757575] text-base font-semibold'>
							{product.category}
						</div>
					)} */}

					<div className='flex items-center gap-2'>
						{discountedPrice ? (
							<>
								<div className='text-[10px] md:text-sm line-through font-semibold text-[#616161]'>
									Rs.{price}
								</div>
								<div className='text-xs md:text-lg font-semibold text-[#4F1010]'>
									Rs.{discountedPrice}
								</div>
							</>
						) : (
							<div className=' text-xs md:text-lg font-semibold text-[#4F1010]'>
								Rs.{price}
							</div>
						)}
					</div>
				</div>
			</div>
		</div>
	);
};
