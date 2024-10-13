import {
	IAddItemToCart,
	ICart,
	ICheckServiceability,
	IShippingCharges,
} from '@/modules/types/cart';
import { CrudClient } from './templates/CrudClient';
import { IApiResponse } from '../types';

export class ShippingClient extends CrudClient<ICart> {
	constructor() {
		super('customer/shipping');
	}

	createOrder(data: IAddItemToCart) {
		return this.post('/create-order', data);
	}

	getCharges(cartId: string, data: ICheckServiceability) {
		return this.post<IShippingCharges>(`/charges/${cartId}`, data);
	}

	validatePincode(pincode: number) {
		return this.get<{ isValid: boolean; city: string; state: string }>(
			`/validate-pincode/${pincode}`
		);
	}
}
