import Link from 'next/link';
import { Card } from '../../common/components/Card';
import { Badge } from '../../common/components/Badge';
import { Icon } from '../../common/components/Icon';

export const RecentOrders = () => {
	const orders = [
		{
			id: 'ORD123',
			date: '20 Mar 2024',
			status: 'Delivered',
			total: 299.99,
			items: 3,
		},
		// Add more orders
	];

	return (
		<Card className='p-6'>
			<div className='flex justify-between items-center mb-6'>
				<h2 className='text-xl font-semibold'>Recent Orders</h2>
				<Link
					href='/dashboard/orders'
					className='text-primary flex items-center'
				>
					View All
					<Icon name='chevron_right' className='ml-1' />
				</Link>
			</div>

			<div className='space-y-4'>
				{orders.map((order) => (
					<div
						key={order.id}
						className='flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50'
					>
						<div className='flex items-center space-x-4'>
							<Icon name='package' className='text-2xl text-gray-500' />
							<div>
								<p className='font-medium'>Order #{order.id}</p>
								<p className='text-sm text-gray-600'>{order.date}</p>
							</div>
						</div>
						<div className='flex items-center space-x-4'>
							<Badge
								variant={order.status === 'Delivered' ? 'success' : 'default'}
							>
								{order.status}
							</Badge>
							<p className='font-medium'>${order.total}</p>
						</div>
					</div>
				))}
			</div>
		</Card>
	);
};
