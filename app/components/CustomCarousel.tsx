'use client';
import 'react-responsive-carousel/lib/styles/carousel.min.css';
import { Carousel } from 'react-responsive-carousel';
import { useRef, useState } from 'react';

export const CustomCarousel = (props: any) => {
	const { items } = props;
	const carouselRef = useRef<any>(null); // Create a ref for the Carousel
	const [currentIndex, setCurrentIndex] = useState(0); // State for the current index

	// Function to trigger previous slide
	const goPrev = () => {
		if (carouselRef.current) {
			carouselRef.current.moveTo(carouselRef.current.state.selectedItem - 1);
		}
	};

	// Function to trigger next slide
	const goNext = () => {
		if (carouselRef.current) {
			carouselRef.current.moveTo(carouselRef.current.state.selectedItem + 1);
		}
	};

	// Callback for when the slide changes
	const onSlideChange = (index: number) => {
		setCurrentIndex(index);
	};

	return (
		<div className='relative'>
			<Carousel
				ref={carouselRef} // Attach the ref to the Carousel
				showThumbs={false}
				onChange={onSlideChange} // Handle slide change event
				showStatus={false}
				showIndicators={false}
				renderArrowPrev={() => null} // Remove default prev arrow
				renderArrowNext={() => null} // Remove default next arrow
			>
				{items}
			</Carousel>

			{currentIndex > 0 && (
				<img
					className='absolute top-1/2 left-6 w-8 cursor-pointer'
					src='/assets/images/arrowLeft.svg'
					alt='Previous'
					onClick={goPrev}
				/>
			)}
			<img
				className='absolute top-1/2 right-6 w-8 cursor-pointer'
				src='/assets/images/arrowRight.svg'
				alt='Next'
				onClick={goNext} // Trigger the goNext function on click
			/>

			<div className='flex justify-center gap-[6px] my-8'>
				{items.map((e: any, index: number) => {
					return (
						<div
							className={`w-2 h-2 cursor-pointer ${
								currentIndex === index ? 'bg-[#F6BEBE]' : 'bg-[#F5F5F5]'
							}  rounded-full`}
							onClick={(e) => {
								if (currentIndex !== index) {
									carouselRef.current.moveTo(index);
								}
							}}
						/>
					);
				})}
			</div>
		</div>
	);
};
