import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'
import { RootState } from '../store'

export interface PostItemType {
    userId: number
    id: number
    title: string
    body: string
}

export type PostsItemsType = PostItemType[]

export enum Status {
    LOADING = 'loading',
    SUCCESS = 'success',
    ERROR = 'error'
}

interface PostsSliceState {
    posts: PostsItemsType
    status: Status
    totalPages: number
    currentPage: number
}

const initialState: PostsSliceState = {
    posts: [],
    status: Status.LOADING,
    totalPages: 0,
    currentPage: 1
}

export const fetchPosts = createAsyncThunk<PostsItemsType>(
    'posts/fetchPostsStatus',
    async () => {
        const url = 'https://jsonplaceholder.typicode.com/posts'
        const { data } = await axios.get<PostsItemsType>(url)
        return data
    }
)

export const postsSlice = createSlice({
  name: 'posts',
  initialState,
  reducers: {
    setPosts(state, actions: PayloadAction<PostsItemsType>) {
        state.posts = actions.payload
    },
    setCurrentPage(state, actions: PayloadAction<number>) {
        state.currentPage = actions.payload
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPosts.pending, (state) => {
        state.status = Status.LOADING
        state.posts = []
        state.totalPages = 0
    })
    builder.addCase(fetchPosts.fulfilled, (state, actions: PayloadAction<PostsItemsType>) => {
        state.posts = actions.payload
        state.status = Status.SUCCESS
        state.totalPages = Math.ceil(actions.payload.length / 10)
    })
    builder.addCase(fetchPosts.rejected, (state) => {
        state.status = Status.ERROR
        state.posts = []
        state.totalPages = 0
    })
  }
})

export const selectPosts = (state: RootState) => state.posts

export const { setPosts, setCurrentPage } = postsSlice.actions

export default postsSlice.reducer