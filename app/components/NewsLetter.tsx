import React from 'react';

const Newsletter: React.FC = () => {
	return (
		<section className='flex flex-col self-stretch tracking-wide min-w-[240px] w-[344px]'>
			<div className='flex flex-col w-full max-w-[344px]'>
				<div className='flex flex-col w-full'>
					<h2 className='text-lg font-semibold leading-snug text-zinc-600'>
						Sign up for exciting offers
					</h2>
					<p className='mt-2 text-sm leading-5 text-neutral-400'>
						Subscribe to get special offers, free giveaways and don't worry! We
						won't bother you unless we've got fabulous offer for you
					</p>
				</div>
				<form className='flex gap-2 items-center mt-6 w-full text-sm leading-snug'>
					<label htmlFor='emailInput' className='sr-only'>
						Enter your email
					</label>
					<input
						type='email'
						id='emailInput'
						placeholder='Enter your email'
						className='gap-2.5 self-stretch px-5 py-2 my-auto border border-solid border-neutral-400 text-neutral-400 w-[222px]'
						aria-label='Enter your email'
					/>
					<button
						type='submit'
						className='gap-2.5 self-stretch px-5 py-2 my-auto font-semibold text-white whitespace-nowrap bg-red-700 border border-red-700 border-solid w-[113px]'
					>
						Submit
					</button>
				</form>
			</div>
		</section>
	);
};

export default Newsletter;
