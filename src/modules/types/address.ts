export interface IAddress {
	id: string;
	userId: string;
	firstName: string;
	lastName: string;
	address: string;
	address2?: string;
	city: string;
	state: string;
	country: string;
	pincode: number;
	email: string;
	phone: string;
	isDefault: boolean;
	createdAt: string;
	updatedAt: string;
}

export interface ICreateAddress
	extends Omit<IAddress, 'id' | 'userId' | 'createdAt' | 'updatedAt'> {}

export interface IUpdateAddress
	extends Omit<IAddress, 'userId' | 'createdAt' | 'updatedAt'> {}
