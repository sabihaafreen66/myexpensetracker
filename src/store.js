// src/store.js
import { createStore, combineReducers, applyMiddleware } from 'redux';
import {thunk} from 'redux-thunk';
import authReducer from './reducers/authReducer';
import expensesReducer from './reducers/expensesReducer';
import themeReducer from './reducers/themeReducer';

const rootReducer = combineReducers({
  auth: authReducer,
  expenses: expensesReducer,
  theme: themeReducer,
});

const store = createStore(rootReducer, applyMiddleware(thunk));

export default store;
