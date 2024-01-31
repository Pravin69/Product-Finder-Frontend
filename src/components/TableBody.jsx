/* eslint-disable react/prop-types */
import React, { useState } from 'react';
import TableRow from './TableRow';
import uuid from 'react-uuid';
import ExpandedRow from './ExpandedRow';

const TableBody = ({ products }) => {
  const [expandedRows, setExpandedRows] = useState(null);

  const handleExpandRow = (prodId) => {
    let currentExpandedRows = null;
    const isRowExpanded = currentExpandedRows === prodId ? prodId : null;
    const newExpandedRows = isRowExpanded
      ? null
      : (currentExpandedRows = prodId);
    if (expandedRows !== prodId) {
      setExpandedRows(newExpandedRows);
    } else {
      setExpandedRows(null);
    }
  };

  return (
    <tbody>
      {products.map((item, index) => (
        <React.Fragment key={uuid()}>
          <TableRow
            item={item.value}
            handleExpandRow={() => handleExpandRow(index)}
          />
          {expandedRows === index ? (
            <tr className="w-full">
              <ExpandedRow item={item.value} />
            </tr>
          ) : null}
        </React.Fragment>
      ))}
    </tbody>
  );
};

export default TableBody;
