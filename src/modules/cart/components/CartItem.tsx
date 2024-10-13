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
		<article className='flex my-6 gap-14 justify-between items-center w-full max-md:max-w-full'>
			<div className='flex gap-8 items-center self-stretch my-auto min-w-[240px]'>
				<img
					loading='lazy'
					src={product?.images[0]}
					alt={`${product?.name}`}
					className='object-contain shrink-0 self-stretch my-auto aspect-[0.84] w-[107px]'
				/>
				<div className='flex gap-5 items-start self-stretch my-auto min-w-[240px] w-[280px]'>
					<div className='flex flex-col justify-center min-w-[240px] w-[280px]'>
						<div className='flex flex-col w-full'>
							<h3 className='text-xl capitalize font-semibold text-neutral-900'>
								{product?.name}
							</h3>
							<p className='mt-2 text-sm text-zinc-500'>Color: {item.color}</p>
						</div>
						<button
							onClick={() => {
								removeCartItem(item.id);
							}}
							className='flex gap-1 items-center self-start mt-3 text-lg font-semibold whitespace-nowrap border-0 border-solid border-zinc-600 text-zinc-600'
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
			</div>
			<div className='flex gap-10 justify-between items-center self-stretch my-auto text-2xl font-semibold whitespace-nowrap min-w-[240px] w-[435px] max-md:max-w-full'>
				<ProductQuantity
					quantity={quantity}
					handleQuantityChange={handleQuantityChange}
				/>
				<div className='self-stretch my-auto text-right text-neutral-800'>
					₹{((product?.discountedPrice ?? 0) * quantity).toFixed(2)}
				</div>
			</div>
		</article>
	);
};
