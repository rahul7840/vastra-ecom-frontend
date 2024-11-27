import { ProductListTemplate } from '@/modules/product/templates/products';

export default function ProductsPage() {
	return (
		<ProductListTemplate
			title='Products'
			description='Explore our wide range of products'
			url='/products'
		/>
	);
}
