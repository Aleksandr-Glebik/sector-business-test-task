import { PayloadAction, createSlice } from "@reduxjs/toolkit"
import { RootState } from "../store"

interface SearchSliceState {
    searchValue: string,
}

const initialState: SearchSliceState = {
    searchValue: '',
}

export const searchSlice = createSlice({
    name: 'search',
    initialState,
    reducers: {
        setSearchValue(state, actions: PayloadAction<string>) {
            state.searchValue = actions.payload
        }
    }
})

export const selectSearchValue = (state: RootState) => state.searchValue

export const { setSearchValue } = searchSlice.actions

export default searchSlice.reducer