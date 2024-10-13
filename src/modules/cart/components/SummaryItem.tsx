import React from 'react';

interface SummaryItemProps {
	label: string;
	value?: number | null;
	isBold?: boolean;
}

const SummaryItem: React.FC<SummaryItemProps> = ({
	label,
	value,
	isBold = false,
}) => {
	return (
		<div className='flex flex-col justify-center py-4 w-full text-2xl tracking-wide leading-snug border-b border-neutral-100 text-neutral-800 max-md:max-w-full'>
			<div className='flex gap-10 items-start w-full max-md:max-w-full'>
				<div className='flex flex-wrap flex-1 shrink gap-5 justify-between py-px w-full basis-0 min-w-[240px] max-md:max-w-full'>
					<div className={`gap-3 self-start ${isBold ? 'font-semibold' : ''}`}>
						{label}
					</div>
					<div
						className={`${isBold ? 'font-bold' : 'font-semibold'} text-right`}
					>
						₹{value?.toFixed(2) ?? '-'}
					</div>
				</div>
			</div>
		</div>
	);
};

export default SummaryItem;
