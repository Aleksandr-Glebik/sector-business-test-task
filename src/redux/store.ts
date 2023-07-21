import { configureStore } from "@reduxjs/toolkit"
import { useDispatch } from 'react-redux'
import postsSlice from './slices/postsSlice'

const store = configureStore({
    reducer: {
        posts: postsSlice
    }
})

export type RootState = ReturnType<typeof store.getState>
export type AppDispatch = typeof store.dispatch

export const useAppDispatch = () => useDispatch<AppDispatch>()

export default store