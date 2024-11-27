'use client';
import { api } from '@/api';
import { IApiError } from '@/api/types';
import { useCartManager } from '@/modules/cart/queries/use-cart-manager';
import { CustomCarousel } from '@/modules/common/components/CustomCarousel';
import { StarRating } from '@/modules/common/components/StarRating';
import { TitleWithCards } from '@/modules/common/components/TitleWithCards';
import { IVariant } from '@/modules/types/product';
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
import { ProductSkeleton } from '../skeleton/product-skeleton';

interface ProductTemplateProps {
	id: string;
}

export const ProductTemplate = ({ id }: ProductTemplateProps) => {
	const { addItemToCart, cart } = useCartManager();
	const { product, isLoading } = useProduct(id);
	const { products: relatedProducts } = useProducts({
		limit: 10,
		sort: 'new_arrival',
	});
	const [hasVariants, setHasVariants] = useState(false);
	const [selectedAttributes, setSelectedAttributes] = useState<
		Record<string, string>
	>({});
	const [uniqueAttributes, setUniqueAttributes] = useState<any>([]);
	const [selectedImage, setSelectedImage] = useState<string>();
	const [selectedVariant, setSelectedVariant] = useState<IVariant>();
	const [selectedAttribute, setSelectedAttribute] = useState<string>();
	const [hoveredVariant, setHoveredVariant] = useState<IVariant | null>(null);
	const [selectedTab, setSelectedTab] = useState(0);
	const [isWriteReview, setIsWriteReview] = useState(false);
	const router = useRouter();
	const sizeOrder = ['s', 'm', 'l', 'xl', '2xl', '3xl', '4xl', '5xl'];
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

		console.log(
			'matchingVariant',
			matchingVariant,
			'for',
			newSelectedAttributes
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
					(av) => av?.attribute?.title === 'size' && av.value === selectedSize
				)
			)
			.flatMap((variant) =>
				variant.attributeValues
					.filter((av) => av?.attribute?.title === 'color')
					.map((av) => av?.value)
			)
			.filter((value, index, self) => self.indexOf(value) === index);
	};

	const getAvailableSizes = (variants: IVariant[], selectedColor: string) => {
		return variants
			.filter((variant) =>
				variant.attributeValues.some(
					(av) => av?.attribute?.title === 'color' && av.value === selectedColor
				)
			)
			.flatMap((variant) =>
				variant.attributeValues
					.filter((av) => av?.attribute?.title === 'size')
					.map((av) => av?.value)
			);
	};

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

	const renderAttributes = () => {
		return uniqueAttributes?.map((attribute: any) => {
			const isColorAttribute = attribute.title === 'color';
			const selectedValue = selectedAttributes[attribute.title];
			const selectedSize = selectedAttributes['size'];
			const selectedColor = selectedAttributes['color'];

			const renderColorVariants = () => {
				const availableColors = selectedSize
					? getAvailableColors(product?.variants as IVariant[], selectedSize)
					: [];

				return (
					<div className='flex flex-wrap gap-4 mt-5'>
						{attribute.values.map((attrValue: any) => {
							const isSelected = selectedValue === attrValue.value;
							const isAvailable = availableColors.includes(attrValue.value);

							const variantWithColor = product?.variants?.find((v) =>
								v.attributeValues.some(
									(av) =>
										av?.attribute?.title === 'color' &&
										av.value === attrValue.value
								)
							);

							return (
								<div
									key={attrValue.id}
									className='flex flex-col items-center gap-2'
								>
									<button
										disabled={!isAvailable}
										className={`relative w-16 h-16 border ${
											isSelected ? 'border-2 border-red-600' : 'border-gray-200'
										} rounded-md overflow-hidden`}
										onClick={() =>
											handleAttributeSelect(attribute.title, attrValue.value)
										}
										onMouseEnter={
											() => {
												// setHoveredVariant();
											}
											// isAvailable &&
											// setHoveredVariant(exactVariantMatch as IVariant)
										}
										onMouseLeave={() => setHoveredVariant(null)}
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
								</div>
							);
						})}
					</div>
				);
			};

			const renderSizeVariants = () => {
				const availableSizes = selectedColor
					? getAvailableSizes(product?.variants as IVariant[], selectedColor)
					: [];

				return (
					<div className='flex gap-2.5 items-center mt-5 w-full'>
						{attribute.values.map((attrValue: any) => {
							const isAvailable = availableSizes.includes(attrValue.value);
							const isSelected = selectedValue === attrValue.value;

							console.log(
								'attrvalue',
								attrValue,
								'isAvailable',
								isAvailable,
								'for color',
								selectedAttribute
							);

							return (
								<button
									disabled={!isAvailable}
									key={attrValue.id}
									className={`py-2.5 uppercase my-auto disabled:opacity-50 ${
										attrValue.value.length > 3 ? 'w-full' : 'w-10'
									} h-10 ${
										isSelected
											? 'text-white bg-red-600 border border-red-600 border-solid'
											: 'bg-zinc-100'
									}`}
									onClick={() => {
										handleAttributeSelect(attribute.title, attrValue.value);
									}}
								>
									{attrValue.value}
								</button>
							);
						})}
					</div>
				);
			};

			return (
				<div
					key={attribute.id}
					className='flex flex-col w-full font-semibold tracking-wide leading-snug whitespace-nowrap mb-8'
				>
					<label className='text-base capitalize text-zinc-600'>
						{attribute.title}
						{isColorAttribute && selectedValue && (
							<span className='ml-2 text-neutral-800'>: {selectedValue}</span>
						)}
					</label>

					{isColorAttribute ? renderColorVariants() : renderSizeVariants()}
				</div>
			);
		});
	};

	useEffect(() => {
		if (product?.hasVariants) {
			setHasVariants(true);

			// Get the first available variant
			const firstVariant = product.variants[0];
			setSelectedVariant(firstVariant);

			// Extract color and size from the first variant
			const colorValue = firstVariant.attributeValues.find(
				(attr) => attr.attribute?.title === 'color'
			)?.value;
			const sizeValue = firstVariant.attributeValues.find(
				(attr) => attr.attribute?.title === 'size'
			)?.value;

			// Set initial attributes
			setSelectedAttributes({
				color: colorValue || '',
				size: sizeValue || '',
			});

			const uniqueAttributes = product?.attributes.map((attribute) => {
				const uniqueValues = Array.from(
					new Set(attribute.values.map((v) => v.value))
				);

				if (attribute.title.toLowerCase() === 'size') {
					const sortedValues = uniqueValues.sort((a, b) => {
						const indexA = sizeOrder.indexOf(a);
						const indexB = sizeOrder.indexOf(b);
						return indexA - indexB;
					});
					attribute.values = sortedValues.map((value) => ({ value }));
				} else {
					attribute.values = uniqueValues.map((value) => ({ value }));
				}

				return attribute;
			});
			setUniqueAttributes(uniqueAttributes as any);
		}
	}, [product]);

	useEffect(() => {
		if (product) {
			setSelectedImage(
				product?.hasVariants ? displayedVariant?.thumbnail : product?.thumbnail
			);
		}
	}, [product, displayedVariant]);

	if (isLoading) return <ProductSkeleton />;
	if (!product) return notFound();

	return (
		<>
			<section className='flex z-0 flex-col lg:flex-row gap-6 lg:gap-10 items-start mt-6 lg:mt-12 w-full px-5 md:px-12'>
				<CustomCarousel
					className='lg:hidden'
					items={(hasVariants ? selectedVariant?.images : product?.images)?.map(
						(e) => {
							return <img className='w-full object-cover h-[50rem]' src={e} />;
						}
					)}
				/>

				<div className='flex gap-10 items-start w-full'>
					<div className='hidden lg:flex flex-col gap-10 justify-start items-start w-[150px]'>
						{(hasVariants ? selectedVariant?.images : product?.images)
							?.slice(0, 5)
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
						className='object-cover hidden lg:flex flex-col items-start justify-start bg-white h-full w-full lg:min-w-[400px] lg:min-h-[500px] lg:max-w-[400px] lg:max-h-[500px] xl:min-w-[600px] xl:max-w-[600px] xl:min-h-[735px] xl:max-h-[735px] '
						alt='Main product image'
					/>
					<div className='flex flex-col w-full'>
						<h1 className='text-2xl capitalize font-semibold text-neutral-800'>
							{product.name}
						</h1>
						<div className='flex gap-4 items-center mt-2 w-full max-w-full'>
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
						<div className='flex flex-col mt-4 md:mt-8 w-full'>
							<div className='flex flex-col w-full'>
								<div className='flex flex-col w-full'>{renderAttributes()}</div>
							</div>
							<div className='flex flex-col mt-4 md:mt-8 w-full text-2xl font-semibold max-w-lg'>
								<div className='flex items-start md:flex-row gap-3 md:items-center w-full'>
									<ProductQuantity
										quantity={quantity}
										handleQuantityChange={(newQuantity: number) =>
											setQuantity(newQuantity)
										}
									/>
									<button
										onClick={handleAddToCart}
										className='gap-2 h-[45px] md:h-[51px] text-lg px-7 py-2.5 border border-solid border-neutral-800 text-neutral-800 w-full'
									>
										Add to Cart
									</button>
								</div>
								<button
									onClick={(e) => router.push('/cart')}
									className='md:px-4 md:py-2.5 mt-5 w-full text-white bg-red-700 h-[51px] text-lg md:text-[22px]'
								>
									Buy Now
								</button>
							</div>
						</div>
					</div>
				</div>
			</section>

			<section className='flex flex-col pt-12 pb-8 lg:py-32 px-5 md:px-12 lg:px-20 xl:px-44 2xl:px-56'>
				<div className='flex gap-20 justify-center items-center w-full text-2xl whitespace-nowrap'>
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
					<div className='mt-4 md:mt-10 text-[#757575] text-base md:text-lg'>
						{product?.description}
					</div>
				) : (
					<div className='flex flex-col gap-10 lg:gap-20 mt-8'>
						<div className='flex flex-col sm:flex-row gap-6 lg:gap-40 justify-between items-center w-full'>
							<div className='flex flex-col w-full'>
								<h2 className='text-xl lg:text-2xl font-bold text-neutral-700'>
									Customer Reviews
								</h2>
								<div className='flex justify-start gap-2 items-center mt-2 w-full'>
									<StarRating rating={3} />
									<span className='self-stretch my-auto text-xs font-semibold tracking-wide text-zinc-600'>
										3 out of 5
									</span>
								</div>
							</div>

							<button
								onClick={() => {
									setIsWriteReview(isWriteReview === false);
								}}
								className='gap-2 px-3 md:px-7 py-3 text-xl font-semibold whitespace-nowrap bg-[#222] border-2 border-solid border-neutral-800 min-h-[51px] text-white max-w-[271px] w-full'
							>
								{isWriteReview === false ? 'Write Review' : 'Cancel'}
							</button>
						</div>
						{isWriteReview === true ? (
							<ReviewForm
								onSubmit={(data) => {
									mutation.mutate(data);
								}}
							/>
						) : null}
						<Testimonails showTitle={false} />
					</div>
				)}
			</section>

			<TitleWithCards
				mainDivClassName='my-4 md:my-28'
				items={relatedProducts}
				text='Related Product'
			/>
		</>
	);
};
