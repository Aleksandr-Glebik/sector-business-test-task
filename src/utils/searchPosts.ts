import { PostsItemsType } from "../redux/slices/postsSlice"

export const searchPosts = (posts: PostsItemsType, searchValue: string) => {
    return posts.filter(post => {
        return post.id.toString().includes(searchValue)
          || post.title.includes(searchValue)
          || post.body.includes(searchValue)
    })
}