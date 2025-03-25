import { combineReducers, configureStore } from '@reduxjs/toolkit';
import archiveTabReducer from './reducers/ArchiveTabSlice';

const rootReducer = combineReducers({
    archiveTab: archiveTabReducer,
});

const store = configureStore({
    reducer: rootReducer,
});

export type RootState = ReturnType<typeof store.getState>;

export type AppDispatch = typeof store.dispatch;

export type AppState = ReturnType<typeof rootReducer>;

export default store;
