import { RootState } from '@/store';
import { setProgressStep } from '@/store/slices/cartSlice';
import React from 'react';
import { useDispatch, useSelector } from 'react-redux';

type ProgressStepProps = {
	number: number;
	text: string;
	isActive: boolean;
	steps: { number: number; text: string }[];
};

const ProgressStep: React.FC<ProgressStepProps> = ({
	number,
	text,
	isActive,
}) => {
	const dispatch = useDispatch();

	const { steps } = useSelector((state: RootState) => state.cart);

	return (
		<div
			onClick={() => {
				if (steps[number - 1]) {
					dispatch(setProgressStep(number));
				}
			}}
			className='flex cursor-pointer flex-col self-stretch pb-6 my-auto min-w-[240px] w-[250px] border-b-2 border-solid border-neutral-800'
		>
			<div className='flex gap-6 justify-center items-center w-full '>
				{steps[number - 1] ? (
					<div className='flex flex-col justify-center items-center rounded-full w-10 h-10 bg-[#45A200]'>
						<svg
							width='25'
							height='24'
							viewBox='0 0 25 24'
							fill='none'
							xmlns='http://www.w3.org/2000/svg'
						>
							<path
								d='M5.16699 14.5C5.16699 14.5 6.66699 14.5 8.66699 18C8.66699 18 14.2258 8.83333 19.167 7'
								stroke='white'
								stroke-width='2'
								stroke-linecap='round'
								stroke-linejoin='round'
							/>
						</svg>
					</div>
				) : (
					<div
						className={`overflow-hidden flex items-center justify-center my-auto w-10 h-10 text-lg font-semibold text-center text-white whitespace-nowrap ${
							isActive ? 'bg-neutral-800' : 'bg-neutral-400'
						} min-h-[40px] rounded-[53px]`}
					>
						{number}
					</div>
				)}
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
};

type CartProgressProps = {
	currentStep: number;
	steps: { number: number; text: string }[];
};

export const CartProgress: React.FC<CartProgressProps> = ({
	currentStep,
	steps,
}) => {
	return (
		<div className='flex flex-wrap gap-10 justify-center items-center mb-16 w-full leading-snug max-md:mt-10 max-md:max-w-full'>
			{steps.map((step, index) => (
				<ProgressStep
					key={step.number}
					steps={steps}
					number={step.number}
					text={step.text}
					isActive={index + 1 === currentStep}
				/>
			))}
		</div>
	);
};
