import { createAsyncThunk, createSlice, PayloadAction } from '@reduxjs/toolkit'
import axios from 'axios'
import { RootState } from '../store'
import { filterPostsOnCurrentPage } from '../../utils/filterPostsOnCurrentPage'
import { searchPosts } from '../../utils/searchPosts'

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
    postsOnCurrentPage: PostsItemsType
}

const initialState: PostsSliceState = {
    posts: [],
    status: Status.LOADING,
    totalPages: 0,
    currentPage: 1,
    postsOnCurrentPage: []
}

export const fetchPosts = createAsyncThunk<PostsItemsType, string>(
    'posts/fetchPostsStatus',
    async (value = '') => {
        const url = 'https://jsonplaceholder.typicode.com/posts'
        const { data } = await axios.get<PostsItemsType>(url)
        if (value) {
            return searchPosts(data, value)
        }
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
    },
    setPostsOnCurrentPage(state, actions: PayloadAction<number>) {
        state.postsOnCurrentPage = filterPostsOnCurrentPage(state.posts, actions.payload)
    },
    filterPostsId(state) {
        state.postsOnCurrentPage = state.postsOnCurrentPage.reverse()
    },
    filterPostsTitle(state) {
        state.postsOnCurrentPage = state.postsOnCurrentPage.sort((a, b) => {
            return a.title > b.title ? 1 : -1
        })
    },
    filterPostDefault(state) {
        state.postsOnCurrentPage = state.postsOnCurrentPage.sort((a, b) => {
            return a.id > b.id ? 1 : -1
        })
    },
    filterPostsTextLength(state) {
        state.postsOnCurrentPage = state.postsOnCurrentPage.sort((a, b) => {
            return a.body.length < b.body.length ? 1 : -1
        })
    }
  },
  extraReducers: (builder) => {
    builder.addCase(fetchPosts.pending, (state) => {
        state.status = Status.LOADING
        state.posts = []
        state.totalPages = 0
        state.postsOnCurrentPage = []
    })
    builder.addCase(fetchPosts.fulfilled, (state, actions: PayloadAction<PostsItemsType>) => {
        state.posts = actions.payload
        state.status = Status.SUCCESS
        state.totalPages = Math.ceil(actions.payload.length / 10)
        state.postsOnCurrentPage = filterPostsOnCurrentPage(actions.payload, 1)
    })
    builder.addCase(fetchPosts.rejected, (state) => {
        state.status = Status.ERROR
        state.posts = []
        state.totalPages = 0
        state.postsOnCurrentPage = []
    })
  }
})

export const selectPosts = (state: RootState) => state.posts

export const {
    setPosts,
    setCurrentPage,
    setPostsOnCurrentPage,
    filterPostsId,
    filterPostsTitle,
    filterPostDefault,
    filterPostsTextLength
} = postsSlice.actions

export default postsSlice.reducer