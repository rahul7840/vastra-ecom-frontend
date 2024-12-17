interface Props {
	text: string;
	className?: string;
	otherProps?: any;
}

export const Title = ({ text, className, ...otherProps }: Props) => {
	return (
		<div className='flex justify-center items-center gap-2 md:gap-4 md:gap-8'>
			<img
				className='w-4 h-4 md:w-7 md:h-7'
				src='/assets/images/curly.svg'
				alt=''
			/>
			<div
				{...otherProps}
				className={`font-semibold md:font-bold text-lg md:text-2xl lg:text-3xl  ${className}`}
			>
				{text}
			</div>
			<img
				className='w-4 h-4 md:w-7 md:h-7'
				src='/assets/images/curly.svg'
				alt=''
			/>
		</div>
	);
};
