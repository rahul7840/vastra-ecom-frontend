import { IUser } from './user';
import { IAddress } from './cart';
import { IProduct, IVariant } from './product';

export interface IOrder {
	id: string;
	customOrderId: string;
	shipRocketOrderId: string;
	shipmentId: string;
	awbCode: string;
	courierCompanyId: number;
	status: string;
	userId: string;
	paymentId: string;
	billingAddressId: string;
	shippingAddressId: string;
	orderDate: string;
	estimatedDeliveryDate: string;
	actualDeliveryDate: string;
	shippingCost: number;
	codCharges: number;
	subTotal: number;
	totalCost: number;
	createdAt: string;
	updatedAt: string;
	user: IUser;
	billingAddress: IAddress;
	shippingAddress: IAddress;
	orderItems: IOrderItem[];
}

export interface IOrderItem {
	id: string;
	orderId: string;
	productId: string;
	variantId: string;
	name: string;
	thumbnail: string;
	images: string[];
	sku: string;
	weight: number;
	width: number;
	height: number;
	length: number;
	price: number;
	discountedPrice: number;
	quantity: number;
	createdAt: string;
	updatedAt: string;
	product: IProduct;
	variant: IVariant;
}
