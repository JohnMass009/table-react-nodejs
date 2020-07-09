import React from 'react';

export const useSort = (items, config = null) => {
  const [sortConfig, setSortConfig] = React.useState(config);

  const sortedItems = React.useMemo(() => {
    if(!items || items.length < 0)
      return [];

    let sortableItems = [...items];

    if (sortConfig !== null) {
      sortableItems.sort((a, b) => {
        const itemA = a[sortConfig.key];
        const itemB = b[sortConfig.key];

        if (typeof a[sortConfig.key] === 'string' && typeof b[sortConfig.key] === 'string') {
          if (sortConfig.direction === 'descending')
            return compareStrWithNum(itemB.toLowerCase(), itemA.toLowerCase());

          return compareStrWithNum(itemA.toLowerCase(), itemB.toLowerCase());
        }

        if (itemA < itemB)
          return sortConfig.direction === 'ascending' ? -1 : 1;

        if (itemA > itemB)
          return sortConfig.direction === 'ascending' ? 1 : -1;

        return 0;
      });
    }

    return sortableItems;
  }, [items, sortConfig]);

  const requestSort = (key) => {
    if (!key)
      return undefined;

    let direction = 'ascending';
    if (
      sortConfig &&
      sortConfig.key === key &&
      sortConfig.direction === 'ascending'
    ) {
      direction = 'descending';
    }
    setSortConfig({ key, direction });
  };

  return [ sortedItems, requestSort, sortConfig ];
}

function compareStrWithNum(a, b) {
  let ax = [], bx = [];

  a.replace(/(\d+)|(\D+)/g, function(_, $1, $2) {
    ax.push([$1 || Infinity, $2 || ''])
  });
  b.replace(/(\d+)|(\D+)/g, function(_, $1, $2) {
    bx.push([$1 || Infinity, $2 || ''])
  });

  while(ax.length && bx.length) {
    let an = ax.shift();
    let bn = bx.shift();
    let nn = (an[0] - bn[0]) || an[1].localeCompare(bn[1]);
    if(nn)
      return nn;
  }

  return ax.length - bx.length;
}