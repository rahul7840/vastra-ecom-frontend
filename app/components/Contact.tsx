import React from 'react';

const contactInfo = [
	{
		src: 'https://cdn.builder.io/api/v1/image/assets/TEMP/9dc267ca895e178d932636b8b359c9e446ce52a0e67ee7d20ce4176538aa11b6?placeholderIfAbsent=true&apiKey=58620f448f4d4934b34d4e1e054160c6',
		alt: 'Email icon',
		text: 'demoemial@gmail.com',
	},
	{
		src: 'https://cdn.builder.io/api/v1/image/assets/TEMP/37d4e4a1a8752b4fd2e3656435cbd7d351ac02af59b8a01b82bcceb83bdacc53?placeholderIfAbsent=true&apiKey=58620f448f4d4934b34d4e1e054160c6',
		alt: 'Phone icon',
		text: '+91 00000-00000',
	},
	{
		src: 'https://cdn.builder.io/api/v1/image/assets/TEMP/3e907d373a606bcd671f7909adb5b76be1c7bc4b1cac7a0eb486dd3a4eaf4595?placeholderIfAbsent=true&apiKey=58620f448f4d4934b34d4e1e054160c6',
		alt: 'Location icon',
		text: 'Lorem ipsum dolor sit amet, consectetuer adipiscing elit, sed diam nonummy',
	},
];

const Contact: React.FC = () => {
	return (
		<section className='flex flex-col self-stretch my-auto tracking-wide leading-snug min-w-[240px] w-[343px]'>
			<div className='flex flex-col max-w-full w-[343px]'>
				<h2 className='text-xl font-semibold text-neutral-700'>Contact</h2>
				<div className='flex flex-col items-start mt-6 w-full text-sm max-w-[343px] text-neutral-500'>
					{contactInfo.map((item, index) => (
						<div
							key={index}
							className={`flex gap-4 items-${
								index === 2 ? 'start' : 'center'
							} ${index !== 0 ? 'mt-4' : ''} ${
								index === 2 ? 'self-stretch w-full' : 'whitespace-nowrap'
							}`}
						>
							<img
								loading='lazy'
								src={item.src}
								alt={item.alt}
								className='object-contain shrink-0 self-stretch my-auto w-6 aspect-square'
							/>
							<div
								className={index === 2 ? 'w-[298px]' : 'self-stretch my-auto'}
							>
								{item.text}
							</div>
						</div>
					))}
				</div>
			</div>
		</section>
	);
};

export default Contact;
