export interface ICoupon {
	discount: string;
	description: string;
	code: string;
	validFrom: string;
	validTo: string;
	applicability: string;
	additionalInfo: string;
	isActive: boolean;
}
