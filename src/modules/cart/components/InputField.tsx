import React from 'react';

interface InputFieldProps {
	label: string;
	placeholder?: string;
	inputProps?: React.InputHTMLAttributes<HTMLInputElement>;
	error?: any;
}

const InputField: React.FC<InputFieldProps> = ({
	label,
	placeholder,
	inputProps,
	error,
}) => {
	const inputId = label.toLowerCase().replace(/\s+/g, '-');

	return (
		<div className={`flex flex-col w-full`}>
			<label
				htmlFor={inputId}
				className='text-base font-semibold text-neutral-700'
			>
				{label}
			</label>
			<input
				type='text'
				id={inputId}
				placeholder={placeholder}
				className='flex gap-2 items-center px-4 mt-3 w-full text-sm bg-white border border-solid border-zinc-600 min-h-[40px] text-neutral-800'
				{...inputProps}
			/>
			{error && <p className='text-red-500'>{error}</p>}
		</div>
	);
};

export default InputField;
