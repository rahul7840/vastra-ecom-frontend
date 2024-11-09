export interface IProduct {
	id: string;
	name: string;
	thumbnail: string;
	description: string;
	quantity: number;
	tax: number;
	price: number;
	discountedPrice: number;
	category: string;
	isLive: boolean;
	sellerId: string;
	images: string[];
	variants: IVariant[];
	attributes: IAttribute[];
	reviews: IReview[];
	seller: ISeller;
	hasVariants: boolean;
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

export interface IVariant {
	id: string;
	productId: string;
	sku: string;
	price: number;
	discountedPrice?: number;
	weight: number;
	width: number;
	height: number;
	length: number;
	stock: number;
	thumbnail: string;
	images: string[];
	attributeValues: IAttributeValue[];
	createdAt: string;
	updatedAt: string;
}

export interface IAttribute {
	id?: string;
	productId?: string;
	title: string;
	values: IAttributeValue[];
	createdAt?: string;
	updatedAt?: string;
}

export interface IAttributeValue {
	id?: string;
	attributeId?: string;
	variantId?: string;
	value: string;
	attribute?: IAttribute;
	createdAt?: string;
	updatedAt?: string;
}
