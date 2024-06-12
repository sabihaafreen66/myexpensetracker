// src/App.js
import React, { useState, useEffect } from 'react';
import { Route, Routes, useNavigate } from 'react-router-dom';
import { useDispatch } from 'react-redux';
import './App.css';
import Signup from './components/Signup';
import Login from './components/Login';
import Welcome from './components/Welcome';
import CompleteProfile from './components/CompleteProfile';
import Profile from './components/Profile';
import ExpenseForm from './components/ExpenseForm';
import ExpensesPage from './components/ExpensesPage';
import { auth } from './firebaseConfig';

const App = () => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        setIsAuthenticated(true);
        navigate('/expenses');
      } else {
        setIsAuthenticated(false);
      }
    });

    return () => unsubscribe();
  }, [navigate]);

  const handleLogout = () => {
    auth.signOut()
      .then(() => {
        localStorage.removeItem('idToken');
        navigate('/login');
      })
      .catch((error) => {
        console.error("Error signing out: ", error);
      });
  };

  return (
    <div className="App">
      <Header isAuthenticated={isAuthenticated} handleLogout={handleLogout} />
      <Routes>
        <Route path="/signup" element={<Signup />} />
        <Route path="/login" element={<Login />} />
        <Route path="/welcome" element={<Welcome />} />
        <Route path="/complete-profile" element={<CompleteProfile />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/expenses" element={<ExpensesPage />} />
        <Route path="/" element={<Signup />} />
      </Routes>
    </div>
  );
};

const Header = ({ isAuthenticated, handleLogout }) => {
  const navigate = useNavigate();

  return (
    <header>
      {isAuthenticated && <button onClick={() => navigate('/expenses')}>Expenses</button>}
      <button onClick={handleLogout}>Logout</button>
    </header>
  );
};

export default App;
