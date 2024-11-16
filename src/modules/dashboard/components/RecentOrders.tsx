import Link from 'next/link';
import { Card } from '../../common/components/Card';
import { Badge } from '../../common/components/Badge';
import { Icon } from '../../common/components/Icon';
import { useOrders } from '@/modules/order/queries/use-orders';
import { formatDate } from '@/modules/lib/utils';

// const orders = [
// 	{
// 		id: 'ORD123',
// 		customOrderId: 'ORD123',
// 		shipRocketOrderId: 'ORD123',
// 		shipmentId: 'ORD123',
// 		awbCode: '1234567890',
// 		courierCompanyId: 1,
// 		userId: 'USR123',
// 		paymentId: 'PAY123',
// 		billingAddressId: 'ADDR123',
// 		shippingAddressId: 'ADDR123',
// 		orderDate: '20 Mar 2024',
// 		estimatedDeliveryDate: '20 Mar 2024',
// 		actualDeliveryDate: '20 Mar 2024',
// 		shippingCost: 100,
// 		codCharges: 0,
// 		subTotal: 299.99,
// 		totalCost: 299.99,
// 		status: 'Delivered',
// 		user: {
// 			id: 'USR123',
// 			name: 'John Doe',
// 		},
// 		billingAddress: {
// 			id: 'ADDR123',
// 			address: '123 Main St, Anytown, USA',
// 		},
// 		shippingAddress: {
// 			id: 'ADDR123',
// 			address: '123 Main St, Anytown, USA',
// 		},
// 		orderItems: [
// 			{
// 				id: 'ORD123',
// 				orderId: 'ORD123',
// 				productId: 'PROD123',
// 				variantId: 'VAR123',
// 				name: 'Product Name',
// 				thumbnail: 'https://via.placeholder.com/150',
// 				images: ['https://via.placeholder.com/150'],
// 				sku: 'SKU123',
// 				weight: 100,
// 				width: 100,
// 				height: 100,
// 				length: 100,
// 				price: 100,
// 				discountedPrice: 100,
// 				quantity: 1,
// 				createdAt: '20 Mar 2024',
// 				updatedAt: '20 Mar 2024',
// 			},
// 			{
// 				id: 'ORD123',
// 				orderId: 'ORD123',
// 				productId: 'PROD123',
// 				variantId: 'VAR123',
// 				name: 'Product Name',
// 				thumbnail: 'https://via.placeholder.com/150',
// 				images: ['https://via.placeholder.com/150'],
// 				sku: 'SKU123',
// 				weight: 100,
// 				width: 100,
// 				height: 100,
// 				length: 100,
// 				price: 100,
// 				discountedPrice: 100,
// 				quantity: 1,
// 				createdAt: '20 Mar 2024',
// 				updatedAt: '20 Mar 2024',
// 			},
// 		],
// 	},
// ];

export const RecentOrders = () => {
	const { orders, isLoading } = useOrders({
		limit: 3,
		sort: 'createdAt:desc',
	});

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
				{isLoading ? (
					// Loading state
					<div className='flex items-center justify-center py-8'>
						<div className='animate-spin rounded-full h-8 w-8 border-b-2 border-primary'></div>
					</div>
				) : orders && orders.length > 0 ? (
					// Orders list
					orders.map((order) => (
						<div
							key={order.id}
							className='flex items-center justify-between p-4 border rounded-lg hover:bg-gray-50'
						>
							<div className='flex items-center space-x-4'>
								<Icon name='package' className='text-2xl text-gray-500' />
								<div>
									<p className='font-medium'>Order #{order.id}</p>
									<p className='text-sm text-gray-600'>
										{formatDate(order.orderDate)}
									</p>
								</div>
							</div>
							<div className='flex items-center space-x-4'>
								<Badge
									variant={order.status === 'Delivered' ? 'success' : 'default'}
								>
									{order.status}
								</Badge>
								<p className='font-medium'>${order.totalCost}</p>
							</div>
						</div>
					))
				) : (
					// No orders state
					<div className='text-center py-8'>
						<div className='mb-3 text-gray-400'>
							<Icon name='shopping_bag' className='h-12 w-12 mx-auto' />
						</div>
						<h3 className='text-lg font-medium text-gray-900 mb-1'>
							No Orders Yet
						</h3>
						<p className='text-gray-500 mb-4'>
							When you place orders, they will appear here
						</p>
						<Link
							href='/products'
							className='inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-primary/90'
						>
							<Icon name='shopping_cart' className='mr-2 ' />
							Start Shopping
						</Link>
					</div>
				)}
			</div>
		</Card>
	);
};
