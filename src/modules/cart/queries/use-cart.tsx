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

			const respone = await api.cart.getCartByCustomerId();
			return respone?.data?.data;
		},
		staleTime: 1000 * 60 * 5,
	});

	return { queryKey, cart: data, isCartLoading };
};
