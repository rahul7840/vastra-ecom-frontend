export const ProductCardSkeleton = () => {
	return (
		<div className='flex justify-center items-center'>
			<div className='flex flex-col gap-4 md:gap-8 min-w-40 max-w-40 lg:max-w-72 lg:min-w-72'>
				{/* Image Skeleton */}
				<div
					className='animate-pulse bg-gray-200 
          min-w-40 min-h-52 max-w-40 max-h-52  
          lg:max-w-72 lg:max-h-96 lg:min-w-72 lg:min-h-96'
				/>

				{/* Content Skeleton */}
				<div className='flex flex-col gap-2'>
					{/* Title Skeleton */}
					<div className='animate-pulse bg-gray-200 h-4 lg:h-6 w-full rounded' />

					{/* Price Skeleton */}
					<div className='flex items-center gap-2'>
						{/* Original Price */}
						<div className='animate-pulse bg-gray-200 h-3 md:h-4 w-16 rounded' />
						{/* Discounted Price */}
						<div className='animate-pulse bg-gray-200 h-4 md:h-5 w-20 rounded' />
					</div>
				</div>
			</div>
		</div>
	);
};
