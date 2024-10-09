import { ProductTemplate } from '@/modules/product/templates';

interface PageProps {
	params: {
		id: string;
	};
}

const page = ({ params }: PageProps) => {
	return <ProductTemplate id={params.id} />;
};

export default page;
