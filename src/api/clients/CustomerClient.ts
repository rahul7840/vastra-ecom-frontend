import { IAddress } from '@/modules/types/cart';
import { BaseClient } from './templates/BaseClient';

export class CustomerClient extends BaseClient {
	constructor() {
		super('customer');
	}

	async addresses() {
		return await this.get('/addresses');
	}

	async updateAddress(id: string, data: IAddress) {
		return await this.put(`/address/${id}`, data);
	}

	async deleteAddress(id: string) {
		return await this.delete(`/address/${id}`);
	}
}
