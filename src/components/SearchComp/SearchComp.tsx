import React, { useState, useCallback, useMemo } from 'react'
import debounce from 'lodash.debounce'
import styles from './SearchComp.module.css'
import searchIcon from '../../assets/img/searchIcon.png'
import { useAppDispatch } from '../../redux/store'
import { setSearchValue } from '../../redux/slices/searchSlice'

const SearchComp = () => {
  const dispatch = useAppDispatch()

  const [localValue, setLocalValue] = useState('')

  const debouncedSearch = useMemo(
    () => debounce( (str: string) => {
      dispatch(setSearchValue(str))
    }, 1000),
    [ dispatch]
  )

  const onChangeInput = useCallback(
    (e: React.ChangeEvent<HTMLInputElement>) => {
      setLocalValue(e.target.value)
      debouncedSearch(e.target.value)
    },
    [debouncedSearch]
  )

  return (
    <div className={styles.container}>
        <input
          className={styles.input}
          placeholder='Поиск'
          value={localValue}
          onChange={onChangeInput}
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