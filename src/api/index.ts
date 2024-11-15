import { AuthClient } from './clients/AuthClient';
import { ProductClient } from './clients/ProductClient';
import { ReviewClient } from './clients/ReviewClient';
import { CartClient } from './clients/CartClient';
import { ShippingClient } from './clients/ShippingClient';
import { OrderClient } from './clients/OrderClient';
import { CustomerClient } from './clients/CustomerClient';

export const api = {
	auth: new AuthClient(),
	order: new OrderClient(),
	product: new ProductClient(),
	review: new ReviewClient(),
	cart: new CartClient(),
	shipping: new ShippingClient(),
	customer: new CustomerClient(),
};
