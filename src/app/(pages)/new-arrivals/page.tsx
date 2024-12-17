import { ProductListTemplate } from '@/modules/product/templates/products';

export default function Page() {
	return (
		<ProductListTemplate
			title='New Arrivals'
			url='/new-arrivals'
			description='Discover our latest collection of trendsetting pieces that just landed'
		/>
	);
}
