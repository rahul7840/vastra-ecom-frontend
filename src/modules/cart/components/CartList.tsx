import React from 'react';
import { ShoppingCartItem } from './CartItem';

interface CartItem {
	id: number;
	imageSrc: string;
	productName: string;
	color: string;
	price: number;
	quantity: number;
}

interface ShoppingCartListProps {
	items: CartItem[];
}

const ShoppingCartList: React.FC<ShoppingCartListProps> = ({ items }) => {
	return (
		<section className='flex flex-col tracking-wide leading-snug min-w-[240px] w-[888px] max-md:max-w-full'>
			<header className='flex flex-col w-full text-2xl font-semibold text-neutral-700 max-md:max-w-full'>
				<div className='flex gap-10 justify-between items-center w-full max-md:max-w-full'>
					<h2 className='w-full self-stretch my-auto'>Product</h2>
					<div className='flex gap-10 justify-between items-center self-stretch my-auto min-w-[240px] w-full'>
						<h3 className='self-stretch my-auto'>Quantity</h3>
						<h3 className='self-stretch my-auto'>Final Price</h3>
					</div>
				</div>
				<div className='mt-6 w-full border border-solid border-zinc-600 min-h-[1px] max-md:max-w-full' />
			</header>
			{items.map((item) => (
				<React.Fragment key={item.id}>
					<ShoppingCartItem
						imageSrc={item.imageSrc}
						productName={item.productName}
						color={item.color}
						price={item.price}
						quantity={item.quantity}
					/>
					<div className='w-full border border-solid border-zinc-100 min-h-[1px] max-md:max-w-full' />
				</React.Fragment>
			))}
		</section>
	);
};

export default ShoppingCartList;