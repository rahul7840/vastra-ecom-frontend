import { api } from '@/api';
import { useQuery } from '@tanstack/react-query';

const LOCAL_STORAGE_CART_KEY = 'guestCart';

export const useCart = (userId?: string) => {
	const queryKey = ['cart', userId ?? 'guest'];
	const { data, isLoading: isCartLoading } = useQuery({
		queryKey,
		queryFn: async () => {
			if (!userId) {
				const guestCart = localStorage.getItem(LOCAL_STORAGE_CART_KEY);
				return guestCart
					? JSON.parse(guestCart)
					: { cartItems: [], totalItems: 0 };
			}

			const response = await api.cart.getCartByCustomerId();
			console.log('response logs 9000000', response);

			if (response.status === 404) {
				const response = await api.cart.create({});
				return response?.data?.data;
			}

			return response?.data?.data;
		},
		staleTime: 1000 * 60 * 5,
	});

	return { queryKey, cart: data, isCartLoading };
};
