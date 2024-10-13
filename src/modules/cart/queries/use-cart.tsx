import { api } from '@/api';
import { useQuery } from '@tanstack/react-query';

export const useCart = (userId?: string) => {
	const queryKey = ['cart', userId ?? 'guest'];
	const { data: cartResponse, isLoading: isCartLoading } = useQuery({
		queryKey,
		queryFn: () => api.cart.getCartByCustomerId(),
		enabled: !!userId,
		staleTime: 1000 * 60 * 5,
	});

	return { cart: cartResponse?.data?.data, isCartLoading };
};
