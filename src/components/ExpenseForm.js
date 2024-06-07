import React, { useState } from 'react';

const ExpenseForm = ({ addExpense }) => {
  const [amount, setAmount] = useState('');
  const [description, setDescription] = useState('');
  const [category, setCategory] = useState('Food');

  const handleSubmit = (e) => {
    e.preventDefault();
    const newExpense = {
      amount,
      description,
      category,
      date: new Date().toLocaleDateString()
    };
    addExpense(newExpense);
    setAmount('');
    setDescription('');
    setCategory('Food');
  };

  return (
    <form onSubmit={handleSubmit} className="expense-form">
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
  );
};

export default ExpenseForm;
