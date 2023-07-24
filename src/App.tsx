import React, { useEffect, useRef} from 'react'
import './App.css'
import Table from './components/Table/Table'
import SearchComp from './components/SearchComp/SearchComp'
import Loader from './components/Loader'

import { useAppDispatch } from './redux/store'
import { selectPosts, fetchPosts, Status, PostsItemsType } from './redux/slices/postsSlice'
import { useSelector } from 'react-redux'
import Pagination from './components/Pagination/Pagination'
import { filterPostsOnCurrentPage } from './utils/filterPostsOnCurrentPage'

const App: React.FC = () => {
  const dispatch = useAppDispatch()
  
  const {
    posts,
    status,
    currentPage,
    totalPages
  } = useSelector(selectPosts)

  const postsOnCurrentPage = useRef<null | PostsItemsType>()
  postsOnCurrentPage.current = filterPostsOnCurrentPage(posts, currentPage)

  useEffect(() => {
    dispatch(fetchPosts())
  }, [dispatch])

  useEffect(() => {
    postsOnCurrentPage.current = filterPostsOnCurrentPage(posts, currentPage)
  }, [currentPage, posts])

  return (
    <div className='wrapper'>
      <SearchComp />
      {
        status === Status.ERROR
          ? (
              <div className='error'>
                <h2>Произошла ошибка 😕</h2>
                <p>К сожалению, не удалось получить посты. Попробуйте повторить попытку позже.</p>
              </div>
            )
          : (
              <>
                {
                  status === Status.LOADING
                    ? <Loader />
                    : postsOnCurrentPage.current && <Table
                        posts={postsOnCurrentPage.current}
                      />
                }
              </>
            )
      }
      <Pagination currentPage={currentPage} totalPages={totalPages}/>
    </div>
  )
}

export default App
