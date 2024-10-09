export interface IProduct {
	id: string;
	name: string;
	description: string;
	quantity: number;
	priceWithoutTax: number;
	tax: number;
	discountedPrice: number;
	specification: {
		color: string;
		fabric: string;
		pattern: string;
		material: string;
		warranty: string;
		closure_type: string;
		sleeve_length: string;
		care_instructions: string;
		country_of_origin: string;
	};
	stock: number;
	sizes: string[];
	category: string;
	colors: string[];
	price: string;
	images: string[];
	isLive: boolean;
	sellerId: string;
	reviews: IReview[];
	seller: {
		id: string;
		firstName: string;
		lastName: string | null;
	};
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
