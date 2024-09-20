import { TestimonailsComponent } from '@/app/components/Testimonials';
import React from 'react';

const page = () => {
	return (
		<section className='flex z-0 flex-col gap-10 items-start px-12 mt-12 w-full max-md:px-5 max-md:mt-10 max-md:max-w-full'>
			<div className='flex  gap-10'>
				<div className='flex flex-wrap gap-10 items-center min-w-[240px] max-md:max-w-full'>
					<div className='flex flex-col self-stretch my-auto w-[150px]'>
						{[1, 2, 3, 4].map((index) => (
							<div
								key={index}
								className={`flex overflow-hidden flex-col items-center bg-white h-[150px] w-[150px] ${
									index > 1 ? 'mt-11 max-md:mt-10' : ''
								}`}
							>
								<img
									loading='lazy'
									src='https://cdn.builder.io/api/v1/image/assets/TEMP/fcab34263bb8182476296fc80e211a97707987d295313e21b254cb9529ed36af?placeholderIfAbsent=true&apiKey=58620f448f4d4934b34d4e1e054160c6'
									className='object-contain aspect-square w-[150px]'
									alt={`Product image ${index}`}
								/>
							</div>
						))}
					</div>
					<div className='flex overflow-hidden flex-col self-stretch my-auto bg-white min-w-[240px] w-[575px] max-md:max-w-full'>
						<img
							loading='lazy'
							src='https://cdn.builder.io/api/v1/image/assets/TEMP/538f5acb690de686a146b500795b99b77b7b6e24154942b694ae74e46bde1f1d?placeholderIfAbsent=true&apiKey=58620f448f4d4934b34d4e1e054160c6'
							className='object-contain w-full aspect-[0.78] max-md:max-w-full'
							alt='Main product image'
						/>
					</div>
				</div>
				<div className='flex flex-col min-w-[240px] w-[513px]'>
					<h1 className='text-2xl font-semibold tracking-wider leading-snug text-neutral-800'>
						Product Name Lorem ipsum
					</h1>
					<div className='flex gap-4 items-center mt-2 max-w-full w-[196px]'>
						<div className='flex gap-1 items-center self-stretch my-auto'>
							{[1, 2, 3, 4, 5].map((star) => (
								<img
									key={star}
									loading='lazy'
									src={`http://b.io/ext_${star <= 3 ? '9' : '10'}-`}
									className='object-contain shrink-0 self-stretch my-auto aspect-square w-[18px]'
									alt={star <= 3 ? 'Filled star' : 'Empty star'}
								/>
							))}
						</div>
						<img
							loading='lazy'
							src='https://cdn.builder.io/api/v1/image/assets/TEMP/b3e41af36ae33bee2899db87beb65435baf89b2f989c0533dd79df95cd4d4a0a?placeholderIfAbsent=true&apiKey=58620f448f4d4934b34d4e1e054160c6'
							className='object-contain flex-1 shrink self-stretch my-auto w-px aspect-[0.1] basis-0'
							alt=''
						/>
						<div className='self-stretch my-auto text-xs font-semibold tracking-wide text-neutral-500'>
							300 review
						</div>
					</div>
					<div className='flex gap-3 items-center mt-4 font-semibold w-full'>
						<div className='my-auto min-w-[140px] line-through text-2xl  leading-snug text-neutral-700'>
							Rs. 1599.00
						</div>
						<div className='flex gap-1 items-end my-auto w-full'>
							<div className='text-3xl w-full text-neutral-700'>
								Rs. 1299.00
							</div>
							<div className='text-xs leading-4 mb-1 text-neutral-400 w-full'>
								MRP incl. of all taxes
							</div>
						</div>
					</div>
					<div className='flex flex-col mt-8 w-full'>
						<div className='flex flex-col max-w-full w-[325px]'>
							<div className='flex flex-col w-full'>
								<div className='flex flex-col w-full font-semibold tracking-wide leading-snug whitespace-nowrap'>
									<label
										htmlFor='size-select'
										className='text-base text-zinc-600'
									>
										Size
									</label>
									<div className='flex gap-2.5 items-center mt-5 w-full text-sm text-neutral-400'>
										{['S', 'M', 'L', 'XL', 'XXL'].map((size, index) => (
											<button
												key={size}
												className={`self-stretch px-2.5 my-auto w-10 h-10 ${
													index === 1
														? 'text-white bg-red-600 border border-red-600 border-solid'
														: 'bg-zinc-100'
												}`}
											>
												{size}
											</button>
										))}
									</div>
								</div>
								<div className='flex flex-col mt-8 w-full'>
									<label
										htmlFor='color-select'
										className='text-base font-semibold tracking-wide leading-snug text-zinc-600'
									>
										Color
									</label>
									<div className='flex gap-2.5 items-center mt-5 w-full'>
										{[
											'white',
											'neutral-800',
											'red-600',
											'lime-600',
											'yellow-500',
										].map((color, index) => (
											<button
												key={color}
												className={`flex shrink-0 self-stretch py-1.5 my-auto ${
													index === 0
														? 'border justify-center border-solid border-neutral-400'
														: ''
												} bg-${color} h-[25px] rounded-[63px] w-[25px]`}
												aria-label={`Select ${color} color`}
											>
												{index === 0 && (
													<img
														loading='lazy'
														src='https://cdn.builder.io/api/v1/image/assets/TEMP/9115dc142c8b29197e5c49ea30b0bb6f8c596ae0f9e64a8bb9c43239ca40475e?placeholderIfAbsent=true&apiKey=58620f448f4d4934b34d4e1e054160c6'
														className='object-contain w-3 aspect-square'
														alt=''
													/>
												)}
											</button>
										))}
									</div>
								</div>
							</div>
							<div className='mt-6 text-base font-semibold tracking-wide leading-snug text-red-600'>
								Hurry up only 3 Left
							</div>
							<div className='flex gap-4 items-center mt-6'>
								<div className='self-stretch my-auto text-base font-semibold tracking-wide leading-snug text-center text-zinc-600'>
									Share for Extra 5% off:
								</div>
								<div className='flex gap-6 items-center self-stretch my-auto'>
									{[13, 14, 15, 16].map((num) => (
										<img
											key={num}
											loading='lazy'
											src={`http://b.io/ext_${num}-`}
											className='object-contain shrink-0 self-stretch my-auto w-5 aspect-square'
											alt={`Social media icon ${num - 12}`}
										/>
									))}
								</div>
							</div>
						</div>
						<div className='flex flex-col mt-8 w-full text-2xl font-semibold tracking-wider leading-snug'>
							<div className='flex gap-3 items-center w-full'>
								<div className='flex gap-7 justify-between items-center self-stretch px-4 py-2.5 my-auto whitespace-nowrap border border-solid border-neutral-800 min-h-[51px] text-neutral-500 w-[118px]'>
									<button className='self-stretch my-auto'>-</button>
									<span className='self-stretch my-auto tracking-wide text-neutral-700'>
										1
									</span>
									<button className='self-stretch my-auto'>+</button>
								</div>
								<button className='gap-2 self-stretch px-7 py-2.5 my-auto border border-solid border-neutral-800 min-w-[240px] text-neutral-800 w-[283px] max-md:px-5'>
									Add to Cart
								</button>
							</div>
							<button className='gap-2 self-stretch px-7 py-2.5 mt-5 w-full text-white bg-red-700 min-h-[51px] max-md:px-5'>
								Buy Now
							</button>
						</div>
					</div>
				</div>
			</div>

			<img
				loading='lazy'
				src='https://cdn.builder.io/api/v1/image/assets/TEMP/1212574e9ef466289755d1439ef75d40b7d2a5eeabda7bcd29e819c11c300630?placeholderIfAbsent=true&apiKey=58620f448f4d4934b34d4e1e054160c6'
				className='object-contain absolute z-0 w-6 h-6 aspect-square right-[611px] top-[260px]'
				alt=''
			/>

			<TestimonailsComponent />
		</section>
	);
};

export default page;
