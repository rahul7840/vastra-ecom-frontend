import { api } from '@/api';
import { IApiParams } from '@/api/types';
import { useQuery } from '@tanstack/react-query';

export const useOrders = (params: IApiParams) => {
	const { data, isLoading } = useQuery({
		queryKey: ['orders', params],
		queryFn: () => api.order.all(params),
	});

	return {
		orders: data?.data?.data,
		isLoading,
	};
};
