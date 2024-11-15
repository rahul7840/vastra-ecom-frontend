import { api } from '@/api';
import { useQuery } from '@tanstack/react-query';

export const useAddresses = () => {
	const { data, isLoading } = useQuery({
		queryKey: ['addresses'],
		queryFn: () => api.customer.addresses(),
	});

	return {
		addresses: data?.data?.data,
		isLoading,
	};
};
