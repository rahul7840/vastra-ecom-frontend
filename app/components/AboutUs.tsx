import React from 'react';

const socialIcons = [
	{
		src: 'https://cdn.builder.io/api/v1/image/assets/TEMP/aedb5ebae0bb19642028f8ec2c4dfea6efeb46b1b411dfac3a62b9f8add32045?placeholderIfAbsent=true&apiKey=58620f448f4d4934b34d4e1e054160c6',
		alt: 'Social icon 1',
	},
	{
		src: 'https://cdn.builder.io/api/v1/image/assets/TEMP/b7819c595d1205702dfad46a771f9e7fca2c563a7b4b530b73c4778d1bb32d15?placeholderIfAbsent=true&apiKey=58620f448f4d4934b34d4e1e054160c6',
		alt: 'Social icon 2',
	},
	{
		src: 'https://cdn.builder.io/api/v1/image/assets/TEMP/0a4cde50a5ac56f25785c844ea2d26f67241f675b2132337493f6f04f02094bc?placeholderIfAbsent=true&apiKey=58620f448f4d4934b34d4e1e054160c6',
		alt: 'Social icon 3',
	},
	{
		src: 'https://cdn.builder.io/api/v1/image/assets/TEMP/9c1d27b3a1e5f029c9b35c875f651aa6b96161e035c4373fa159b1fb9a47131e?placeholderIfAbsent=true&apiKey=58620f448f4d4934b34d4e1e054160c6',
		alt: 'Social icon 4',
	},
	{
		src: 'https://cdn.builder.io/api/v1/image/assets/TEMP/1aff1b8e77e812205883feb0084f3350f9ad88140d23924ec217fc9d99272cd5?placeholderIfAbsent=true&apiKey=58620f448f4d4934b34d4e1e054160c6',
		alt: 'Social icon 5',
	},
];

const AboutUs: React.FC = () => {
	return (
		<section className='flex flex-col self-stretch my-auto min-w-[240px] w-[437px] max-md:max-w-full'>
			<div className='flex flex-col w-full max-md:max-w-full'>
				<div className='flex gap-2.5 justify-center items-center self-start text-xl font-semibold whitespace-nowrap text-neutral-700'>
					<img
						loading='lazy'
						src='https://cdn.builder.io/api/v1/image/assets/TEMP/cd4a2b89e915254a28bbf64bc52465f9540b547c144792716983b93cfd775363?placeholderIfAbsent=true&apiKey=58620f448f4d4934b34d4e1e054160c6'
						alt='Logo'
						className='object-contain shrink-0 self-stretch my-auto aspect-square w-[22px]'
					/>
					<div className='self-stretch my-auto'>Logo</div>
				</div>
				<p className='mt-4 text-sm tracking-wide leading-5 text-neutral-400 max-md:max-w-full'>
					About us ipsum dolor sit amet, consectetuer adipiscing elit, sed diam
					nonummy dolor sit amet, consectetuer adipiscing elit, sed diam nonummy
				</p>
			</div>
			<div className='flex gap-2 items-center self-start mt-8'>
				{socialIcons.map((icon, index) => (
					<div
						key={index}
						className='flex gap-2.5 justify-center items-center self-stretch px-3 my-auto bg-neutral-700 h-[34px] rounded-[999999986991104px] w-[34px]'
					>
						<img
							loading='lazy'
							src={icon.src}
							alt={icon.alt}
							className='object-contain self-stretch my-auto w-2.5 aspect-square'
						/>
					</div>
				))}
			</div>
		</section>
	);
};

export default AboutUs;
