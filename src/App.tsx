import React, { useEffect } from 'react'
import './App.css'
import Table from './components/Table/Table'
import SearchComp from './components/SearchComp/SearchComp'
import Loader from './components/Loader'

import { useAppDispatch } from './redux/store'
import { selectPosts, fetchPosts, Status } from './redux/slices/postsSlice'
import { useSelector } from 'react-redux'

const App: React.FC = () => {
  const dispatch = useAppDispatch()
  const { posts, status } = useSelector(selectPosts)

  // console.log('posts', posts)
  // console.log('status', status)

  useEffect(() => {
    dispatch(fetchPosts())
  }, [dispatch])

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
                    : <Table posts={posts}/>
                }
              </>
            )
      }
    </div>
  )
}

export default App
