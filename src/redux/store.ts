import { combineReducers, configureStore } from '@reduxjs/toolkit';
import orderReducer from './reducers/orderSlice';

const rootReducer = combineReducers({
    order: orderReducer,
});

const store = configureStore({
    reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;

export default store;