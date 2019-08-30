import React from 'react';

export const DisplayTransactions = ({ getTransactions }) => {
  return getTransactions ? (
    <tr>
      <td>
        {new Date(getTransactions.createdOn).getDate()}-
        {new Date(getTransactions.createdOn).getMonth() + 1}-
        {new Date(getTransactions.createdOn).getFullYear()} &nbsp;
        {new Date(getTransactions.createdOn).getHours()}:
        {new Date(getTransactions.createdOn).getMinutes()}
      </td>
      <td>{getTransactions.type}</td>
      <td>{getTransactions.amount}</td>
      <td>{getTransactions.oldBalance}</td>
      <td>{getTransactions.newBalance}</td>
    </tr>
  ) : (
    <td>
      <td>No transactions found</td>
    </td>
  );
};


export default DisplayTransactions;
