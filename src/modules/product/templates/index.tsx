'use client';
import { api } from '@/api';
import { IApiError } from '@/api/types';
import { StarRating } from '@/modules/common/components/StarRating';
import { TitleWithCards } from '@/modules/common/components/TitleWithCards';
import { useMutation } from '@tanstack/react-query';
import { notFound } from 'next/navigation';
import { useState } from 'react';
import { toast } from 'react-toastify';
import { ProductQuantity } from '../../common/components/ProductQuantity';
import { Testimonails } from '../../common/testimonials/Testimonials';
import { TabButton } from '../components/TabButton';
import { ReviewForm } from '../forms/review';
import { ReviewFormSchema } from '../forms/review/schema';
import { useProduct } from '../queries/use-product';
import { useProducts } from '../queries/use-products';
import { useCartManager } from '@/modules/cart/queries/use-cart-manager';
import { useRouter } from 'next/navigation';

interface ProductTemplateProps {
	id: string;
}

export const ProductTemplate = ({ id }: ProductTemplateProps) => {
	const { product, isLoading } = useProduct(id);

	const { products: relatedProducts } = useProducts({
		limit: 10,
		sort: 'new_arrival',
	});

	const { addItemToCart } = useCartManager();

	const [selectedSize, setSelectedSize] = useState(product?.sizes[0]);
	const [selectedColor, setSelectedColor] = useState('');
	const [selectedTab, setSelectedTab] = useState(0);
	const [isWriteReview, setIsWriteReview] = useState(false);

	const mutation = useMutation({
		mutationFn: (data: ReviewFormSchema) => api.review.createReview(id, data),
		onSuccess: (response) => {
			setIsWriteReview(false);
			toast.success('Review submitted successfully.');
		},
		onError: (error: IApiError) => {
			if (error.response?.data.message) {
				toast.error(error.response.data.message);
			}
		},
	});

	const [quantity, setQuantity] = useState(1);

	const handleAddToCart = () => {
		console.log('add to cart');
		if (!selectedSize || !selectedColor) {
			toast.error('Please select size and color');
			return;
		}
		addItemToCart(id, quantity, selectedSize, selectedColor);
	};

	const router = useRouter();

	if (isLoading) return <div>Loading...</div>;
	if (!product) return notFound();

	return (
		<>
			<section className='flex z-0 flex-col gap-10 items-start px-12 mt-12 w-full max-md:px-5 max-md:mt-10 max-md:max-w-full'>
				<div className='flex  gap-10'>
					<div className='flex flex-wrap gap-10 items-start min-w-[240px] max-md:max-w-full'>
						<div className='flex flex-col gap-10 justify-start items-start w-[150px] mt-3'>
							{product.images.slice(0, 4).map((image, index) => (
								<div
									key={index}
									className={`flex overflow-hidden flex-col items-center bg-white h-[150px] w-[150px]`}
								>
									<img
										loading='lazy'
										src={image}
										className='object-contain aspect-square w-[150px]'
										alt={`Product image ${index + 1}`}
									/>
								</div>
							))}
						</div>
						<div className='flex overflow-hidden flex-col self-stretch my-auto bg-white min-w-[240px] w-[575px] max-md:max-w-full'>
							<img
								loading='lazy'
								src={product.images[0]}
								className='object-contain w-full aspect-[0.78] max-md:max-w-full'
								alt='Main product image'
							/>
						</div>
					</div>
					<div className='flex flex-col min-w-[240px] w-[513px]'>
						<h1 className='text-2xl capitalize font-semibold tracking-wider leading-snug text-neutral-800'>
							{product.name}
						</h1>
						<div className='flex gap-4 items-center mt-2 max-w-full w-[196px]'>
							<div className='flex gap-1 items-center self-stretch my-auto'>
								<StarRating rating={4} readonly />
							</div>
							<img loading='lazy' src='/assets/images/vertical.svg' alt='' />
							<div className='self-stretch my-auto text-xs font-semibold tracking-wide text-neutral-500'>
								{product?.reviews?.length} review
							</div>
						</div>
						<div className='flex gap-3 items-center mt-4 font-semibold w-full'>
							<div className='my-auto min-w-[140px] line-through text-2xl  leading-snug text-neutral-700'>
								Rs. {product.priceWithoutTax.toFixed(2)}
							</div>
							<div className='flex gap-1 items-end my-auto w-full'>
								<div className='text-3xl w-full text-neutral-700'>
									Rs. {product.discountedPrice.toFixed(2)}
								</div>
								<div className='text-xs leading-4 mb-1 text-neutral-400 w-full'>
									MRP incl. of all taxes
								</div>
							</div>
						</div>
						<div className='flex flex-col mt-8 w-full'>
							<div className='flex flex-col max-w-full w-[325px]'>
								<div className='flex flex-col w-full'>
									{product?.sizes && (
										<div className='flex flex-col w-full font-semibold tracking-wide leading-snug whitespace-nowrap'>
											<label
												htmlFor='size-select'
												className='text-base text-zinc-600'
											>
												Size
											</label>
											<div className='flex gap-2.5 items-center mt-5 w-full text-sm text-neutral-400'>
												{product?.sizes?.map((size) => (
													<button
														key={size}
														className={`py-2.5 my-auto w-10 h-10 ${
															size === selectedSize
																? 'text-white bg-red-600 border border-red-600 border-solid'
																: 'bg-zinc-100'
														}`}
														onClick={() => setSelectedSize(size)}
													>
														{size}
													</button>
												))}
											</div>
										</div>
									)}
									{product?.colors && (
										<div className='flex flex-col mt-8 w-full'>
											<label
												htmlFor='color-select'
												className='text-base font-semibold tracking-wide leading-snug text-zinc-600'
											>
												Color
											</label>
											<div className='flex gap-2.5 items-center mt-5 w-full'>
												{product?.colors?.map((color) => (
													<button
														key={color}
														style={{ backgroundColor: color }}
														className={`flex shrink-0 self-stretch py-1.5 my-auto ${
															selectedColor === color
																? 'border justify-center border-solid border-neutral-400'
																: ''
														} h-[25px] rounded-[63px] w-[25px]`}
														aria-label={`Select ${color} color`}
														onClick={() => setSelectedColor(color)}
													>
														{selectedColor === color && (
															<img
																loading='lazy'
																src='https://cdn.builder.io/api/v1/image/assets/TEMP/9115dc142c8b29197e5c49ea30b0bb6f8c596ae0f9e64a8bb9c43239ca40475e?placeholderIfAbsent=true&apiKey=58620f448f4d4934b34d4e1e054160c6'
																className='object-contain w-3 aspect-square'
																alt=''
															/>
														)}
													</button>
												))}
											</div>
										</div>
									)}
								</div>
							</div>
							<div className='flex flex-col mt-8 w-full text-2xl font-semibold tracking-wider leading-snug'>
								<div className='flex gap-3 items-center w-full'>
									<ProductQuantity
										quantity={quantity}
										handleQuantityChange={(newQuantity: number) =>
											setQuantity(newQuantity)
										}
									/>
									<button
										onClick={handleAddToCart}
										className='gap-2 self-stretch px-7 py-2.5 my-auto border border-solid border-neutral-800 min-w-[240px] text-neutral-800 w-[283px] max-md:px-5'
									>
										Add to Cart
									</button>
								</div>
								<button
									onClick={(e) => router.push('/cart')}
									className='gap-2 self-stretch px-4 py-2.5 mt-5 w-full max-w-[416px] text-white bg-red-700 min-h-[51px] max-md:px-5'
								>
									Buy Now
								</button>
							</div>
						</div>
					</div>
				</div>
			</section>

			<section className='flex flex-col py-32 px-60 '>
				<div className='flex gap-20 justify-center items-center w-full text-2xl leading-snug whitespace-nowrap max-md:max-w-full'>
					<TabButton
						label='Description'
						isActive={selectedTab === 0}
						onClick={() => setSelectedTab(0)}
					/>
					<TabButton
						label='Reviews'
						isActive={selectedTab === 1}
						onClick={() => setSelectedTab(1)}
					/>
				</div>

				{selectedTab === 0 ? (
					<div className='mt-10 text-[#757575] text-lg'>
						{product?.description}
					</div>
				) : (
					<div className='flex flex-col gap-20 mt-8'>
						<div className='flex gap-40 justify-center items-center w-full'>
							<div className='flex gap-6 items-start self-stretch my-auto'>
								<div className='flex flex-col w-full'>
									<h2 className='text-2xl font-bold text-neutral-700'>
										Customer Reviews
									</h2>
									<div className='flex gap-2 items-center mt-2 w-full'>
										<StarRating rating={3} />
										<span className='self-stretch my-auto text-xs font-semibold tracking-wide text-zinc-600'>
											3 out of 5
										</span>
									</div>
								</div>
							</div>
							{isWriteReview === true ? (
								<button
									onClick={() => setIsWriteReview(false)}
									className='gap-2 self-stretch px-7 py-3 my-auto text-xl font-semibold tracking-wider leading-snug whitespace-nowrap bg-white border-2 border-solid border-neutral-800 min-h-[51px] min-w-[240px] text-neutral-800 w-[271px] max-md:px-5'
								>
									Cancel
								</button>
							) : (
								<button
									onClick={() => setIsWriteReview(true)}
									className='gap-2 self-stretch px-7 py-3 my-auto text-xl font-semibold tracking-wider leading-snug whitespace-nowrap bg-[#222] border-2 border-solid border-neutral-800 min-h-[51px] min-w-[240px] text-white w-[271px] max-md:px-5'
								>
									Write Review
								</button>
							)}
						</div>
						{isWriteReview === true ? (
							<ReviewForm
								onSubmit={(data) => {
									mutation.mutate(data);
								}}
							/>
						) : null}
					</div>
				)}
			</section>

			<Testimonails showTitle={false} />

			<TitleWithCards
				mainDivClassName='my-28'
				items={relatedProducts}
				text='Related Product'
			/>
		</>
	);
};
