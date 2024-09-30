import Image from 'next/image';
import logo from '@/../public/assets/images/logo.svg';
import authImg from '@/../public/assets/images/authImg.svg';
import { LoginForm } from '../form';

export const LoginTemplate = () => {
	return (
		<div className='flex flex-col lg:flex-row justify-center items-center h-screen'>
			<div className='h-2/5 lg:h-full w-full lg:order-2'>
				<Image
					src={authImg}
					alt='authImg'
					className='max-h-full w-full object-cover object-top'
				/>
			</div>
			<div className='relative h-3/5 lg:h-full w-full p-5 flex flex-col items-center justify-center '>
				<Image
					src={logo}
					alt='authImg'
					width={75}
					height={100}
					className='absolute top-5 left-5 hidden lg:block'
				/>
				<LoginForm />
			</div>
		</div>
	);
};
