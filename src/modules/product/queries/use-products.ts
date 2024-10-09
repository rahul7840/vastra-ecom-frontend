import { api } from '@/api';
import { IApiParams } from '@/api/types';
import { useQuery } from '@tanstack/react-query';

export const useProducts = (params: IApiParams) => {
	const { data, isLoading } = useQuery({
		queryKey: ['products', params],
		queryFn: () => api.product.all(params),
	});

	return {
		products: data?.data?.data,
		isLoading,
	};
};
