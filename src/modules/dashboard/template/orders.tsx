'use client';
import { Button } from '@/modules/dashboard/components/Button';
import { Icon } from '@/modules/common/components/Icon';
import { Input } from '@/modules/dashboard/components/Input';
import {
	Tabs,
	TabsContent,
	TabsList,
	TabsTrigger,
} from '@/modules/dashboard/components/Tabs';
import { useState } from 'react';
import { Card } from '@/modules/common/components/Card';
import { Badge } from '@/modules/common/components/Badge';
import { useRouter } from 'next/navigation';

interface Order {
	id: string;
	date: string;
	status: 'processing' | 'shipped' | 'delivered' | 'cancelled';
	total: number;
	items: {
		name: string;
		quantity: number;
		price: number;
		image: string;
	}[];
	trackingNumber?: string;
}

export const OrdersTemplate = () => {
	const [searchQuery, setSearchQuery] = useState('');
	const [activeTab, setActiveTab] = useState('all');

	const router = useRouter();

	// Mock data - replace with actual API call
	const orders: Order[] = [
		{
			id: 'ORD-2024-001',
			date: '2024-03-20',
			status: 'delivered',
			total: 299.99,
			trackingNumber: 'TRK123456789',
			items: [
				{
					name: 'Wireless Earbuds',
					quantity: 1,
					price: 149.99,
					image: '/images/products/earbuds.jpg',
				},
				{
					name: 'Phone Case',
					quantity: 2,
					price: 75.0,
					image: '/images/products/case.jpg',
				},
			],
		},
		// Add more orders
	];

	const getStatusColor = (status: Order['status']) => {
		const colors = {
			processing: 'bg-blue-100 text-blue-800',
			shipped: 'bg-yellow-100 text-yellow-800',
			delivered: 'bg-green-100 text-green-800',
			cancelled: 'bg-red-100 text-red-800',
		};
		return colors[status];
	};

	const filteredOrders = orders.filter((order) => {
		const matchesSearch = order.id
			.toLowerCase()
			.includes(searchQuery.toLowerCase());
		const matchesTab = activeTab === 'all' || order.status === activeTab;
		return matchesSearch && matchesTab;
	});

	return (
		<div className='p-6 max-w-7xl mx-auto'>
			<div className='mb-8'>
				<h1 className='text-2xl font-semibold mb-2'>My Orders</h1>
				<p className='text-gray-600'>Track and manage your orders</p>
			</div>

			<div className='flex flex-col md:flex-row gap-4 mb-6'>
				<div className='relative flex-1'>
					<Icon
						name='search'
						className='absolute left-3 top-1/2 -translate-y-1/2 text-gray-400'
					/>
					<Input
						type='text'
						placeholder='Search orders...'
						value={searchQuery}
						onChange={(e) => setSearchQuery(e.target.value)}
						className='pl-10'
					/>
				</div>
			</div>

			<Tabs value={activeTab} onValueChange={setActiveTab}>
				<TabsList className='mb-6'>
					<TabsTrigger value='all'>All Orders</TabsTrigger>
					<TabsTrigger value='processing'>Processing</TabsTrigger>
					<TabsTrigger value='delivered'>Delivered</TabsTrigger>
					<TabsTrigger value='cancelled'>Cancelled</TabsTrigger>
				</TabsList>

				<TabsContent value={activeTab}>
					<div className='space-y-4'>
						{filteredOrders.map((order) => (
							<Card key={order.id} className='p-6'>
								<div className='flex flex-col md:flex-row gap-6'>
									{/* Order Header */}
									<div className='flex-1'>
										<div className='flex justify-between items-start mb-4'>
											<div>
												<h3 className='font-medium'>Order #{order.id}</h3>
												<p className='text-sm text-gray-500'>
													Placed on {new Date(order.date).toLocaleDateString()}
												</p>
											</div>
											<Badge className={getStatusColor(order.status)}>
												{order.status.charAt(0).toUpperCase() +
													order.status.slice(1)}
											</Badge>
										</div>

										{/* Order Items */}
										<div className='space-y-4'>
											{order.items.map((item, index) => (
												<div key={index} className='flex gap-4'>
													<div className='w-16 h-16 bg-gray-100 rounded-lg relative'>
														{/* Replace with actual Image component */}
														<div
															className='absolute inset-0 bg-center bg-cover'
															style={{ backgroundImage: `url(${item.image})` }}
														/>
													</div>
													<div>
														<p className='font-medium'>{item.name}</p>
														<p className='text-sm text-gray-600'>
															Qty: {item.quantity} × ${item.price}
														</p>
													</div>
												</div>
											))}
										</div>
									</div>

									{/* Order Actions */}
									<div className='md:w-64 flex flex-col gap-4'>
										<div className='p-4 bg-gray-50 rounded-lg'>
											<p className='text-sm text-gray-600 mb-1'>Order Total</p>
											<p className='text-xl font-semibold'>${order.total}</p>
										</div>

										{order.trackingNumber && (
											<>
												<Button
													variant='outline'
													className='w-full flex items-center gap-2'
													onClick={() => {
														router.push(`/dashboard/orders/${order.id}/track`);
													}}
												>
													<Icon name='local_shipping' />
													Track Order
												</Button>
											</>
										)}

										{order.status === 'delivered' && (
											<Button variant='secondary' className='w-full'>
												Write Review
											</Button>
										)}
									</div>
								</div>
							</Card>
						))}

						{filteredOrders.length === 0 && (
							<div className='text-center py-12'>
								<Icon
									name='inventory_2'
									className='text-4xl text-gray-400 mb-2'
								/>
								<h3 className='text-lg font-medium mb-1'>No orders found</h3>
								<p className='text-gray-600'>
									{searchQuery
										? 'Try adjusting your search'
										: "You haven't placed any orders yet"}
								</p>
							</div>
						)}
					</div>
				</TabsContent>
			</Tabs>
		</div>
	);
};
