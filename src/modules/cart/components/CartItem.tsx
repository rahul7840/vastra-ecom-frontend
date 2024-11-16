'use client';
import { ProductQuantity } from '@/modules/common/components/ProductQuantity';
import { ICartItem } from '@/modules/types/cart';
import React, { useCallback, useEffect, useState } from 'react';
import { useCartManager } from '../queries/use-cart-manager';
import { debounce } from 'lodash';

interface ShoppingCartItemProps {
	item: ICartItem;
}

export const ShoppingCartItem: React.FC<ShoppingCartItemProps> = ({ item }) => {
	const { updateCartItemQuantity, removeCartItem } = useCartManager();
	const [quantity, setQuantity] = useState(item.quantity);

	const debouncedUpdateQuantity = useCallback(
		debounce((newQuantity: number) => {
			updateCartItemQuantity({
				quantity: newQuantity,
				lineId: item.id,
			});
		}, 500),
		[updateCartItemQuantity, item.id]
	);

	const handleQuantityChange = (newQuantity: number) => {
		setQuantity(newQuantity);
		debouncedUpdateQuantity(newQuantity);
	};

	const product = item.product;

	return (
		<article className='flex my-6 gap-4 md:gap-14 justify-between items-start md:items-center w-full'>
			<div className='flex gap-4 md:gap-8 items-start md:items-center my-auto w-full min-w-[240px]'>
				<img
					loading='lazy'
					src={
						product?.hasVariants ? item?.variant?.thumbnail : product?.images[0]
					}
					alt={`${product?.name}`}
					className='object-cover aspect-[0.84] w-[107px]'
				/>
				{/* <div className='flex gap-4 items-start min-w-[240px] w-full md:w-[280px]'> */}
				<div className='flex gap-3 lg:gap-0 flex-col justify-center min-w-[240px] w-full md:w-[280px]'>
					<div className='flex flex-col max-w-36 md:max-w-full w-full'>
						<h3 className='text-lg lg:text-xl  capitalize font-semibold text-neutral-900'>
							{product?.name}
						</h3>

						{item.variant && item.variant.attributeValues && (
							<div className='mt-2 space-y-1'>
								{item.variant.attributeValues.map((attr) => (
									<p key={attr.id} className='text-sm text-zinc-500'>
										{attr.attribute?.title}:
										<span className='ml-1 text-zinc-700'>{attr.value}</span>
									</p>
								))}
							</div>
						)}

						{/* <p className='mt-2 text-sm text-zinc-500'>Color: {item.color}</p> */}
					</div>
					<div className='flex lg:hidden'>
						<ProductQuantity
							quantity={quantity}
							handleQuantityChange={handleQuantityChange}
						/>
					</div>
					<button
						onClick={() => {
							removeCartItem(item.id);
						}}
						className='hidden lg:flex gap-1 items-center self-start mt-3 text-lg font-semibold whitespace-nowrap border-0 border-solid border-zinc-600 text-zinc-600'
					>
						<img
							loading='lazy'
							src='https://cdn.builder.io/api/v1/image/assets/TEMP/45422142bd2f78eb70ac24c02f6e039b8c76a09e7f5fd7b035e31d75c080ca18?placeholderIfAbsent=true&apiKey=58620f448f4d4934b34d4e1e054160c6'
							alt=''
							className='object-contain shrink-0 self-stretch my-auto w-5 aspect-square'
						/>
						<span className='self-stretch my-auto'>Remove</span>
					</button>
				</div>
			</div>
			{/* </div> */}
			<div className='flex flex-col h-full lg:flex-row lg:gap-10 justify-end lg:justify-between  items-end lg:items-center lg:my-auto text-2xl font-semibold whitespace-nowrap md:min-w-[240px] w-full md:w-[435px]'>
				<div className='hidden lg:flex'>
					<ProductQuantity
						quantity={quantity}
						handleQuantityChange={handleQuantityChange}
					/>
				</div>
				<div className='text-sm lg:text-2xl text-right text-neutral-800'>
					₹
					{(
						((product?.hasVariants
							? item?.variant?.discountedPrice ?? item?.variant?.price
							: product?.discountedPrice ?? product?.price ?? 0) ?? 0) *
						quantity
					)?.toFixed(2)}
				</div>

				<button
					onClick={() => {
						removeCartItem(item.id);
					}}
					className='flex lg:hidden gap-1 items-end lg:items-center mt-3 text-lg font-semibold whitespace-nowrap border-0 border-solid border-zinc-600 text-zinc-600'
				>
					<img
						loading='lazy'
						src='https://cdn.builder.io/api/v1/image/assets/TEMP/45422142bd2f78eb70ac24c02f6e039b8c76a09e7f5fd7b035e31d75c080ca18?placeholderIfAbsent=true&apiKey=58620f448f4d4934b34d4e1e054160c6'
						alt=''
						className='object-contain shrink-0 self-stretch my-auto w-5 aspect-square'
					/>
					<span className='self-stretch my-auto'>Remove</span>
				</button>
			</div>
		</article>
	);
};
