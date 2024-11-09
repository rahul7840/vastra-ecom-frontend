interface Props {
	text: string;
	className?: string;
	otherProps?: any;
}

export const Title = ({ text, className, ...otherProps }: Props) => {
	return (
		<div className='flex justify-center gap-8'>
			<img src='/assets/images/curly.svg' alt='' />
			<div
				{...otherProps}
				className={`font-bold text-lg sm:text-xl md:text-2xl lg:text-3xl  ${className}`}
			>
				{text}
			</div>
			<img src='/assets/images/curly.svg' alt='' />
		</div>
	);
};
