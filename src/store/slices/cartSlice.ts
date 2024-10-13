import { IShippingCharges } from '@/modules/types/cart';
import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CartState {
	disabledCheckoutButton: boolean;
	shippingCharges: IShippingCharges | null;
}

const initialState: CartState = {
	disabledCheckoutButton: false,
	shippingCharges: null,
};

const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		setDisabledCheckoutButton: (state, action: PayloadAction<boolean>) => {
			state.disabledCheckoutButton = action.payload;
		},
		setShippingCharges: (
			state,
			action: PayloadAction<IShippingCharges | null>
		) => {
			state.shippingCharges = action.payload;
		},
	},
});

export const { setDisabledCheckoutButton, setShippingCharges } =
	cartSlice.actions;
export default cartSlice.reducer;
