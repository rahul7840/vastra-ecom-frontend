import { IReview, IReviewForm } from '@/modules/types/product';
import { CrudClient } from './templates/CrudClient';

export class ReviewClient extends CrudClient<IReview> {
	constructor() {
		super('customer/review');
	}

	async createReview(productId: string, data: IReviewForm) {
		return this.post<IReviewForm>(`/${productId}`, data);
	}
}
