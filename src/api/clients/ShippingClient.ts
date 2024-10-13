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

	getCharges(data: ICheckServiceability) {
		return this.post<IShippingCharges>('/charges', data);
	}

	validatePincode(pincode: string) {
		return this.get(`/validate-pincode/${pincode}`);
	}
}
