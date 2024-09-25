import { Title } from '@/app/components/Title';
import ShoppingCartList from '../components/CartList';
import { CartProgress } from '../components/CartProgress';
import { CartSummary } from '../components/CartSummary';
import { CouponSection } from '../components/CouponSection';

const cartItems = [
	{
		id: 1,
		imageSrc:
			'https://cdn.builder.io/api/v1/image/assets/TEMP/70c6202df6da878330a6d91dc3241ebaf1ec4dbfd07792604f0cc93624a086f7?placeholderIfAbsent=true&apiKey=58620f448f4d4934b34d4e1e054160c6',
		productName: 'T-shirt Name',
		color: 'Black',
		price: 19.0,
		quantity: 1,
	},
	{
		id: 2,
		imageSrc:
			'https://cdn.builder.io/api/v1/image/assets/TEMP/3d05d0881817cd132946dfbf3978a4fd693a35011c4d46fd3e048e5bccb64368?placeholderIfAbsent=true&apiKey=58620f448f4d4934b34d4e1e054160c6',
		productName: 'T-shirt Name',
		color: 'Black',
		price: 19.0,
		quantity: 1,
	},
	{
		id: 3,
		imageSrc:
			'https://cdn.builder.io/api/v1/image/assets/TEMP/1d1dead8b31a812d7a348b5c24359a9868c2a052869d1d3c8279d81bfbb145e6?placeholderIfAbsent=true&apiKey=58620f448f4d4934b34d4e1e054160c6',
		productName: 'T-shirt Name',
		color: 'Black',
		price: 19.0,
		quantity: 1,
	},
	{
		id: 4,
		imageSrc:
			'https://cdn.builder.io/api/v1/image/assets/TEMP/be45fb2404c6aaf11ae3428c283d305c735474e92349cb7409dd2869ce43cde3?placeholderIfAbsent=true&apiKey=58620f448f4d4934b34d4e1e054160c6',
		productName: 'T-shirt Name',
		color: 'Black',
		price: 19.0,
		quantity: 1,
	},
];

const shippingOptions = [
	{
		label: 'Standard Shipping',
		price: '$5.00',
		isSelected: true,
	},
];

const summaryItems = [
	{
		label: 'Subtotal',
		value: '$47.00',
		isBold: true,
	},
	{
		label: 'Shipping',
		value: '$5.00',
		isBold: false,
	},
];

export const CartTemplate = () => {
	return (
		<div>
			<Title className='my-12' text='Cart' />

			<CartProgress currentStep={1} />

			<main className='container flex justify-between mx-auto px-4'>
				<ShoppingCartList items={cartItems} />

				<div className='flex flex-col gap-4'>
					<CartSummary
						shippingOptions={shippingOptions}
						summaryItems={summaryItems}
					/>
					<CouponSection />
				</div>
			</main>
		</div>
	);
};
