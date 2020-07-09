import React from 'react';
import './Pagination.scss'
import {limitRow} from 'consts';

export const Pagination = ({currentPage, setCurrentPage, totalItems = 1}) => {
  const total = Math.ceil(totalItems / limitRow)

  const onChange = (event) => {
    const value = event.target.value;
    value <= total && value > 0
      ? setCurrentPage(event.target.value)
      : setCurrentPage(total);
  }

  const onClick = (type) => {
    if (type === 'back')
      setCurrentPage((currentPage) => currentPage-1);
    if (type === 'next')
      setCurrentPage((currentPage) => currentPage+1);
  }

  return (
    <div className={'pagination'}
    >
      <button className={'pagination__btn'}
              disabled={currentPage === 1}
              onClick={()=> onClick('back')}>Previous</button>
      <div className={'pagination__center'}>
        <div className={'pagination__page-info'}>
          Page
          <input type={'number'}
                 className={'pagination__input'}
                 value={currentPage}
                 onChange={(event => onChange(event))} />
          of
          <span className={'pagination__total-pages'}>{total}</span>
        </div>
      </div>
      <button className={'pagination__btn'}
              disabled={currentPage === total}
              onClick={()=> onClick('next')}>Next</button>
    </div>)
};