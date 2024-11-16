'use client';
import { useSession } from '@/modules/auth/queries/use-session';
import Link from 'next/link';
import { Card } from '../../common/components/Card';
import { Icon } from '../../common/components/Icon';
import { AddressBook } from '../components/AddressBook';
import { RecentOrders } from '../components/RecentOrders';
import { WishlistItems } from '../components/WishlistItems';
import { useAddresses } from '../queries/use-addresses';

export const DashboardTemplate = () => {
	const { user } = useSession();

	const { addresses, isLoading } = useAddresses();

	return (
		<div className='p-4 md:p-6 max-w-7xl mx-auto'>
			{/* Welcome Section */}
			<div className='mb-8'>
				<h1 className='text-2xl font-semibold mb-2'>Welcome back, John!</h1>
				<p className='text-gray-600'>Manage your orders and account details</p>
			</div>

			{/* Quick Actions */}
			<div className='grid grid-cols-2 md:grid-cols-4 gap-4 mb-8'>
				<Link href='/dashboard/orders'>
					<Card className='p-4 hover:shadow-lg transition-shadow cursor-pointer'>
						<div className='flex flex-col items-center'>
							<Icon
								name='local_shipping'
								className='text-3xl text-primary mb-2'
							/>
							<span className='text-sm font-medium'>My Orders</span>
						</div>
					</Card>
				</Link>

				{/* <Link href='/account/wishlist'>
					<Card className='p-4 hover:shadow-lg transition-shadow cursor-pointer'>
						<div className='flex flex-col items-center'>
							<Icon name='favorite' className='text-3xl text-primary mb-2' />
							<span className='text-sm font-medium'>Wishlist</span>
						</div>
					</Card>
				</Link> */}

				<Link href='/dashboard/addresses'>
					<Card className='p-4 hover:shadow-lg transition-shadow cursor-pointer'>
						<div className='flex flex-col items-center'>
							<Icon name='location_on' className='text-3xl text-primary mb-2' />
							<span className='text-sm font-medium'>Addresses</span>
						</div>
					</Card>
				</Link>
			</div>

			{/* Recent Orders */}
			<div className='mb-8'>
				<RecentOrders />
			</div>

			{/* Two Column Layout */}
			{/* <div className='grid md:grid-cols-2 gap-6'> */}
			{/* <WishlistItems /> */}
			<AddressBook address={addresses?.[0]} />
			{/* </div> */}
		</div>
	);
};
