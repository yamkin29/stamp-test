import { createSlice, PayloadAction } from '@reduxjs/toolkit';

interface selectViewProps {
    timeInterval: number;

    activeButtonsDefault: {
        usual: boolean;
        special: boolean;
        failure: boolean;
        relay: boolean;
    };
}

const initialState: selectViewProps = {
    timeInterval: 1,

    activeButtonsDefault: {
        usual: false,
        special: false,
        failure: false,
        relay: false,
    },
};

const archiveTabSlice = createSlice({
    name: 'archiveTabContent',
    initialState,
    reducers: {
        setTimeInterval: (state, action: PayloadAction<number>) => {
            state.timeInterval = action.payload;
        },
        setActiveButtonsDefault: (state, action: PayloadAction<keyof selectViewProps['activeButtonsDefault']>) => {
            const buttonName = action.payload;
            state.activeButtonsDefault[buttonName] = !state.activeButtonsDefault[buttonName];
        },
    },
});

export const { setTimeInterval, setActiveButtonsDefault } = archiveTabSlice.actions;
export default archiveTabSlice.reducer;
