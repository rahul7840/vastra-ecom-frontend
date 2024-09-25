import React from 'react';

interface StarIconProps {
	filled: boolean;
}

const StarIcon: React.FC<StarIconProps> = ({ filled }) => (
	<img
		loading='lazy'
		src={`http://b.io/ext_${filled ? '1' : '2'}-`}
		alt={filled ? 'Filled star' : 'Empty star'}
		className='object-contain shrink-0 self-stretch my-auto aspect-square w-[18px]'
	/>
);

interface StarRatingProps {
	rating: number;
}

export const StarRating: React.FC<StarRatingProps> = ({ rating }) => {
	return (
		<div
			className='flex gap-1 items-center'
			role='img'
			aria-label={`Rating: ${rating} out of 5 stars`}
		>
			{[...Array(5)].map((_, index) => (
				<StarIcon key={index} filled={index < rating} />
			))}
		</div>
	);
};
