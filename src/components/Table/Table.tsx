import React, { useState, useEffect } from 'react'
import clsx from 'clsx'
import styles from './Table.module.css'
import sortIcon from '../../assets/img/sortIcon.png'
import { PostsItemsType } from '../../redux/slices/postsSlice'
interface TableType {
    posts: PostsItemsType
}

const Table: React.FC<TableType> = ({ posts }) => {
  const [filterId, setFilterId] = useState(false)

  const btnSortHandlerId = () => {
    console.log('click btnSortHandler')
    setFilterId(prev => !prev)
  }
  const btnSortHandlerTitle = () => {
    console.log('click btnSortHandler')
  }
  const btnSortHandlerText = () => {
    console.log('click btnSortHandler')
  }

  console.log('posts in Table', posts)
  console.log('filter', filterId)

  useEffect(() => {
    if (filterId) {
      posts.sort((a, b) => {
        return a.id - b.id
      })
    } else if (filterId === false) {
      posts.sort((a, b) => {
        return b.id - a.id
      })
    }
  }, [filterId, posts])

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
                            className={clsx(styles.icon)}
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
                            className={clsx(styles.icon)}
                        />
                    </button>
                </th>
            </tr>
        </thead>
        <tbody className={styles.body}>
            {
              posts &&
                posts.map(post => (
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
            }
        </tbody>
    </table>
  )
}

export default Table