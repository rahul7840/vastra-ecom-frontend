'use client';
import Toaster from '@/modules/core/components/toaster';
import { store } from '@/store';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { Suspense, useState, useEffect, type FC, type ReactNode } from 'react';
import { Provider } from 'react-redux';

interface BaseProviderProps {
	children: ReactNode;
}

const BaseProvider: FC<BaseProviderProps> = ({ children }) => {
	const [queryClient] = useState(
		() =>
			new QueryClient({
				defaultOptions: {
					queries: {
						refetchOnWindowFocus: false,
						refetchOnMount: false,
						refetchOnReconnect: false,
					},
				},
			})
	);
	const [mounted, setMounted] = useState(false);

	useEffect(() => {
		setMounted(true);
	}, []);
	if (!mounted) return null;

	return (
		<Provider store={store}>
			<QueryClientProvider client={queryClient}>
				<Toaster />
				<Suspense>{children}</Suspense>
			</QueryClientProvider>
		</Provider>
	);
};

export default BaseProvider;
