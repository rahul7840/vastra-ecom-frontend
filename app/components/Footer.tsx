import React from 'react';
import Contact from './Contact';
import AboutUs from './AboutUs';
import CustomerService from './CustomerService';
import Legal from './Legal';
import Newsletter from './NewsLetter';

const Footer: React.FC = () => {
	return (
		<div className='flex flex-col'>
			<section className='flex-1 shrink gap-2.5 self-stretch px-8 py-4 mt-6 w-full text-xl font-semibold tracking-wide leading-snug text-white bg-red-600 max-md:px-5 max-md:max-w-full'>
				Lorem ipsum dolor sit amet consectetur. Platea neque metus mauris
				scelerisque lobortis posuere. Nisl leo nunc ipsum bibendum pretium eget.
				Adipiscing neque sit sed proin justo. Parturient mauris in a lorem elit.
			</section>
			<footer className='flex flex-wrap justify-center gap-10 items-center w-full self-center mt-8 mb-14 max-md:max-w-full'>
				<AboutUs />
				<Contact />
				<div className='flex flex-col self-stretch tracking-wide leading-snug min-w-[240px] w-[360px]'>
					<div className='flex gap-10 justify-between items-start w-full'>
						<CustomerService />
						<Legal />
					</div>
				</div>
				<Newsletter />
			</footer>
		</div>
	);
};

export default Footer;
