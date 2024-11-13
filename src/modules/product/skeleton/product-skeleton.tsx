export const ProductSkeleton = () => {
	return (
		<>
			<section className='flex z-0 flex-col gap-10 items-start px-12 mt-12 w-full max-md:px-5 max-md:mt-10 max-md:max-w-full'>
				<div className='flex gap-10'>
					{/* Thumbnail Images */}
					<div className='flex flex-wrap gap-10 items-start min-w-[240px] max-md:max-w-full'>
						<div className='flex flex-col gap-10 justify-start items-start w-[150px]'>
							{[1, 2, 3, 4].map((index) => (
								<div
									key={index}
									className='animate-pulse bg-gray-200 h-[150px] w-[150px]'
								/>
							))}
						</div>

						{/* Main Image */}
						<div className='animate-pulse bg-gray-200 min-w-[240px] w-[575px] h-[575px] max-md:max-w-full' />
					</div>

					{/* Product Details */}
					<div className='flex flex-col min-w-[240px] w-[513px]'>
						{/* Title */}
						<div className='animate-pulse bg-gray-200 h-8 w-3/4 mb-4' />

						{/* Rating */}
						<div className='flex gap-4 items-center mt-2 max-w-full'>
							<div className='animate-pulse bg-gray-200 h-4 w-[120px]' />
							<div className='animate-pulse bg-gray-200 h-4 w-[60px]' />
						</div>

						{/* Price */}
						<div className='flex gap-3 items-center mt-4 w-full'>
							<div className='animate-pulse bg-gray-200 h-6 w-[140px]' />
							<div className='animate-pulse bg-gray-200 h-8 w-[200px]' />
						</div>

						{/* Attributes */}
						<div className='flex flex-col mt-8 w-full'>
							{[1, 2].map((index) => (
								<div key={index} className='mb-8'>
									<div className='animate-pulse bg-gray-200 h-4 w-[100px] mb-4' />
									<div className='flex gap-2.5'>
										{[1, 2, 3, 4].map((i) => (
											<div
												key={i}
												className='animate-pulse bg-gray-200 h-10 w-10'
											/>
										))}
									</div>
								</div>
							))}
						</div>

						{/* Buttons */}
						<div className='flex flex-col mt-8 w-full'>
							<div className='flex gap-3 items-center w-full'>
								<div className='animate-pulse bg-gray-200 h-[51px] w-[120px]' />
								<div className='animate-pulse bg-gray-200 h-[51px] w-[283px]' />
							</div>
							<div className='animate-pulse bg-gray-200 h-[51px] w-full mt-5' />
						</div>
					</div>
				</div>
			</section>

			{/* Description Section */}
			<section className='flex flex-col py-32 px-60'>
				<div className='flex gap-20 justify-center items-center w-full'>
					<div className='animate-pulse bg-gray-200 h-8 w-[120px]' />
					<div className='animate-pulse bg-gray-200 h-8 w-[120px]' />
				</div>
				<div className='animate-pulse bg-gray-200 h-40 w-full mt-10' />
			</section>

			{/* Related Products */}
			<section className='my-28'>
				<div className='animate-pulse bg-gray-200 h-8 w-[200px] mx-auto mb-8' />
				<div className='grid grid-cols-4 gap-6 px-12'>
					{[1, 2, 3, 4].map((index) => (
						<div key={index} className='flex flex-col gap-4'>
							<div className='animate-pulse bg-gray-200 h-[384px] w-full' />
							<div className='animate-pulse bg-gray-200 h-4 w-3/4' />
							<div className='animate-pulse bg-gray-200 h-4 w-1/2' />
						</div>
					))}
				</div>
			</section>
		</>
	);
};
