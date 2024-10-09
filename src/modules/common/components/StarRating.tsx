import React from 'react';

interface StarIconProps {
	filled: boolean;
	onClick: () => void;
}

const StarIcon: React.FC<StarIconProps> = ({ filled, onClick }) => (
	<img
		loading='lazy'
		src={`/assets/images/star${filled ? '' : '-light'}.svg`}
		alt={filled ? 'Filled star' : 'Empty star'}
		className='object-contain shrink-0 self-stretch my-auto aspect-square w-[18px]'
		onClick={onClick}
	/>
);

interface StarRatingProps {
	rating: number;
	readonly?: boolean;
	onChange?: (rating: number) => void;
}

export const StarRating: React.FC<StarRatingProps> = ({
	rating,
	readonly = false,
	onChange,
}) => {
	return (
		<div
			className='flex gap-1 items-center'
			role='img'
			aria-label={`Rating: ${rating} out of 5 stars`}
		>
			{[...Array(5)].map((_, index) => (
				<StarIcon
					key={index}
					filled={index < rating}
					onClick={() => !readonly && onChange && onChange(index + 1)}
				/>
			))}
		</div>
	);
};
