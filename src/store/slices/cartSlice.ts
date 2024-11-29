import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CartState {
	disabledCheckoutButton: boolean;
}

const initialState: CartState = {
	disabledCheckoutButton: false,
};

const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		setDisabledCheckoutButton: (state, action: PayloadAction<boolean>) => {
			state.disabledCheckoutButton = action.payload;
		},
	},
});

export const { setDisabledCheckoutButton } = cartSlice.actions;
export default cartSlice.reducer;
