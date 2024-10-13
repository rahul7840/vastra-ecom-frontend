import { IProduct } from './product';

export interface ICart {
	id: string;
	userId: string;
	createdAt: string;
	updatedAt: string;
	cartItems: ICartItem[];
	billingAddressId: string | null;
	shippingAddressId: string | null;
	billingAddress: IAddress | null;
	shippingAddress: IAddress | null;
	shipping_total: number;
	discount_total: number;
	subtotal: number;
	total: number;
	total_items: number;
	refundable_amount: number;
}

export interface IAddItemToCart {
	productId: string;
	quantity: number;
	size: string;
	color: string;
	product?: IProduct;
}

export interface ICartItem {
	id: string;
	productId: string;
	cartId: string;
	quantity: number;
	size: string;
	color: string;
	product?: IProduct;
	createdAt: string;
	updatedAt: string;
}

export interface IAddress {
	id?: string;
	firstName?: string;
	lastName?: string;
	address?: string;
	city?: string;
	state?: string;
	country?: string;
	pincode?: string;
	email?: string;
	phone?: string;
	address2?: string;
}

export interface ICheckServiceability {
	delivery_postcode: string;
	cod: number;
}

export interface IUpdateAddress {
	billing_same_as_shipping: boolean;
	shipping: IAddress;
	billing?: IAddress;
}

export interface IShippingCharges {
	shippingCost: number;
	codCharges: number;
	estimatedDeliveryDate: string;
	totalCost: number;
	subTotal: number;
}
