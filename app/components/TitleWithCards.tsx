'use client';

import { Product } from '../utils/types';
import { CustomProduct } from './Product';
import { Title } from './Title';

interface Props {
	text: string;
	items: Product[];
	viewAll?: boolean;
}

export const TitleWithCards = (props: Props) => {
	const { text, items, viewAll = false } = props;

	return (
		<div className='flex flex-col'>
			<Title text={text} />
			<div className='flex flex-col justify-center items-center mt-16 px-14'>
				<div className='grid grid-cols-4 max-xl:grid-cols-3 max-lg:grid-cols-2 items-center justify-center gap-x-16 gap-y-20 w-full max-w-[1383px]'>
					{items.map((e) => {
						return <CustomProduct item={e} />;
					})}
				</div>

				{viewAll && (
					<div className='flex gap-4 mt-12'>
						<img src='/assets/images/curly-light.svg' alt='' />
						<div className='underline text-sm font-semibold text-[#212121]'>
							View All
						</div>
						<img src='/assets/images/curly-light.svg' alt='' />
					</div>
				)}
			</div>
		</div>
	);
};
