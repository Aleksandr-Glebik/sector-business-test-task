import React, { useState, useEffect } from 'react'
import clsx from 'clsx'
import styles from './Table.module.css'
import sortIcon from '../../assets/img/sortIcon.png'
import { PostsItemsType } from '../../redux/slices/postsSlice'
import {
  filterPostsId,
  filterPostsTitle,
  filterPostDefault,
  filterPostsTextLength
} from '../../redux/slices/postsSlice'
import { useAppDispatch } from '../../redux/store'
interface TableType {
    posts: PostsItemsType
}

const Table: React.FC<TableType> = ({ posts }) => {
  const dispatch = useAppDispatch()

  const [filterId, setFilterId] = useState(false)
  const [filterTitle, setFilterTitle] = useState(false)
  const [filterText, setFilterText] = useState(false)

  const btnSortHandlerId = () => {
    setFilterTitle(false)
    setFilterText(false)
    setFilterId(prev => !prev)
  }
  const btnSortHandlerTitle = () => {
    setFilterId(false)
    setFilterText(false)
    setFilterTitle(prev => !prev)
  }
  const btnSortHandlerText = () => {
    setFilterTitle(false)
    setFilterId(false)
    setFilterText(prev => !prev)
  }

  useEffect(() => {
    dispatch(filterPostsId())
  }, [filterId, dispatch])

  useEffect(() => {
    if (filterTitle) {
      dispatch(filterPostsTitle())
    } else {
      dispatch(filterPostDefault())
    }
  }, [filterTitle, dispatch])

  useEffect(() => {
    if (filterText) {
      dispatch(filterPostsTextLength())
    } else {
      dispatch(filterPostDefault())
    }
  }, [filterText, dispatch])

  return (
    <table className={styles.table}>
        <thead className={styles.header}>
            <tr className={styles.tr}>
                <th className={clsx(styles.th, styles.id)}>
                    ID
                    <button
                      className={clsx(styles.btn)}
                      onClick={btnSortHandlerId}
                      >
                        <img
                            alt='sort icon'
                            src={sortIcon}
                            className={clsx(
                              styles.icon,
                              filterId ? styles.filtered : styles.notFiltered
                            )}
                        />
                    </button>
                </th>
                <th className={clsx(styles.th, styles.title)}>
                    Заголовок
                    <button
                      className={clsx(styles.btn)}
                      onClick={btnSortHandlerTitle}
                    >
                        <img
                            alt='sort icon'
                            src={sortIcon}
                            className={clsx(
                              styles.icon,
                              filterTitle ? styles.filtered : styles.notFiltered
                            )}
                        />
                    </button>
                </th>
                <th className={clsx(styles.th, styles.text)}>
                    Описание
                    <button
                      className={clsx(styles.btn)}
                      onClick={btnSortHandlerText}
                    >
                        <img
                            alt='sort icon'
                            src={sortIcon}
                            className={clsx(
                              styles.icon,
                              filterText ? styles.filtered : styles.notFiltered
                            )}
                        />
                    </button>
                </th>
            </tr>
        </thead>
        <tbody className={styles.body}>
            {
              posts.length > 0
                ? posts.map(post => (
                    <tr
                      key={post.id}
                      className={clsx(styles.tr, styles['body-tr'])}
                    >
                        <td
                          className={clsx(styles.td, styles.id, styles['body-td'])}
                        >
                            {post.id}
                        </td>
                        <td
                          className={clsx(styles.td, styles.title, styles['body-td'])}
                        >
                            {post.title}
                        </td>
                        <td
                          className={clsx(styles.td, styles.text, styles['body-td'])}
                        >
                            {post.body}
                        </td>
                    </tr>
                ))
                : (<tr
                    className={clsx(styles.tr, styles['body-tr'], styles['tr-notFound'])}
                  >
                    <td className={clsx(styles['td-notFound'])}>
                      Данные не найдены
                    </td>
                  </tr>)
            }
        </tbody>
    </table>
  )
}

export default Table