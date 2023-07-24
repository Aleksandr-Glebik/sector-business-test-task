import React from 'react'
import clsx from 'clsx'
import styles from './Table.module.css'
import sortIcon from '../../assets/img/sortIcon.png'
import { PostsItemsType } from '../../redux/slices/postsSlice'
import { filterPostsOnCurrentPage } from '../../utils/filterPostsOnCurrentPage'
interface TableType {
    posts: PostsItemsType
    currentPage: number
}

const Table: React.FC<TableType> = ({ posts, currentPage }) => {
  const btnSortHandler = () => {
    console.log('click btnSortHandler')
  }

  console.log('posts in Table', posts);

  return (
    <table className={styles.table}>
        <thead className={styles.header}>
            <tr className={styles.tr}>
                <th className={clsx(styles.th, styles.id)}>
                    ID
                    <button
                      className={clsx(styles.btn)}
                      onClick={btnSortHandler}
                    >
                        <img
                            alt='sort icon'
                            src={sortIcon}
                            className={clsx(styles.icon)}
                        />
                    </button>
                </th>
                <th className={clsx(styles.th, styles.title)}>
                    Заголовок
                    <button
                      className={clsx(styles.btn)}
                      onClick={btnSortHandler}
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
                      onClick={btnSortHandler}
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
                filterPostsOnCurrentPage(posts, currentPage).map(post => (
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