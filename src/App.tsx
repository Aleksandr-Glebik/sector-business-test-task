import React, { useEffect } from 'react'
import './App.css'
import Table from './components/Table/Table'
import SearchComp from './components/SearchComp/SearchComp'

import { useAppDispatch } from './redux/store'
import { selectPosts, fetchPosts } from './redux/slices/postsSlice'
import { useSelector} from 'react-redux'

const App: React.FC = () => {
  const dispatch = useAppDispatch()
  const { posts, status} = useSelector(selectPosts)

  console.log('posts', posts)
  console.log('status', status)


  useEffect(() => {
    dispatch(fetchPosts())
  }, [dispatch])


  return (
    <div className='wrapper'>
      <SearchComp />
      <Table />
    </div>
  )
}

export default App
