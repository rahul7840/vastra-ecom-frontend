import { IProduct } from '@/modules/types/product';
import { useRouter } from 'next/navigation';

interface Props {
	item: IProduct;
}

export const ProductCard = (props: Props) => {
	const { item } = props;
	const router = useRouter();

	return (
		<div
			onClick={(e) => router.push(`/product/${item.id}`)}
			className='flex justify-center items-center cursor-pointer'
		>
			<div className='flex flex-col gap-8 w-full max-w-72'>
				<img
					className='w-full max-w-72 h-full'
					src={item?.thumbnail ?? ''}
					alt=''
				/>
				<div className='flex flex-col gap-2'>
					<div className='font-semibold capitalize text-xl text-[#212121]'>
						{item.name}
					</div>
					{item.category && (
						<div className='text-[#757575] text-base font-semibold'>
							{item.category}
						</div>
					)}

					<div className='flex items-center gap-2'>
						<div className='text-sm line-through font-semibold text-[#616161]'>
							{item.discountedPrice}
						</div>
						<div className='text-lg font-semibold text-[#4F1010]'>
							{item.priceWithoutTax}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
