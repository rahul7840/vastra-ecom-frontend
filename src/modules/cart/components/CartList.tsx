'use client';
import React from 'react';
import { useCartManager } from '../queries/use-cart-manager';
import { ShoppingCartItem } from './CartItem';
import { ICartItem } from '@/modules/types/cart';

interface ShoppingCartListProps {}

const ShoppingCartList: React.FC<ShoppingCartListProps> = () => {
	const { cart } = useCartManager();

	return (
		<section className='flex flex-col w-full'>
			<header className='flex flex-col w-full text-2xl font-semibold text-neutral-700'>
				<div className='flex gap-10 justify-between items-center w-full'>
					<h2 className='text-lg md:text-2xl w-full md:w-[22rem]  my-auto'>
						Product
					</h2>
					<h3 className='hidden lg:block w-44 my-auto'>Quantity</h3>
					<h3 className='hidden lg:block w-32 my-auto'>Final Price</h3>
				</div>
				<div className='mt-6 w-full border border-solid border-zinc-600 min-h-[1px]' />
			</header>
			{cart?.cartItems?.map((item: ICartItem) => {
				if (!item.product) return null;

				return (
					<React.Fragment key={item.id}>
						<ShoppingCartItem item={item} />
						<div className='w-full border border-solid border-zinc-100 min-h-[1px]' />
					</React.Fragment>
				);
			})}
		</section>
	);
};

export default ShoppingCartList;
