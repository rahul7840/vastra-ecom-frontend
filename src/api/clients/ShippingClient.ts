import {
	IAddItemToCart,
	ICart,
	ICheckServiceability,
} from '@/modules/types/cart';
import { CrudClient } from './templates/CrudClient';

export class ShippingClient extends CrudClient<ICart> {
	constructor() {
		super('customer/shipping');
	}

	createOrder(data: IAddItemToCart) {
		return this.post('/create-order', data);
	}

	getCharges(data: ICheckServiceability) {
		return this.post('/charges', data);
	}
}
