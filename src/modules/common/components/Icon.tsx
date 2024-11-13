interface IconProps extends React.HTMLAttributes<HTMLSpanElement> {
	name: string;
}

export const Icon = ({ name, className, ...props }: IconProps) => {
	return (
		<span className={`material-symbols-rounded ${className}`} {...props}>
			{name}
		</span>
	);
};
