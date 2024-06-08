import React, { useState, useEffect } from 'react';
import { getDatabase, ref, push, onValue } from 'firebase/database';
import { app,getAuth } from '../firebaseConfig';



const ExpenseForm = () => {
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Food');
  const [expenses, setExpenses] = useState([]);
  const [userEmail, setUserEmail] = useState('');

  useEffect(() => {
    const auth = getAuth(app);
    const user = auth.currentUser;

    if (user) {
      setUserEmail(user.email);
    }

    const database = getDatabase(app);
    const expensesRef = ref(database, 'expenses');

    // Listen for changes in expenses and update state
    onValue(expensesRef, (snapshot) => {
      const expensesData = snapshot.val();
      if (expensesData) {
        const expensesList = Object.keys(expensesData)
          .map((key) => ({
            id: key,
            ...expensesData[key]
          }))
          .filter(expense => expense.email === user.email); // Filter expenses by user email
        setExpenses(expensesList);
      }
    });
  }, []); // Run once when the component mounts

  const handleSubmit = (e) => {
    e.preventDefault();
    const auth = getAuth(app);
    const user = auth.currentUser;

    if (user) {
      const newExpense = {
        amount,
        description,
        category,
        date: new Date().toLocaleDateString(),
        email: user.email
      };
      addExpense(newExpense);
      setAmount('');
      setDescription('');
      setCategory('Food');
    } else {
      console.error("No authenticated user found.");
    }
  };

  const addExpense = (expense) => {
    const database = getDatabase(app);
    const expensesRef = ref(database, 'expenses');
    push(expensesRef, expense);
  };

  return (
    <div className="expense-form-container">
      <form onSubmit={handleSubmit} className="expense-form">
        {/* Form inputs */}
        <div className="form-group">
          <label>Amount:</label>
          <input 
            type="number" 
            value={amount} 
            onChange={(e) => setAmount(e.target.value)} 
            required 
          />
        </div>
        <div className="form-group">
          <label>Description:</label>
          <input 
            type="text" 
            value={description} 
            onChange={(e) => setDescription(e.target.value)} 
            required 
          />
        </div>
        <div className="form-group">
          <label>Category:</label>
          <select value={category} onChange={(e) => setCategory(e.target.value)} required>
            <option value="Food">Food</option>
            <option value="Petrol">Petrol</option>
            <option value="Salary">Salary</option>
            <option value="Other">Other</option>
          </select>
        </div>
        <button type="submit">Add Expense</button>
      </form>
      
      <div className="expense-list">
        <h2>Expenses</h2>
        <ul>
          {expenses.map((expense) => (
            <li key={expense.id}>
              {expense.date} - {expense.amount} - {expense.description} - {expense.category} 
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default ExpenseForm;