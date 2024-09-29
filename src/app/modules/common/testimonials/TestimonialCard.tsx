interface Testimonial {
	name: string;
	text: string;
	stars: number;
	createdAt: string;
}

interface Props {
	isSelected?: boolean;
	item: Testimonial;
}

export const TestimonailCard = (props: Props) => {
	const { item, isSelected = true } = props;
	const { name, createdAt, stars, text } = item;

	const renderStars = () => {
		let ele = [];
		for (let i = 0; i < 5; i++) {
			ele.push(
				<img
					className={`${isSelected ? 'w-4' : 'w-3'}`}
					src={`/assets/images/${i <= stars ? 'star' : 'star-light'}.svg`}
					alt=''
				/>
			);
		}

		return ele;
	};

	return (
		<div
			className={`bg-white p-7 rounded-2xl border shadow-custom-1 ${
				isSelected ? 'max-w-[462px]' : 'max-w-[324px]'
			}   border-[#FAFAFA]`}
		>
			<div className='flex gap-4 w-full justify-center items-start '>
				<img
					className='w-16 h-16 rounded-full'
					src='/assets/images/profile.svg'
					alt=''
				/>
				<div className='flex w-full max-w-80 flex-col gap-1'>
					<div
						className={`text-[#424242] ${
							isSelected ? 'text-base' : 'text-sm'
						}  font-semibold`}
					>
						{name}
					</div>
					<div
						className={`text-[#616161] ${
							isSelected ? 'text-base' : 'text-xs'
						}  font-normal line-clamp-3`}
					>
						{text}
					</div>
				</div>
			</div>

			<div className='flex mt-3 justify-between items-center w-full'>
				<div className='flex gap-1'>{renderStars()}</div>

				<div
					className={`text-[#9E9E9E] font-normal ${
						isSelected ? 'text-[0.5rem]' : 'text-[8px]'
					} `}
				>
					{createdAt}
				</div>
			</div>
		</div>
	);
};
