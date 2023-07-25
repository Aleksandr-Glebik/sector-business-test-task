import { configureStore } from "@reduxjs/toolkit"
import { useDispatch } from 'react-redux'
import postsSlice from './slices/postsSlice'
import searchSlice from './slices/searchSlice'

const store = configureStore({
    reducer: {
        posts: postsSlice,
        searchValue: searchSlice
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()

export default store