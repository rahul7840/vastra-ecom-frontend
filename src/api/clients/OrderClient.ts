import { IOrder } from '@/modules/types/order';
import { CrudClient } from './templates/CrudClient';

export class OrderClient extends CrudClient<IOrder> {
	constructor() {
		super('customer/order');
	}

	createOrder(cartId: string) {
		return this.post(`/${cartId}/create-order`);
	}
}
