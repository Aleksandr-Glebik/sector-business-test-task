import React from 'react'
import './App.css'
import Table from './components/Table/Table'
import SearchComp from './components/SearchComp/SearchComp'

function App() {
  return (
    <div className='wrapper'>
      <SearchComp />
      <Table />
    </div>
  )
}

export default App
