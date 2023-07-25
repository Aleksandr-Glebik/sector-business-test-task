import React, { useEffect } from 'react'
import './App.css'
import Table from './components/Table/Table'
import SearchComp from './components/SearchComp/SearchComp'
import Loader from './components/Loader/Loader'

import { useAppDispatch } from './redux/store'
import {
  selectPosts,
  fetchPosts,
  Status,
  setPostsOnCurrentPage,
  setCurrentPage
} from './redux/slices/postsSlice'
import { useSelector } from 'react-redux'
import Pagination from './components/Pagination/Pagination'
import { selectSearchValue } from './redux/slices/searchSlice'

const App: React.FC = () => {
  const dispatch = useAppDispatch()
  const { searchValue } = useSelector(selectSearchValue)

  const {
    posts,
    status,
    currentPage,
    totalPages,
    postsOnCurrentPage
  } = useSelector(selectPosts)

  useEffect(() => {
    dispatch(fetchPosts(''))
    dispatch(setCurrentPage(1))
  }, [dispatch])

  useEffect(() => {
    dispatch(fetchPosts(searchValue))
    dispatch(setCurrentPage(1))
  }, [searchValue, dispatch])

  useEffect(() => {
    dispatch(setPostsOnCurrentPage(currentPage))
  }, [currentPage, posts, dispatch])

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
                    : postsOnCurrentPage && <Table
                        posts={postsOnCurrentPage}
                      />
                }
              </>
            )
      }
      {
        totalPages > 0
          ? <Pagination currentPage={currentPage} totalPages={totalPages}/>
          : null
      }
    </div>
  )
}

export default App
