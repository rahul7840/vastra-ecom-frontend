import Link from 'next/link';
import { Card } from '../../common/components/Card';
import { Badge } from '../../common/components/Badge';
import { Icon } from '../../common/components/Icon';
import { useAddresses } from '../queries/use-addresses';
import { IAddress } from '@/modules/types/cart';

interface AddressBookProps {
	address?: IAddress | null;
}

export const AddressBook = ({ address }: AddressBookProps) => {
	return (
		<Card className='p-6'>
			<div className='flex justify-between items-center mb-6'>
				<h2 className='text-xl font-semibold'>Address Book</h2>
				<Link
					href='/dashboard/addresses'
					className='text-primary flex items-center'
				>
					Manage
					<Icon name='chevron_right' className='ml-1' />
				</Link>
			</div>

			<div className='space-y-4'>
				{address?.id ? (
					<div
						key={address.id}
						className='p-4 border rounded-lg hover:bg-gray-50'
					>
						<div className='space-y-1 text-sm text-gray-600'>
							<p>{address.address}</p>
							{address.address2 && <p>{address.address2}</p>}
							<p>
								{address.city}, {address.state} {address.pincode}
							</p>
							<p>{address.country}</p>
							<p className='mt-2'>
								<span className='inline-block mr-4'>📧 {address.email}</span>
								<span>📞 {address.phone}</span>
							</p>
						</div>
					</div>
				) : (
					<div className='text-center py-8'>
						<div className='mb-3 text-gray-400'>
							<Icon name='location_off' className='h-12 w-12 mx-auto' />
						</div>
						<h3 className='text-lg font-medium text-gray-900 mb-1'>
							No Address Found
						</h3>
						<p className='text-gray-500 mb-4'>
							You haven't added any delivery addresses yet
						</p>
						{/* <Link
							href='/dashboard/addresses'
							className='inline-flex items-center justify-center px-4 py-2 text-sm font-medium text-white bg-primary rounded-md hover:bg-primary/90'
						>
							<Icon name='add' className='mr-2 h-4 w-4' />
							Add New Address
						</Link> */}
					</div>
				)}
			</div>
		</Card>
	);
};
