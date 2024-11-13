import Link from 'next/link';
import { Card } from '../../common/components/Card';
import { Badge } from '../../common/components/Badge';
import { Icon } from '../../common/components/Icon';

export const AddressBook = () => {
	const addresses = [
		{
			id: '1',
			type: 'Home',
			address: '123 Main St, New York, NY 10001',
			isDefault: true,
		},
		// Add more addresses
	];

	return (
		<Card className='p-6'>
			<div className='flex justify-between items-center mb-6'>
				<h2 className='text-xl font-semibold'>Address Book</h2>
				<Link
					href='/account/addresses'
					className='text-primary flex items-center hover:underline'
				>
					Manage
					<Icon name='chevron_right' className='ml-1' />
				</Link>
			</div>

			<div className='space-y-4'>
				{addresses.map((address) => (
					<div
						key={address.id}
						className='p-4 border rounded-lg hover:bg-gray-50'
					>
						<div className='flex items-center justify-between mb-2'>
							<span className='font-medium'>{address.type}</span>
							{address.isDefault && (
								<Badge variant='outline' className='text-xs'>
									Default
								</Badge>
							)}
						</div>
						<p className='text-gray-600 text-sm'>{address.address}</p>
					</div>
				))}
			</div>
		</Card>
	);
};
