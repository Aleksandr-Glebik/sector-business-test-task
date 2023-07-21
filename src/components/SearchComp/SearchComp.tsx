import React from 'react'
import styles from './SearchComp.module.css'
import searchIcon from '../../assets/img/searchIcon.png'

const SearchComp = () => {
  return (
    <div className={styles.container}>
        <input
          className={styles.input}
          placeholder='Поиск'
        />
        <img
          src={searchIcon}
          alt='search-icon'
          className={styles.img}
        />
    </div>
  )
}

export default SearchComp