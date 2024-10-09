import { AuthClient } from './clients/AuthClient';
import { ProductClient } from './clients/ProductClient';
import { ReviewClient } from './clients/ReviewClient';
import { CartClient } from './clients/CartClient';
import { ShippingClient } from './clients/ShippingClient';

export const api = {
	auth: new AuthClient(),
	product: new ProductClient(),
	review: new ReviewClient(),
	cart: new CartClient(),
	shipping: new ShippingClient(),
};
