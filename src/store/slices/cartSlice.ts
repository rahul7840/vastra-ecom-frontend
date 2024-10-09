import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface CartState {
	progressStep: number;
	shippingCharges: {
		shippingCost: number;
		estimatedDeliveryDate: string;
	} | null;
	steps: boolean[];
}

const initialState: CartState = {
	progressStep: 1,
	shippingCharges: null,
	steps: [false, false],
};

const cartSlice = createSlice({
	name: 'cart',
	initialState,
	reducers: {
		setProgressStep: (state, action: PayloadAction<number>) => {
			state.progressStep = action.payload;
		},
		setShippingCharges: (
			state,
			action: PayloadAction<{
				shippingCost: number;
				estimatedDeliveryDate: string;
			}>
		) => {
			state.shippingCharges = action.payload;
		},
		setStep1Completed: (state, action: PayloadAction<boolean>) => {
			state.steps[0] = action.payload;
		},
		setStep2Completed: (state, action: PayloadAction<boolean>) => {
			state.steps[1] = action.payload;
		},
	},
});

export const {
	setProgressStep,
	setShippingCharges,
	setStep1Completed,
	setStep2Completed,
} = cartSlice.actions;
export default cartSlice.reducer;
