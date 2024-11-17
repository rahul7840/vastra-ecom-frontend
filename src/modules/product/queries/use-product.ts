'use client';
import { api } from '@/api';
import { useQuery } from '@tanstack/react-query';

export const useProduct = (id: string) => {
	const { data, isLoading } = useQuery({
		queryKey: ['product', id],
		queryFn: () => api.product.one(id),
		enabled: !!id,
	});

	return {
		product: data?.data?.data,
		isLoading,
	};
};
