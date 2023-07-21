import React from 'react'
import clsx from 'clsx'
import styles from './Table.module.css'
import sortIcon from '../../assets/img/sortIcon.png'

const Table: React.FC = () => {
  const btnSortHandler = () => {
    console.log('click btnSortHandler')
  }

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
            <tr className={clsx(styles.tr, styles['body-tr'])}>
                <td className={clsx(styles.td, styles.id, styles['body-td'])}>1</td>
                <td className={clsx(styles.td, styles.title, styles['body-td'])}>sunt aut facere repellat provident occaecati excepturi optio reprehenderit</td>
                <td className={clsx(styles.td, styles.text, styles['body-td'])}>quia et suscipit\nsuscipit recusandae consequuntur expedita et cum\nreprehenderit molestiae ut ut quas totam\nnostrum rerum est autem sunt rem eveniet architecto</td>
            </tr>
            <tr className={clsx(styles.tr, styles['body-tr'])}>
                <td className={clsx(styles.td, styles.id, styles['body-td'])}>2</td>
                <td className={clsx(styles.td, styles.title, styles['body-td'])}>qui est esse</td>
                <td className={clsx(styles.td, styles.text, styles['body-td'])}>est rerum tempore vitae\nsequi sint nihil reprehenderit dolor beatae ea dolores neque\nfugiat blanditiis voluptate porro vel nihil molestiae ut reiciendis\nqui aperiam non debitis possimus qui neque nisi nulla</td>
            </tr>
        </tbody>
    </table>
  )
}

export default Table