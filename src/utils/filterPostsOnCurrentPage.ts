import { PostsItemsType } from '../redux/slices/postsSlice'

export const filterPostsOnCurrentPage = (posts: PostsItemsType, currentPage: number) => {
    const totalPostsOnPage = 10
    let lastIndex = currentPage * totalPostsOnPage
    let firstIndex = lastIndex - totalPostsOnPage

    return posts.slice(firstIndex, lastIndex)
}