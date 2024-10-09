import {
	IAddItemToCart,
	ICart,
	ICheckServiceability,
} from '@/modules/types/cart';
import { CrudClient } from './templates/CrudClient';

export class CartClient extends CrudClient<ICart> {
	constructor() {
		super('customer/cart');
	}

	addItemToCart(cartId: string, data: IAddItemToCart) {
		return this.post(`/${cartId}/add-item`, data);
	}

	getCartByCustomerId() {
		return this.get('');
	}

	removeItemFromCart(cartId: string, id: string) {
		return this.delete(`/${cartId}/remove-item/${id}`);
	}

	checkServiceability(data: ICheckServiceability) {
		return this.post('/check-serviceability', data);
	}

	updateCartItemQuantityById(cartId: string, lineId: string, quantity: number) {
		return this.put(`/${cartId}/update-item-quantity/${lineId}`, { quantity });
	}
}
