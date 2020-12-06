import React from 'react'
import classes from './Paginator.module.css'


const Paginator = ({totalUsersCount, currentPage, usersPerPage, onChangePage}) => {
  const countUsers = Math.ceil(totalUsersCount / usersPerPage)

  let pages = []
  for (let i = 1; i <= countUsers; i++) {
    pages.push(i)
  }

  let paginatorElement = pages.map(item => {
    let activeClass = currentPage === item ? classes.activePageItem : ''
    return (
      <div 
        key={item} 
        className={`${classes.pageItem} ${activeClass}`} 
        onClick={() => onChangePage(item)}
        >
          <div>{item}</div>
        </div> 
    )
  })

  return (
    <React.Fragment>
      {paginatorElement}
    </React.Fragment>
  )
}


export default Paginator