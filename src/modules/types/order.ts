export interface IOrder {
	id: string;
	amount: number;
	currency: string;
	receipt: string;
	partial_payment: boolean;
}
