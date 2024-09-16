import { Product } from '../utils/types';

interface Props {
	item: Product;
}

export const CustomProduct = (props: Props) => {
	const { item } = props;

	return (
		<div className='flex justify-center items-center'>
			<div className='flex flex-col gap-8 w-full max-w-72'>
				<img
					className='w-full max-w-72 h-full'
					src='/assets/images/shirt.png'
					alt=''
				/>
				<div className='flex flex-col gap-2'>
					<div className='font-semibold text-xl text-[#212121]'>
						{item.name}
					</div>
					<div className='text-[#757575] text-base font-semibold'>
						{item.category}
					</div>

					<div className='flex items-center gap-2'>
						<div className='text-sm line-through font-semibold text-[#616161]'>
							{item.discountedPrice}
						</div>
						<div className='text-lg font-semibold text-[#4F1010]'>
							{item.price}
						</div>
					</div>
				</div>
			</div>
		</div>
	);
};
