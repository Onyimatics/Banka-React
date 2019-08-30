import React from 'react';

export const DisplayAccounts = (props) => {
  const {
    getTransaction,
    getAccounts
  } = props;
  return (
    <tr>
      <td>{getAccounts.accountNumber}</td>
      <td>{getAccounts.type}</td>
      <td>{getAccounts.Balance}</td>
      <td>
        <button
          id="view-transactions"
          type="button"
          className="btn btn-primary"
          onClick={() => getTransaction(getAccounts.accountNumber)}
        >
          View
        </button>
      </td>
    </tr>
  );
};

export default DisplayAccounts;
