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
}

const initialState: PostsSliceState = {
    posts: [],
    status: Status.LOADING
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
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPosts.pending, (state) => {
        state.status = Status.LOADING
        state.posts = []
    })
    builder.addCase(fetchPosts.fulfilled, (state, actions: PayloadAction<PostsItemsType>) => {
        state.posts = actions.payload
        state.status = Status.SUCCESS
    })
    builder.addCase(fetchPosts.rejected, (state) => {
        state.status = Status.ERROR
        state.posts = []
    })
  }
})

export const selectPosts = (state: RootState) => state.posts

export const { setPosts } = postsSlice.actions

export default postsSlice.reducer