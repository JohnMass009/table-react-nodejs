import React, { useEffect } from 'react';
import classNames from 'classnames';
import {stringify} from 'query-string';

import { constants, limitRow as limit } from 'consts';
import { parseDateTime, toLowerCase } from 'core/utils';
import {useFetch} from 'core/hooks/useFetch';
import { useSort } from 'core/hooks/useSort';

import { Filter } from 'components/filter';
import { Pagination } from 'components/pagination';

import 'components/table/Table.scss'

export const Table = (props) => {
  const colsName = Object.keys(constants.header);
  const [currentPage, setCurrentPage] = React.useState(1);

  const offset = currentPage * limit - limit

  const stringifiedParams = stringify({
    limit,
    offset
  })

  const apiUrlItems = `items?${stringifiedParams}`
  const [responseItems, doFetchItems] = useFetch(apiUrlItems);
  const apiUrlItemsCount = `items-count`;
  const [responseItemsCount, doFetchItemsCount] = useFetch(apiUrlItemsCount);

  const itemsCount = responseItemsCount ? responseItemsCount[0].exact_count : 0;

  useEffect(() => {
    doFetchItems();
    doFetchItemsCount()
  }, [currentPage, doFetchItems, doFetchItemsCount])

  let data = responseItems
  && responseItems.items
  && responseItems.items.length > 0 ? responseItems.items : [];

  data = data.map((item) => {
    return toLowerCase(item);
  })

  const {filterColumn, filterValue, filterMethod } = props.filter;

  const items = props.filterable
    && data
    && Object.keys(props.filter).length > 0
      ? data.filter((item) => filterMethod(item[filterColumn], filterValue))
      : data

  const [sortedItems, requestSort, sortConfig] = useSort(items, {
    key: 'name', direction: 'ascending'
  });
  const totalItems = sortedItems.length === data.length
  ? itemsCount
  :  sortedItems.length > 0 ? sortedItems.length : 1;

  const getClassNamesFor = (name) => {
    if (!sortConfig) {
      return;
    }
    return sortConfig.key === name ? sortConfig.direction : null;
  };
  return(
    <div className={'table'}>
      <div className={'table__body'}>
      <table>
        <thead>
        <tr className={'table__row-header'}>
          {
            colsName.map((colName, index) => {
              return (
                <th key={colName+index} className={'table__column-header'}>
                  <div
                    onClick={() => requestSort(colName !== 'data' ? colName : '')}
                    className={classNames('table__column-header__name', getClassNamesFor(colName))}
                  >
                    {constants.header[colName]}
                  </div>
                </th>
              )
            })
          }
        </tr>
        </thead>
        <tbody>
        {sortedItems.map((itemData, index) => (
          <tr key={itemData+index} className={'table__row'}>
            <td className={'table__column'}>{ itemData.name }</td>
            <td className={'table__column'}>{ itemData.count }</td>
            <td className={'table__column'}>{ parseDateTime(itemData.date) }</td>
            <td className={'table__column'}>{ itemData.distance }</td>
          </tr>
        ))}
        </tbody>
      </table>
      </div>
      <Pagination currentPage={currentPage}
                  setCurrentPage={setCurrentPage}
                  totalItems={totalItems}/>
    </div>
  );
}

export const TableWithFilter = Filter(Table);