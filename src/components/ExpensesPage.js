import React, { useState, useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { addExpense, fetchExpenses, deleteExpense, updateExpense, activatePremium } from '../actions/expenseActions';
import { toggleTheme } from '../actions/themeActions';
import { exportToCSV } from '../utilis/exportToCSV';

const ExpensesPage = () => {
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('');
  const [editingExpenseId, setEditingExpenseId] = useState(null);
  const dispatch = useDispatch();
  const expenses = useSelector(state => state.expenses.expenses);
  const totalAmount = useSelector(state => state.expenses.totalAmount);
  const premium = useSelector(state => state.theme.premium);
  const darkMode = useSelector(state => state.theme.darkMode);

  useEffect(() => {
    dispatch(fetchExpenses());
  }, [dispatch]);

  useEffect(() => {
    if (darkMode) {
      document.body.classList.add('dark-theme');
      document.body.classList.remove('light-theme');
    } else {
      document.body.classList.add('light-theme');
      document.body.classList.remove('dark-theme');
    }
  }, [darkMode]);

  const handleAddExpense = () => {
    if (editingExpenseId) {
      const updatedExpense = { amount, description, category };
      dispatch(updateExpense(editingExpenseId, updatedExpense));
      setEditingExpenseId(null);
    } else {
      dispatch(addExpense({ amount, description, category }));
    }
    setAmount('');
    setDescription('');
    setCategory('');
  };

  const handleExportToCSV = () => {
    exportToCSV(expenses, 'expenses.csv');
  };
  const handleActivatePremium = () => {
    dispatch(activatePremium());
  };

  const handleToggleTheme = () => {
    dispatch(toggleTheme());
  };

  const handleEdit = (expense) => {
    setAmount(expense.amount);
    setDescription(expense.description);
    setCategory(expense.category);
    setEditingExpenseId(expense.id);
  };

  const handleDelete = (id) => {
    dispatch(deleteExpense(id));
  };

  return (
    <div>
      <h2>Expenses</h2>
      <div>
        <input
          type="number"
          placeholder="Amount"
          value={amount}
          onChange={(e) => setAmount(e.target.value)}
        />
        <input
          type="text"
          placeholder="Description"
          value={description}
          onChange={(e) => setDescription(e.target.value)}
        />
        <select value={category} onChange={(e) => setCategory(e.target.value)}>
          <option value="">Select Category</option>
          <option value="Food">Food</option>
          <option value="Transport">Transport</option>
          <option value="Entertainment">Entertainment</option>
          <option value="Other">Other</option>
        </select>
        <button onClick={handleAddExpense}>{editingExpenseId ? 'Update Expense' : 'Add Expense'}</button>
      </div>
      <h3>Total Amount: {totalAmount}</h3>
      {totalAmount >= 10000 && !premium && (
        <button onClick={handleActivatePremium}>Activate Premium</button>
      )}
      {premium && (
        <>
          <button onClick={handleExportToCSV}>Download Expenses</button>
          <p>Premium features activated!</p>
        </>
      )}
      {premium && (
        <button onClick={handleToggleTheme}>
          Switch to {darkMode ? 'Light' : 'Dark'} Theme
        </button>
      )}
      <ul>
        {expenses.map((expense) => (
          <li key={expense.id}>
            {expense.description} - {expense.amount} - {expense.category}
            <button onClick={() => handleEdit(expense)}>Edit</button>
            <button onClick={() => handleDelete(expense.id)}>Delete</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ExpensesPage;
