import React from 'react';

type ProgressStepProps = {
	number: number;
	text: string;
	isActive: boolean;
};

const ProgressStep: React.FC<ProgressStepProps> = ({
	number,
	text,
	isActive,
}) => (
	<div className='flex flex-col self-stretch pb-6 my-auto min-w-[240px] w-[250px] border-b-2 border-solid border-neutral-800'>
		<div className='flex gap-6 justify-center items-center w-full '>
			<div
				className={`overflow-hidden flex items-center justify-center my-auto w-10 h-10 text-lg font-semibold text-center text-white whitespace-nowrap ${
					isActive ? 'bg-neutral-800' : 'bg-neutral-400'
				} min-h-[40px] rounded-[53px]`}
			>
				{number}
			</div>
			<div
				className={`self-stretch my-auto text-base ${
					isActive ? 'text-neutral-800' : 'text-neutral-400'
				}`}
			>
				{text}
			</div>
		</div>
	</div>
);

type CartProgressProps = {
	currentStep: number;
};

export const CartProgress: React.FC<CartProgressProps> = ({ currentStep }) => {
	const steps = [
		{ number: 1, text: 'Shopping cart' },
		{ number: 2, text: 'Checkout details' },
		{ number: 3, text: 'Order complete' },
	];

	return (
		<div className='flex flex-wrap gap-10 justify-center items-center mb-16 w-full leading-snug max-md:mt-10 max-md:max-w-full'>
			{steps.map((step, index) => (
				<ProgressStep
					key={step.number}
					number={step.number}
					text={step.text}
					isActive={index + 1 === currentStep}
				/>
			))}
		</div>
	);
};
