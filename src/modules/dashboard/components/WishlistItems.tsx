import Link from 'next/link';
import { Card } from '../../common/components/Card';
import { Badge } from '../../common/components/Badge';
import { Icon } from '../../common/components/Icon';
import Image from 'next/image';

export const WishlistItems = () => {
	const items = [
		{
			id: '1',
			name: 'Wireless Earbuds',
			price: 99.99,
			image: '/images/products/earbuds.jpg',
		},
		// Add more items
	];

	return (
		<Card className='p-6'>
			<div className='flex justify-between items-center mb-6'>
				<h2 className='text-xl font-semibold'>Wishlist</h2>
				<Link
					href='/account/wishlist'
					className='text-primary flex items-center hover:underline'
				>
					View All
					<Icon name='chevron_right' className='ml-1' />
				</Link>
			</div>

			<div className='space-y-4'>
				{items.map((item) => (
					<div
						key={item.id}
						className='flex items-center space-x-4 p-3 border rounded-lg hover:bg-gray-50'
					>
						<div className='relative w-16 h-16'>
							<Image
								src={item.image}
								alt={item.name}
								fill
								className='object-cover rounded-md'
							/>
						</div>
						<div className='flex-1'>
							<p className='font-medium'>{item.name}</p>
							<p className='text-primary'>${item.price}</p>
						</div>
						<button className='text-gray-500 hover:text-primary'>
							<Icon name='shopping_cart' />
						</button>
					</div>
				))}
			</div>
		</Card>
	);
};
