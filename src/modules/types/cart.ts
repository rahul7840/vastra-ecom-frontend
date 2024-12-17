import { IAddress } from './address';
import { IProduct, IVariant } from './product';

export interface ICart {
	id: string;
	userId: string;
	cartItems: ICartItem[];
	billingAddressId: string | null;
	shippingAddressId: string | null;
	billingAddress: IAddress | null;
	shippingAddress: IAddress | null;
	shippingCost: number;
	codCharges: number;
	subTotal: number;
	totalCost: number;
	totalItems: number;
	refundableAmount: number;
	createdAt: string;
	updatedAt: string;
}

export interface IAddItemToCart {
	productId: string;
	quantity: number;
	variantId: string;
}

export interface ICartItem {
	id: string;
	productId: string;
	variantId: string;
	cartId: string;
	quantity: number;
	product?: IProduct;
	variant?: IVariant;
	createdAt: string;
	updatedAt: string;
}

export interface ICheckServiceability {
	delivery_postcode: number;
	cod: number;
}

export interface ICartAddress {
	shippingAddressId: string;
	billingAddressId: string;
}

export interface IShippingCharges {
	shippingCost: number;
	codCharges: number;
	estimatedDeliveryDate: string;
	totalCost: number;
	subTotal: number;
}
