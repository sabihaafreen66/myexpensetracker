import React from 'react';

const ExpenseList = ({ expenses }) => {
  return (
    <div className="expense-list">
      <h2>Expenses</h2>
      <ul>
        {expenses.map((expense, index) => (
          <li key={index}>
            {expense.date} - {expense.amount} - {expense.description} - {expense.category}
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExpenseList;
