import { api } from '@/api';
import { useQuery } from '@tanstack/react-query';

export const useSession = () => {
	const { data, isLoading } = useQuery({
		queryKey: ['session'],
		queryFn: () => api.auth.session(),
		retry: false,
	});

	return {
		user: data?.data?.data?.user,
		isAuthenticated: !!data?.data?.data?.user,
		isLoading,
	};
};
