import React from 'react';
import { ICoupon } from '../../types/coupon';

const CouponCard: React.FC<ICoupon> = ({
	discount,
	description,
	code,
	validFrom,
	validTo,
	applicability,
	additionalInfo,
	isActive,
}) => {
	return (
		<article className='flex flex-col justify-center p-5 mt-6 w-full rounded-xl border border-solid border-neutral-200'>
			<div className='flex flex-col w-full'>
				<div className='flex flex-col w-full font-semibold'>
					<h2 className='text-xl leading-snug text-neutral-700'>{discount}</h2>
					<p className='mt-1.5 text-xs text-neutral-400'>{description}</p>
				</div>
				<div className='flex flex-col mt-2 w-full'>
					<div className='flex gap-10 justify-between items-center w-full text-xs'>
						<p className='self-stretch my-auto text-neutral-400'>
							Code: {code}
						</p>
						<button className='flex items-start self-stretch my-auto font-semibold whitespace-nowrap text-neutral-500'>
							<span className='flex gap-1.5 justify-center items-center px-2.5 py-1.5'>
								<img
									loading='lazy'
									src={'/assets/images/copy.svg'}
									className='object-contain shrink-0 self-stretch my-auto w-5 aspect-square'
									alt=''
								/>
								<span className='self-stretch my-auto'>Copy</span>
							</span>
						</button>
					</div>
					<p className='mt-2 text-xs text-neutral-500'>
						{validFrom} – {validTo}
						<br />
						{applicability}
						<br />
						{additionalInfo}
					</p>
				</div>
			</div>
		</article>
	);
};

export default CouponCard;
