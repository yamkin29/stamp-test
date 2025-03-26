import { createSlice, PayloadAction } from '@reduxjs/toolkit';

type PaymentMethod = 'cash' | 'bank' | null;
type TransactionStatus = 'idle' | 'pending' | 'success' | 'failure';

interface OrderState {
    selectedDrink: number | null;
    paymentMethod: PaymentMethod;
    insertedAmount: number;
    bankPaymentMessages: string[];
    transactionStatus: TransactionStatus;
    change: number;
}

const initialState: OrderState = {
    selectedDrink: null,
    paymentMethod: null,
    insertedAmount: 0,
    bankPaymentMessages: [],
    transactionStatus: 'idle',
    change: 0,
};

const orderSlice = createSlice({
    name: 'order',
    initialState,
    reducers: {
        setSelectedDrink: (state, action: PayloadAction<number>) => {
            state.selectedDrink = action.payload;
        },
        setPaymentMethod: (state, action: PayloadAction<PaymentMethod>) => {
            state.paymentMethod = action.payload;
        },
        addInsertedAmount: (state, action: PayloadAction<number>) => {
            state.insertedAmount += action.payload;
        },
        addBankPaymentMessage: (state, action: PayloadAction<string>) => {
            state.bankPaymentMessages.push(action.payload);
        },
        clearBankPaymentMessages: (state) => {
            state.bankPaymentMessages = [];
        },
        setTransactionStatus: (state, action: PayloadAction<TransactionStatus>) => {
            state.transactionStatus = action.payload;
        },
        setChange: (state, action: PayloadAction<number>) => {
            state.change = action.payload;
        },
        resetOrder: (state) => {
            state.selectedDrink = null;
            state.paymentMethod = null;
            state.insertedAmount = 0;
            state.bankPaymentMessages = [];
            state.transactionStatus = 'idle';
        },
    },
});

export const {
    setSelectedDrink,
    setPaymentMethod,
    addInsertedAmount,
    addBankPaymentMessage,
    clearBankPaymentMessages,
    setTransactionStatus,
    setChange,
    resetOrder,
} = orderSlice.actions;

export default orderSlice.reducer;