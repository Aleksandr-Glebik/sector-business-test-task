import React from 'react'
import styles from './Pagination.module.css'
import clsx from 'clsx'
import { setCurrentPage } from '../../redux/slices/postsSlice'
import { useAppDispatch } from '../../redux/store'

interface PaginationType {
    currentPage: number
    totalPages: number
}

const Pagination: React.FC<PaginationType> = ({ totalPages, currentPage }) => {
  const dispatch = useAppDispatch()
  const pageClickHandler = (num: number) => {
    dispatch(setCurrentPage(num))
  }

  const prevPage = () => {
    if (currentPage === 1) {
        dispatch(setCurrentPage(totalPages))
    } else if (currentPage > 1) {
        dispatch(setCurrentPage(currentPage - 1))
    }
  }

  const nextPage = () => {
    if (currentPage === totalPages) {
        dispatch(setCurrentPage(1))
    } else if (currentPage < totalPages) {
        dispatch(setCurrentPage(currentPage + 1))
    }
  }

  return (
    <div className={styles.container}>
        <button
          className={clsx(styles.btn, )}
          onClick={prevPage}
        >
          Назад
        </button>
        <ul className={styles.list}>
            {
              totalPages > 0 &&
                [...Array(totalPages)].map((_, ind) => (
                  <li
                    key={ind}
                    className={clsx(
                        styles.item,
                        currentPage === ind + 1
                          ? styles.active
                          : ''
                    )}
                    onClick={() => pageClickHandler(ind + 1)}
                  >
                    {ind + 1}
                  </li>
                ))
            }
        </ul>
        <button
          className={clsx(styles.btn, )}
          onClick={nextPage}
        >
            Вперед
        </button>
    </div>
  )
}

export default Pagination