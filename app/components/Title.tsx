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
				className={`font-bold text-3xl max-xl:text-2xl max-lg:text-xl  ${className}`}
			>
				{text}
			</div>
			<img src='/assets/images/curly.svg' alt='' />
		</div>
	);
};
