import { api } from '@/api';
import { IApiError, IApiResponse } from '@/api/types';
import { useSession } from '@/modules/auth/queries/use-session';
import { ICart, ICartItem } from '@/modules/types/cart';
import { IProduct } from '@/modules/types/product';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { AxiosResponse } from 'axios';
import { useEffect, useState } from 'react';
import { toast } from 'react-toastify';

const LOCAL_STORAGE_CART_KEY = 'guestCart';

export const useCartManager = () => {
	const { user } = useSession();
	const queryClient = useQueryClient();
	const [isInitialized, setIsInitialized] = useState(false);
	const [cart, setCart] = useState<ICart | undefined | null>(null);
	const [isSynced, setIsSynced] = useState(false);
	const queryKey: any = user?.id ? ['cart', user?.id] : ['cart'];

	const { data: cartResponse, isLoading: isCartLoading } = useQuery({
		queryKey: queryKey,
		queryFn: () => api.cart.getCartByCustomerId(),
		enabled: !!user,
	});

	useEffect(() => {
		if (user?.id && cartResponse?.data?.data && !isCartLoading) {
			setCart(cartResponse?.data?.data as ICart);
		} else if (!user?.id && !isCartLoading) {
			setCart(getGuestCart());
		}
	}, [user, cartResponse, isCartLoading]);

	const createCartMutation = useMutation({
		mutationFn: () => api.cart.create({}),
		onSuccess: (response) => {
			queryClient.setQueryData(queryKey, () => {
				return {
					data: {
						data: response?.data?.data,
					},
				};
			});
			setIsInitialized(true);
		},
	});

	const deleteMutation = useMutation({
		mutationFn: (id: string) => {
			return api.cart.removeItemFromCart(cart?.id as string, id);
		},
		onSuccess: (response) => {
			toast.success('Item deleted successfully');
			queryClient.setQueryData(
				queryKey,
				(oldData?: AxiosResponse<IApiResponse<ICart>>) => {
					return {
						...oldData,
						data: {
							...oldData?.data,
							data: response?.data?.data,
						},
					} as AxiosResponse<IApiResponse<ICart>>;
				}
			);
		},
	});

	const updateCartItemQuantityMutation = useMutation({
		mutationFn: (data: { lineId: string; quantity: number }) => {
			return api.cart.updateCartItemQuantityById(
				cart?.id as string,
				data.lineId,
				data.quantity
			);
		},
		onSuccess: (response) => {
			toast.success('Item quantity updated successfully');
			queryClient.setQueryData(queryKey, () => {
				const d = {
					data: {
						data: response?.data?.data,
					},
				};

				return d;
			});
		},
	});

	const addItemToCartMutation = useMutation({
		mutationFn: (data: {
			quantity: number;
			productId: string;
			size: string;
			color: string;
		}) => api.cart.addItemToCart(cart?.id as string, data),
		onSuccess: (response) => {
			toast.success('Product added to cart successfully');
			queryClient.invalidateQueries({
				queryKey,
			});
		},
		onError: (error: IApiError) => {
			toast.error(
				error?.response?.data?.message || 'Failed to add item to basket'
			);
		},
	});

	const getGuestCart = (): ICart => {
		const storedCart = localStorage.getItem(LOCAL_STORAGE_CART_KEY);
		return storedCart
			? JSON.parse(storedCart)
			: { cartItems: [], totalItems: 0 };
	};

	const saveGuestCart = (cart: ICart) => {
		const updatedCart = calculateSubtotals(cart);

		localStorage.setItem(LOCAL_STORAGE_CART_KEY, JSON.stringify(updatedCart));
		queryClient.setQueryData(queryKey, () => {
			return updatedCart;
		});
	};

	const calculateSubtotals = (cart: ICart) => {
		let subtotal = 0;
		let total_items = 0;

		// cart?.cartItems?.forEach((item: ICartItem) => {
		// 	const itemPrice = item?.productVariant?.currentPrice;
		// 	if (itemPrice) {
		// 		subtotal += itemPrice * item.quantity;
		// 	}
		// 	total_items += item.quantity;
		// });

		return {
			...cart,
			subtotal,
			total: subtotal,
			total_items,
		};
	};

	const updateCartItemQuantity = async (lineId: string, quantity: number) => {
		if (user) {
			await updateCartItemQuantityMutation.mutateAsync({ lineId, quantity });
		} else {
			const guestCart = getGuestCart();
			const item = guestCart.cartItems.find((item) => item?.id === lineId);
			if (item) {
				item.quantity = quantity;
				saveGuestCart(guestCart);
			}
			toast.success('Item quantity updated successfully');
		}
	};

	const removeCartItem = async (itemId: string) => {
		if (user) {
			await deleteMutation.mutateAsync(itemId);
		} else {
			const guestCart = getGuestCart();
			guestCart.cartItems = guestCart.cartItems.filter(
				(item) => item?.id !== itemId
			);
			saveGuestCart(guestCart);
			toast.success('Item removed from cart successfully');
		}
	};

	const addItemToCart = async (
		productId: string,
		quantity: number,
		size: string,
		color: string
	) => {
		if (user) {
			await addItemToCartMutation.mutateAsync({
				quantity,
				productId,
				size,
				color,
			});
		} else {
			const guestCart = getGuestCart();

			const lineItem: ICartItem = {
				id: `guest_${Date.now()}_${Math.random().toString(36).substr(2, 9)}`,
				productId,
				quantity,
				size,
				color,
				cartId: guestCart.id,
				createdAt: new Date().toISOString(),
				updatedAt: new Date().toISOString(),
			};

			const existingItem = guestCart?.cartItems?.find(
				(item) => item?.productId === productId
			);

			if (existingItem) {
				existingItem.quantity += quantity;
				if (existingItem.quantity > 10) {
					existingItem.quantity = 10;
				}
			} else if (!existingItem) {
				lineItem.quantity = quantity;
				guestCart?.cartItems?.push(lineItem as unknown as ICartItem);
			}
			toast.success('Item added to cart successfully');
			saveGuestCart(guestCart);
		}
	};

	useEffect(() => {
		const initializeCart = async () => {
			await createCartMutation.mutateAsync();
		};

		if (
			!isInitialized &&
			user?.id &&
			!isCartLoading &&
			!cartResponse?.data?.data
		) {
			initializeCart();
		}
	}, [user, isCartLoading, cartResponse, isInitialized, createCartMutation]);

	useEffect(() => {
		const syncGuestCartWithUserCart = async () => {
			if (user?.id && cart?.id && cartResponse?.data?.data?.id) {
				const guestCart = getGuestCart();
				const promises = guestCart?.cartItems?.map((item) => {
					return api.cart.addItemToCart(cart?.id as string, {
						quantity: item?.quantity,
						productId: item?.productId as string,
						size: item?.size as string,
						color: item?.color as string,
					});
				});
				const results = await Promise.all(promises);
				const lastApiResponse = results[results?.length - 1];
				setIsSynced(true);
				queryClient.setQueryData(queryKey, () => ({
					data: {
						data: lastApiResponse?.data?.data || cartResponse?.data?.data,
					},
				}));
				localStorage.removeItem(LOCAL_STORAGE_CART_KEY);
			}
		};

		if (user?.id && cartResponse?.data?.data?.id && !isSynced) {
			syncGuestCartWithUserCart();
		}
	}, [user, cart, isSynced, cartResponse, queryClient, queryKey]);

	return {
		cart,
		addItemToCart,
		updateCartItemQuantity,
		removeCartItem,
		isLoading: createCartMutation.isPending || addItemToCartMutation.isPending,
	};
};
