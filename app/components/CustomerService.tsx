import React from 'react';

const customerServiceLinks = [
	'Contact Us',
	"FAQ's",
	'Shipping & Returns',
	'Size Guide',
];

const CustomerService: React.FC = () => {
	return (
		<div className='flex flex-col'>
			<h3 className='text-lg font-semibold text-zinc-600'>Customer Service</h3>
			<nav className='flex flex-col mt-4 max-w-full text-sm text-neutral-400 w-[116px]'>
				{customerServiceLinks.map((link, index) => (
					<a href='#' key={index} className={index !== 0 ? 'mt-2' : ''}>
						{link}
					</a>
				))}
			</nav>
		</div>
	);
};

export default CustomerService;
