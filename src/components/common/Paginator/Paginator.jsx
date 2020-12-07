import React, {useState} from 'react'
import classes from './Paginator.module.css'


const Paginator = ({totalItemsCount, currentPage, usersPerPage, onChangePage, portionSize = 10}) => {


  const pagesCount = Math.ceil((totalItemsCount / usersPerPage))

  const portionCount = Math.ceil(pagesCount / portionSize) // const
  const [portionNumber, setPortionNumber] = useState(1)
  const pageLeftBorder = (portionNumber - 1) * portionSize + 1
  const pageRightBorder = portionNumber * portionSize

  let pages = []
  for (let i = 1; i <= pagesCount; i++) {
    pages.push(i)
  }

  let paginatorElement = pages
    .filter(pageNumber => {
      return pageNumber >= pageLeftBorder && pageNumber <= pageRightBorder
    })
    .map((item) => {
      let activeClass = currentPage === item ? classes.activePageItem : ''
      return (
        <div
          key={ item }
          className={ `${ classes.pageItem } ${ activeClass }` }
          onClick={ () => onChangePage(item) }
        >
          <div>
            { item }
          </div>
        </div>
      )
    })

  return (
    <React.Fragment>
      { portionNumber > 1 &&
      <button onClick={ () => setPortionNumber(portionNumber - 1) }>PREV</button>
      }
      { paginatorElement }
      { portionCount > portionNumber &&
      <button onClick={ () => setPortionNumber(portionNumber + 1) }>NEXT</button> }
    </React.Fragment>
  )
}


export default Paginator