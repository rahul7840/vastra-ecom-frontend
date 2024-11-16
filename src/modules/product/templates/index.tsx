'use client';
import { api } from '@/api';
import { IApiError } from '@/api/types';
import { useCartManager } from '@/modules/cart/queries/use-cart-manager';
import { StarRating } from '@/modules/common/components/StarRating';
import { TitleWithCards } from '@/modules/common/components/TitleWithCards';
import { useMutation } from '@tanstack/react-query';
import { notFound, useRouter } from 'next/navigation';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';
import { ProductQuantity } from '../../common/components/ProductQuantity';
import { Testimonails } from '../../common/testimonials/Testimonials';
import { TabButton } from '../components/TabButton';
import { ReviewForm } from '../forms/review';
import { ReviewFormSchema } from '../forms/review/schema';
import { useProduct } from '../queries/use-product';
import { useProducts } from '../queries/use-products';
import { IAttribute, IProduct, IVariant } from '@/modules/types/product';
import { CustomCarousel } from '@/modules/common/components/CustomCarousel';

interface ProductTemplateProps {
	id: string;
}

export const ProductTemplate = ({ id }: ProductTemplateProps) => {
	const { addItemToCart } = useCartManager();
	const { product, isLoading } = useProduct(id);
	const { products: relatedProducts } = useProducts({
		limit: 10,
		sort: 'new_arrival',
	});

	const [hasVariants, setHasVariants] = useState(false);
	const [selectedAttributes, setSelectedAttributes] = useState<
		Record<string, string>
	>({});
	const [selectedImage, setSelectedImage] = useState<string>();
	const [selectedVariant, setSelectedVariant] = useState<IVariant>();
	const [hoveredVariant, setHoveredVariant] = useState<IVariant | null>(null);
	const [selectedTab, setSelectedTab] = useState(0);
	const [isWriteReview, setIsWriteReview] = useState(false);
	const router = useRouter();
	const displayedVariant = hoveredVariant || selectedVariant;

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

		addItemToCart({
			productId: id,
			quantity,
			variantId: selectedVariant?.id as string,
		});
	};

	const handleAttributeSelect = (title: string, value: string) => {
		const newSelectedAttributes = {
			...selectedAttributes,
			[title]: value,
		};
		setSelectedAttributes(newSelectedAttributes);

		const matchingVariant = product?.variants?.find((variant) =>
			Object.entries(newSelectedAttributes).every(([attrTitle, attrValue]) =>
				variant.attributeValues.some(
					(av) => av?.attribute?.title === attrTitle && av.value === attrValue
				)
			)
		);

		if (matchingVariant) {
			setSelectedVariant(matchingVariant);
		}
	};

	const getAvailableColors = (variants: IVariant[], selectedSize: string) => {
		// Get all colors available for the selected size
		return variants
			.filter((variant) =>
				variant.attributeValues.some(
					(av) => av?.attribute?.title === 'Size' && av.value === selectedSize
				)
			)
			.flatMap((variant) =>
				variant.attributeValues
					.filter((av) => av?.attribute?.title === 'Color')
					.map((av) => av?.value)
			)
			.filter((value, index, self) => self.indexOf(value) === index);
	};

	// Sort attributes to ensure Size comes before Color
	const sortedAttributes = product?.attributes?.sort((a, b) => {
		if (a.title.toLowerCase() === 'size') return -1;
		if (b.title.toLowerCase() === 'size') return 1;
		return 0;
	});

	const getPriceDisplay = () => {
		if (!product?.hasVariants) {
			// Show single product price
			return (
				<div className='flex gap-3 items-center mt-4 font-semibold w-full'>
					{product?.discountedPrice ? (
						<>
							<div className='my-auto min-w-[140px] line-through text-2xl leading-snug text-neutral-700'>
								Rs. {product?.price?.toFixed(2)}
							</div>
							<div className='flex gap-1 items-end my-auto w-full'>
								<div className='text-3xl w-full text-neutral-700'>
									Rs. {product?.discountedPrice?.toFixed(2)}
								</div>
							</div>
						</>
					) : (
						<div className='text-lg md:text-3xl w-full text-neutral-700'>
							Rs. {product?.price?.toFixed(2)}
						</div>
					)}
				</div>
			);
		}

		// For variants
		if (selectedVariant) {
			// Show selected variant price
			return (
				<div className='flex gap-3 items-center mt-4 font-semibold w-full'>
					{selectedVariant.discountedPrice ? (
						<>
							<div className='my-auto min-w-[140px] line-through text-2xl leading-snug text-neutral-700'>
								Rs. {selectedVariant.price?.toFixed(2)}
							</div>
							<div className='flex gap-1 items-end my-auto w-full'>
								<div className='text-3xl w-full text-neutral-700'>
									Rs. {selectedVariant.discountedPrice?.toFixed(2)}
								</div>
							</div>
						</>
					) : (
						<div className='text-3xl w-full text-neutral-700'>
							Rs. {selectedVariant.price?.toFixed(2)}
						</div>
					)}
				</div>
			);
		}

		// Show price range when no variant is selected
		const priceRange = {
			min: Math.min(...product.variants.map((v) => v.price)),
			max: Math.max(...product.variants.map((v) => v.price)),
		};

		const discountedPriceRange = {
			min: Math.min(
				...product.variants
					.filter((v) => v.discountedPrice)
					.map((v) => v.discountedPrice!)
			),
			max: Math.max(
				...product.variants
					.filter((v) => v.discountedPrice)
					.map((v) => v.discountedPrice!)
			),
		};

		return (
			<div className='flex gap-3 items-center mt-4 font-semibold w-full'>
				{product.variants.some((v) => v.discountedPrice) ? (
					<>
						<div className='my-auto min-w-[140px] line-through text-2xl leading-snug text-neutral-700'>
							Rs. {priceRange.min.toFixed(2)} - Rs. {priceRange.max.toFixed(2)}
						</div>
						<div className='flex gap-1 items-end my-auto w-full'>
							<div className='text-3xl w-full text-neutral-700'>
								Rs. {discountedPriceRange.min.toFixed(2)} - Rs.{' '}
								{discountedPriceRange.max.toFixed(2)}
							</div>
						</div>
					</>
				) : (
					<div className='text-3xl w-full text-neutral-700'>
						Rs. {priceRange.min.toFixed(2)} - Rs. {priceRange.max.toFixed(2)}
					</div>
				)}
			</div>
		);
	};

	useEffect(() => {
		if (product?.hasVariants) {
			setHasVariants(true);
			setSelectedVariant(product?.variants[0]);
		}
	}, [product]);

	useEffect(() => {
		if (product) {
			setSelectedImage(
				product?.hasVariants ? displayedVariant?.thumbnail : product?.thumbnail
			);
		}
	}, [product, displayedVariant]);

	if (isLoading) return <div>Loading...</div>;
	if (!product) return notFound();

	return (
		<>
			<section className='flex z-0 flex-col gap-10 items-start px-3 md:px-12 mt-12 w-full'>
				<div className='flex flex-col md:flex-row gap-10'>
					<CustomCarousel
						className='md:hidden'
						items={(hasVariants
							? selectedVariant?.images
							: product?.images
						)?.map((e) => {
							return <img className='w-full object-cover h-[400px]' src={e} />;
						})}
					/>

					<div className='flex gap-10 items-start w-full min-w-[240px] '>
						<div className='hidden md:flex flex-col gap-10 justify-start items-start w-[150px]'>
							{(hasVariants ? selectedVariant?.images : product?.images)
								?.slice(0, 4)
								.map((image, index) => (
									<img
										src={image}
										onClick={() => setSelectedImage(image)}
										className='flex cursor-pointer flex-col items-center bg-red  object-cover  max-h-[150px] min-h-[150px] max-w-[150px] min-w-[150px]'
										alt={`Product image ${index + 1}`}
									/>
								))}
						</div>
						<img
							src={selectedImage}
							className='object-cover hidden md:flex flex-col items-start justify-start bg-white md:min-w-[575px] md:min-h-[735px] md:max-w-[575px] md:max-h-[735px]  h-full'
							alt='Main product image'
						/>
						<div className='flex flex-col min-w-[240px] w-full'>
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
							{getPriceDisplay()}
							<div className='text-[10px] md:text-xs leading-4 mb-1 text-neutral-400 w-full'>
								MRP incl. of all taxes
							</div>
							<div className='flex flex-col mt-8 w-full'>
								<div className='flex flex-col max-w-full w-[325px]'>
									<div className='flex flex-col w-full'>
										{sortedAttributes?.map((attribute) => {
											const isColorAttribute =
												attribute.title.toLowerCase() === 'color';
											const selectedValue = selectedAttributes[attribute.title];
											const selectedSize = selectedAttributes['Size'];

											// Only check available colors if we're on the color attribute and have a size selected
											const availableColors =
												isColorAttribute && selectedSize
													? getAvailableColors(product.variants, selectedSize)
													: [];

											return (
												<div
													key={attribute.id}
													className='flex flex-col w-full font-semibold tracking-wide leading-snug whitespace-nowrap mb-8'
												>
													<label className='text-base text-zinc-600'>
														{attribute.title}
														{isColorAttribute && selectedValue && (
															<span className='ml-2 text-neutral-800'>
																: {selectedValue}
															</span>
														)}
													</label>

													{isColorAttribute ? (
														<div className='flex flex-wrap gap-4 mt-5'>
															{attribute.values.map((attrValue) => {
																const isSelected =
																	selectedValue === attrValue.value;
																const isAvailable = availableColors.includes(
																	attrValue.value
																);

																// Find variant with this color regardless of size
																const variantWithColor =
																	product?.variants?.find((v) =>
																		v.attributeValues.some(
																			(av) =>
																				av.value === attrValue.value &&
																				av?.attribute?.title === 'Color'
																		)
																	);

																// Find exact variant match with selected size (for availability)
																const exactVariantMatch = selectedSize
																	? product?.variants?.find((v) =>
																			v.attributeValues.some(
																				(av) =>
																					av.value === attrValue.value &&
																					av?.attribute?.title === 'Color' &&
																					v.attributeValues.some(
																						(sav) =>
																							sav?.attribute?.title ===
																								'Size' &&
																							sav.value === selectedSize
																					)
																			)
																	  )
																	: null;

																return (
																	<div
																		key={attrValue.id}
																		className='flex flex-col items-center gap-2'
																	>
																		<button
																			disabled={!isAvailable}
																			className={`relative w-16 h-16 border ${
																				isSelected
																					? 'border-2 border-red-600'
																					: 'border-gray-200'
																			} rounded-md overflow-hidden`}
																			onClick={() =>
																				handleAttributeSelect(
																					attribute.title,
																					attrValue.value
																				)
																			}
																			onMouseEnter={() =>
																				isAvailable &&
																				setHoveredVariant(
																					exactVariantMatch as IVariant
																				)
																			}
																			onMouseLeave={() =>
																				setHoveredVariant(null)
																			}
																		>
																			<div
																				className={`w-full h-full ${
																					!isAvailable ? 'opacity-50' : ''
																				}`}
																			>
																				<img
																					src={variantWithColor?.thumbnail}
																					alt={`${attrValue.value} variant`}
																					className='w-full h-full object-cover'
																				/>
																			</div>
																			{isSelected && (
																				<div className='absolute bottom-0 right-0 w-4 h-4 bg-red-600 flex items-center justify-center'>
																					<svg
																						width='12'
																						height='12'
																						viewBox='0 0 24 24'
																						fill='none'
																					>
																						<path
																							d='M5.16699 14.5C5.16699 14.5 6.66699 14.5 8.66699 18C8.66699 18 14.2258 8.83333 19.167 7'
																							stroke='white'
																							strokeWidth='2'
																							strokeLinecap='round'
																							strokeLinejoin='round'
																						/>
																					</svg>
																				</div>
																			)}
																		</button>
																		<span
																			className={`text-xs ${
																				!isAvailable
																					? 'text-gray-400'
																					: 'text-gray-700'
																			}`}
																		>
																			{attrValue.value}
																		</span>
																	</div>
																);
															})}
														</div>
													) : (
														<div className='flex gap-2.5 items-center mt-5 w-full'>
															{attribute.values.map((attrValue) => {
																const isSelected =
																	selectedValue === attrValue.value;
																return (
																	<button
																		key={attrValue.id}
																		className={`py-2.5 my-auto ${
																			attrValue.value.length > 3
																				? 'w-full'
																				: 'w-10'
																		} h-10 ${
																			isSelected
																				? 'text-white bg-red-600 border border-red-600 border-solid'
																				: 'bg-zinc-100'
																		}`}
																		onClick={() => {
																			handleAttributeSelect(
																				attribute.title,
																				attrValue.value
																			);
																			if (selectedAttributes['Color']) {
																				handleAttributeSelect('Color', '');
																			}
																		}}
																	>
																		{attrValue.value}
																	</button>
																);
															})}
														</div>
													)}
												</div>
											);
										})}
									</div>
								</div>
								<div className='flex flex-col mt-4 md:mt-8 w-full text-2xl font-semibold leading-snug'>
									<div className='flex items-start md:flex-row gap-3 md:items-center w-full'>
										<ProductQuantity
											quantity={quantity}
											handleQuantityChange={(newQuantity: number) =>
												setQuantity(newQuantity)
											}
										/>
										<button
											onClick={handleAddToCart}
											className='gap-2 h-[45px] md:h-[51px] text-lg px-7 py-2.5 border border-solid border-neutral-800 text-neutral-800 w-56 md:w-72'
										>
											Add to Cart
										</button>
									</div>
									<button
										onClick={(e) => router.push('/cart')}
										className='gap-2 md:px-4 md:py-2.5 mt-5 w-full md:max-w-[416px] text-white bg-red-700 h-[51px] text-lg md:text-[22px]'
									>
										Buy Now
									</button>
								</div>
							</div>
						</div>
					</div>
				</div>
			</section>

			<section className='flex flex-col pt-12 pb-8 lg:py-32 px-4 md:px-12 lg:px-60'>
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
					<div className='mt-4 md:mt-10 text-[#757575] text-lg'>
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
				mainDivClassName='my-4 md:my-28'
				items={relatedProducts}
				text='Related Product'
			/>
		</>
	);
};
