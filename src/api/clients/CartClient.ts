import {
	IAddItemToCart,
	ICart,
	ICartAddress,
	ICheckServiceability,
} from '@/modules/types/cart';
import { CrudClient } from './templates/CrudClient';
import { IUpdateAddress } from '@/modules/types/address';

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

	removeItemFromCart(cartId: string, lineId: string) {
		return this.delete(`/${cartId}/remove-item/${lineId}`);
	}

	checkServiceability(data: ICheckServiceability) {
		return this.post('/check-serviceability', data);
	}

	updateCartItemQuantityById(cartId: string, lineId: string, quantity: number) {
		return this.put(`/${cartId}/update-item-quantity/${lineId}`, { quantity });
	}

	updateAddress(cartId: string, data: ICartAddress) {
		return this.put(`/${cartId}/update-address`, data);
	}
}
