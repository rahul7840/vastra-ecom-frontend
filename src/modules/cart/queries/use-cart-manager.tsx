import { api } from '@/api';
import { IApiError } from '@/api/types';
import { useSession } from '@/modules/auth/queries/use-session';
import {
	IAddItemToCart,
	ICart,
	ICartItem,
	IUpdateAddress,
} from '@/modules/types/cart';
import { RootState } from '@/store';
import { setShippingCharges } from '@/store/slices/cartSlice';
import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import { debounce } from 'lodash';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { toast } from 'react-toastify';

const LOCAL_STORAGE_CART_KEY = 'guestCart';

export const useCartManager = () => {
	const { user } = useSession();
	const queryClient = useQueryClient();
	const dispatch = useDispatch();
	const [isInitialized, setIsInitialized] = useState(false);
	const [cart, setCart] = useState<ICart | undefined | null>(null);
	const [isSynced, setIsSynced] = useState(false);
	const queryKey = user?.id ? ['cart', user?.id] : ['cart'];

	const charges = useSelector((state: RootState) => state.cart.shippingCharges);

	const { data: cartResponse, isLoading: isCartLoading } = useQuery({
		queryKey: queryKey,
		queryFn: () => api.cart.getCartByCustomerId(),
		enabled: !!user,
	});

	useEffect(() => {
		if (!charges && cart?.shippingAddress?.pincode) {
			shippingChargesDebounced(cart?.shippingAddress?.pincode as string);
		}
	}, [charges, cart]);

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

	const validateAndFetchShippingChargesDebounced = useRef(
		debounce(async (pincode: string) => {
			if (pincode) {
				try {
					const validationResponse = await api.shipping.validatePincode(
						pincode
					);

					if (validationResponse?.data?.data?.isValid) {
						shippingChargesDebounced(pincode);
						return { isValid: true };
					} else {
						dispatch(setShippingCharges(null));
						return { isValid: false, error: 'Invalid pincode' };
					}
				} catch (error) {
					console.error('Error validating pincode:', error);
					return { isValid: false, error: 'Error validating pincode' };
				}
			}
			return { isValid: false, error: 'Pincode is required' };
		}, 500)
	).current;

	const validateAndFetchShippingCharges = useCallback(
		async (pincode: string) => {
			const result = await validateAndFetchShippingChargesDebounced(pincode);
			return result;
		},
		[validateAndFetchShippingChargesDebounced]
	);

	const deleteMutation = useMutation({
		mutationFn: (lineId: string) => {
			return api.cart.removeItemFromCart(cart?.id as string, lineId);
		},
		onSuccess: (response) => {
			toast.success('Item deleted successfully');
			queryClient.invalidateQueries({ queryKey });
			if (cart?.shippingAddress?.pincode) {
				shippingChargesDebounced(cart?.shippingAddress?.pincode);
			}
		},
	});

	const shippingChargesDebounced = useCallback(
		debounce(async (pincode?: string) => {
			try {
				if (pincode && pincode?.length > 0) {
					const response = await api.shipping.getCharges({
						cod: 0,
						delivery_postcode: pincode,
					});
					dispatch(
						setShippingCharges({
							shippingCost: response?.data?.data?.shippingCost ?? 0,
							codCharges: response?.data?.data?.codCharges ?? 0,
							estimatedDeliveryDate:
								response?.data?.data?.estimatedDeliveryDate ?? '',
							subTotal: response?.data?.data?.subTotal ?? 0,
							totalCost: response?.data?.data?.totalCost ?? 0,
						})
					);
				}
			} catch (error) {
				console.error('error in shipping debounced logs 9999', error);
			}
		}, 500),
		[dispatch]
	);

	const updateAddressMutation = useMutation({
		mutationFn: (data: IUpdateAddress) =>
			api.cart.updateAddress(cart?.id as string, data),
		onSuccess: (_, variables) => {
			toast.success('Address updated successfully.');
			if (variables?.shipping?.pincode) {
				validateAndFetchShippingCharges(variables?.shipping?.pincode);
			}
			queryClient.invalidateQueries({ queryKey });
		},
		onError: (error: IApiError) => {
			if (error.response?.data.message) {
				toast.error(error.response.data.message);
			}
		},
	});

	const getGuestCart = (): ICart => {
		const storedCart = localStorage.getItem(LOCAL_STORAGE_CART_KEY);
		return storedCart
			? JSON.parse(storedCart)
			: { cartItems: [], totalItems: 0 };
	};

	const saveGuestCart = (cart: ICart) => {
		console.log('cart in save guest cart logs 33333333', cart);
		calculateSubTotal(cart);
		localStorage.setItem(LOCAL_STORAGE_CART_KEY, JSON.stringify(cart));
		queryClient.setQueryData(queryKey, () => {
			return cart;
		});
	};

	const calculateSubTotal = (cart: ICart) => {
		console.log('cart in subtotal logs 33333333', cart);

		const subTotal = cart?.cartItems?.reduce(
			(acc, item) =>
				acc + (item?.product?.discountedPrice ?? 0) * item?.quantity,
			0
		);

		console.log('logs 33333333 subtotal', subTotal);

		const shippingCharges = {
			shippingCost: 0,
			codCharges: 0,
			estimatedDeliveryDate: '',
			subTotal: subTotal ?? 0,
			totalCost: subTotal ?? 0,
		};

		dispatch(setShippingCharges(shippingCharges));

		return cart;
	};

	const updateCartItemQuantityMutation = useMutation({
		mutationFn: (data: { lineId: string; quantity: number }) => {
			return api.cart.updateCartItemQuantityById(
				cart?.id as string,
				data.lineId,
				data.quantity
			);
		},
		onSuccess: (response) => {
			toast.success('Quantity updated successfully');
			console.log('queryKey', queryKey);
			console.log('cart in update quantity logs 9999', cart);
			if (cart?.shippingAddress?.pincode) {
				shippingChargesDebounced(cart?.shippingAddress?.pincode as string);
			}
			queryClient.invalidateQueries({ queryKey });
		},
	});

	const updateCartItemQuantityDebounced = useRef(
		debounce(
			async ({ lineId, quantity }: { lineId: string; quantity: number }) => {
				console.log('update debounce func called logs 99999');
				if (user?.id) {
					await updateCartItemQuantityMutation.mutateAsync({
						lineId,
						quantity,
					});
				} else {
					const guestCart = getGuestCart();
					const item = guestCart.cartItems.find((item) => item?.id === lineId);
					if (item) {
						item.quantity = quantity;
						saveGuestCart(guestCart);
					}
				}
				toast.success('Quantity updated successfully');
			},
			500
		)
	).current;

	const updateCartItemQuantity = useCallback(
		(data: { lineId: string; quantity: number }) => {
			console.log('update cart item quanity callback func called logs 99999');
			return updateCartItemQuantityDebounced(data);
		},
		[updateCartItemQuantityDebounced]
	);

	useEffect(() => {
		return () => {
			console.log('cancelling all the debounce logs 9999');
			validateAndFetchShippingChargesDebounced.cancel();
			shippingChargesDebounced.cancel();
			addItemToCartDebounced.cancel();
			updateCartItemQuantityDebounced.cancel();
		};
	}, []);

	const removeCartItem = async (itemId: string) => {
		if (user) {
			await deleteMutation.mutateAsync(itemId);
		} else {
			const guestCart = getGuestCart();
			guestCart.cartItems = guestCart.cartItems.filter(
				(item) => item?.id !== itemId
			);
			saveGuestCart(guestCart);
			toast.success('Item removed successfully');
		}
	};

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
			if (cart?.shippingAddress?.pincode) {
				shippingChargesDebounced(cart?.shippingAddress?.pincode);
			}
		},
		onError: (error: IApiError) => {
			toast.error(
				error?.response?.data?.message || 'Failed to add item to basket'
			);
		},
	});

	const addItemToCartDebounced = useRef(
		debounce(
			async ({ productId, quantity, size, color, product }: IAddItemToCart) => {
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
						id: `guest_${Date.now()}_${Math.random()
							.toString(36)
							.substr(2, 9)}`,
						productId,
						quantity,
						size,
						color,
						cartId: guestCart.id,
						product,
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
					saveGuestCart(guestCart);
					toast.success('Item added to cart successfully');
				}
			},
			500
		)
	).current;

	const addItemToCart = useCallback(
		(data: IAddItemToCart) => addItemToCartDebounced(data),
		[addItemToCartDebounced]
	);

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
				const promises = guestCart?.cartItems?.map(async (item) => {
					return await api.cart.addItemToCart(cart?.id as string, {
						quantity: item?.quantity,
						productId: item?.productId as string,
						size: item?.size as string,
						color: item?.color as string,
					});
				});
				const results = await Promise.all(promises);
				console.log('results logs 33333333', results);

				queryClient.invalidateQueries({
					queryKey: ['cart', user.id],
				});
				queryClient.invalidateQueries({
					queryKey: ['cart'],
				});

				localStorage.removeItem(LOCAL_STORAGE_CART_KEY);
				setIsSynced(true);
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
		validateAndFetchShippingCharges,
		updateAddressMutation,
	};
};
