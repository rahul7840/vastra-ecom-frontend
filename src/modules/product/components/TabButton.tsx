import React from 'react';

interface TabButtonProps {
	label: string;
	isActive: boolean;
	onClick: () => void;
}

export const TabButton: React.FC<TabButtonProps> = ({
	label,
	isActive,
	onClick,
}) => {
	return (
		<button
			type='button'
			onClick={onClick}
			className={`self-stretch text-2xl my-auto ${
				isActive ? 'font-semibold text-neutral-800' : 'text-neutral-400'
			}`}
		>
			{label}
		</button>
	);
};
