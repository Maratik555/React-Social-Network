import React, {useEffect, useState} from 'react'
import styles from "./users.module.css"
import cn from "classnames"


const Paginator = ({totalItemCount,pageSize,currentPage,onPageChanged,portionSize=10}) => {

  let pagesCount = Math.ceil(totalItemCount / pageSize)

  let pages = []
  for (let i = 1; i <= pagesCount; i++) pages.push(i)

  let portionCount = Math.ceil(pagesCount / portionSize)
  let [portionNumber,setPortionNumber] = useState(1)
  let leftPG = (portionNumber - 1) * portionSize + 1
  let rightPG = portionNumber * portionSize
  useEffect(() => setPortionNumber(Math.ceil(currentPage/portionSize)), [currentPage,portionSize])

  return (
    <div className={styles.btn}>
      {portionNumber > 1 &&
      <button onClick={() =>{setPortionNumber(portionNumber - 1)}}>PREV</button>}

        {pages
        .filter(p => p >= leftPG && p<= rightPG)
        .map(p => {
          return <span className={cn({
            [styles.selectedPage] : currentPage === p
        }, styles.pageNumber)}
                  key={p}
                  onClick={(e) => {
                  onPageChanged(p)
                  }}>{p}</span>})}
                  { portionCount > portionNumber &&
        <button onClick={() => {setPortionNumber(portionNumber + 1)} }>NEXT</button> }
    </div>
  )}

export default Paginator