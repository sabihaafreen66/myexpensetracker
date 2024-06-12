import { ADD_EXPENSE, SET_EXPENSES, DELETE_EXPENSE, UPDATE_EXPENSE } from '../actions/expenseActions';

const initialState = {
  expenses: [],
  totalAmount: 0,
  premium: false,
};

const expensesReducer = (state = initialState, action) => {
  switch (action.type) {
    case ADD_EXPENSE:
      const newTotal = state.totalAmount + parseFloat(action.payload.amount);
      return {
        ...state,
        expenses: [...state.expenses, action.payload],
        totalAmount: newTotal,
        premium: newTotal >= 10000,
      };
    case SET_EXPENSES:
      const totalAmount = action.payload.reduce((sum, expense) => sum + parseFloat(expense.amount), 0);
      return {
        ...state,
        expenses: action.payload,
        totalAmount,
        premium: totalAmount >= 10000,
      };
    case DELETE_EXPENSE:
      const filteredExpenses = state.expenses.filter(expense => expense.id !== action.payload);
      const newTotalAfterDeletion = filteredExpenses.reduce((sum, expense) => sum + parseFloat(expense.amount), 0);
      return {
        ...state,
        expenses: filteredExpenses,
        totalAmount: newTotalAfterDeletion,
        premium: newTotalAfterDeletion >= 10000,
      };
    case UPDATE_EXPENSE:
      const updatedExpenses = state.expenses.map(expense =>
        expense.id === action.payload.id ? { ...expense, ...action.payload } : expense
      );
      const newTotalAfterUpdate = updatedExpenses.reduce((sum, expense) => sum + parseFloat(expense.amount), 0);
      return {
        ...state,
        expenses: updatedExpenses,
        totalAmount: newTotalAfterUpdate,
        premium: newTotalAfterUpdate >= 10000,
      };
    default:
      return state;
  }
};

export default expensesReducer;
