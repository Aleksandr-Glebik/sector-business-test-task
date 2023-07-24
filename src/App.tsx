import React, { useEffect } from 'react'
import './App.css'
import Table from './components/Table/Table'
import SearchComp from './components/SearchComp/SearchComp'
import Loader from './components/Loader'

import { useAppDispatch } from './redux/store'
import {
  selectPosts,
  fetchPosts,
  Status,
  setPostsOnCurrentPage
} from './redux/slices/postsSlice'
import { useSelector } from 'react-redux'
import Pagination from './components/Pagination/Pagination'

const App: React.FC = () => {
  const dispatch = useAppDispatch()

  const {
    posts,
    status,
    currentPage,
    totalPages,
    postsOnCurrentPage
  } = useSelector(selectPosts)

  useEffect(() => {
    dispatch(fetchPosts())
  }, [dispatch])

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
      <Pagination currentPage={currentPage} totalPages={totalPages}/>
    </div>
  )
}

export default App
