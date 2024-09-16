import React from 'react';

const legalLinks = ['Privacy Policy', 'Terms & Conditions'];

const Legal: React.FC = () => {
	return (
		<div className='flex flex-col w-[117px]'>
			<h3 className='text-lg font-semibold text-zinc-600'>Legal</h3>
			<nav className='flex flex-col mt-4 max-w-full text-sm text-neutral-400 w-[118px]'>
				{legalLinks.map((link, index) => (
					<a href='#' key={index} className={index !== 0 ? 'mt-2' : ''}>
						{link}
					</a>
				))}
			</nav>
		</div>
	);
};

export default Legal;
