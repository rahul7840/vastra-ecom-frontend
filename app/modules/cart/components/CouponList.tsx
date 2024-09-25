import React from 'react';
import { ICoupon } from '../../types/coupon';
import CouponCard from './CouponCard';

interface CouponListProps {
	onClose: () => void;
	// coupons: ICoupon[];
}

const coupons: ICoupon[] = [
	{
		discount: '5% OFF',
		description: 'Lorem ipsum',
		code: 'GIVEMEREALCONTENT',
		validFrom: '00/00/0000 00:00',
		validTo: '00/00/0000 00:00',
		applicability: 'For all products.',
		additionalInfo:
			'give me real content for coupon code or lorem ipsum lorem ipsum lorem ipsum lorem ipsum',
		isActive: true,
	},
	{
		discount: '5% OFF',
		description: 'Lorem ipsum',
		code: 'GIVEMEREALCONTENT',
		validFrom: '00/00/0000 00:00',
		validTo: '00/00/0000 00:00',
		applicability: 'For all products.',
		additionalInfo:
			'give me real content for coupon code or lorem ipsum lorem ipsum lorem ipsum lorem ipsum',
		isActive: true,
	},
	{
		discount: '5% OFF',
		description: 'Lorem ipsum',
		code: 'GIVEMEREALCONTENT',
		validFrom: '00/00/0000 00:00',
		validTo: '00/00/0000 00:00',
		applicability: 'For all products.',
		additionalInfo:
			'give me real content for coupon code or lorem ipsum lorem ipsum lorem ipsum lorem ipsum',
		isActive: true,
	},
	{
		discount: '5% OFF',
		description: 'Lorem ipsum',
		code: 'GIVEMEREALCONTENT',
		validFrom: '00/00/0000 00:00',
		validTo: '00/00/0000 00:00',
		applicability: 'For all products.',
		additionalInfo:
			'give me real content for coupon code or lorem ipsum lorem ipsum lorem ipsum lorem ipsum',
		isActive: true,
	},
	{
		discount: '5% OFF',
		description: 'Lorem ipsum',
		code: 'GIVEMEREALCONTENT',
		validFrom: '00/00/0000 00:00',
		validTo: '00/00/0000 00:00',
		applicability: 'For all products.',
		additionalInfo:
			'give me real content for coupon code or lorem ipsum lorem ipsum lorem ipsum lorem ipsum',
		isActive: true,
	},
	{
		discount: '5% OFF',
		description: 'Lorem ipsum',
		code: 'GIVEMEREALCONTENT',
		validFrom: '00/00/0000 00:00',
		validTo: '00/00/0000 00:00',
		applicability: 'For all products.',
		additionalInfo:
			'give me real content for coupon code or lorem ipsum lorem ipsum lorem ipsum lorem ipsum',
		isActive: true,
	},
];

const CouponList: React.FC<CouponListProps> = ({ onClose }) => {
	return (
		<section className='flex flex-col self-stretch my-auto min-w-[240px] w-full bg-white '>
			<header className='flex gap-10 justify-between items-start w-full text-black'>
				<h1 className='text-base font-bold leading-snug'>MY COUPONS</h1>
				<button
					type='button'
					className='flex gap-2 items-center px-2.5 py-1 text-xs font-semibold whitespace-nowrap'
					onClick={onClose}
				>
					<img
						loading='lazy'
						src='https://cdn.builder.io/api/v1/image/assets/TEMP/14e3a0e2c6ab865758544921fbc03a5b4b5a3b6a29dd0fbef6b37f2da9c7bff4?placeholderIfAbsent=true&apiKey=58620f448f4d4934b34d4e1e054160c6'
						className='object-contain shrink-0 self-stretch my-auto w-5 aspect-square'
						alt=''
					/>
					<span className='self-stretch my-auto'>Close</span>
				</button>
			</header>
			<div className='flex flex-col w-full'>
				{coupons.map((coupon, index) => (
					<CouponCard key={index} {...coupon} />
				))}
			</div>
		</section>
	);
};

export default CouponList;
