export interface IProduct {
	id: string;
	name: string;
	thumbnail: string;
	description: string;
	quantity: number;
	priceWithoutTax: number;
	tax: number;
	discountedPrice: number;
	category: string;
	isLive: boolean;
	sellerId: string;
	variants: IProductVariant[];
	reviews: IReview[];
	seller: ISeller;
}

export interface IReview {
	id: string;
	rating: number;
	comment: string;
	userId: string;
	productId: string;
	createdAt: string;
}

export interface IReviewForm {
	rating: number;
	comment: string;
}

export interface ISeller {
	id: string;
	firstName: string;
	lastName: string | null;
}

export interface IProductVariant {
	id: string;
	sku: string;
	color: string;
	size: string;
	weight: number;
	breadth: number;
	height: number;
	length: number;
	stock: number;
	images: string[];
}
