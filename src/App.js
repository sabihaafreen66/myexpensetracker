import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import Signup from './components/Signup';
import Login from './components/Login';
import Welcome from './components/Welcome';
import CompleteProfile from './components/CompleteProfile';
import Profile from './components/Profile';
import ExpenseForm from './components/ExpenseForm';
//import ExpenseList from './components/ExpenseList';
import { auth, db } from './firebaseConfig';
import { collection, addDoc, getDocs, query, where } from 'firebase/firestore';

const App = () => {
  const [expenses, setExpenses] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        setIsAuthenticated(true);
        fetchExpenses();
      } else {
        setIsAuthenticated(false);
      }
    });

    return () => unsubscribe();
  }, []);

  const addExpense = async (expense) => {
    try {
      const user = auth.currentUser;
      if (!user) return;
      const userEmail = user.email;

      const docRef = await addDoc(collection(db, 'expenses'), {
        ...expense,
        userId: userEmail
      });
      if (docRef.id) {
        setExpenses([...expenses, { id: docRef.id, ...expense }]);
      }
    } catch (e) {
      console.error("Error adding document: ", e);
    }
  };

  const fetchExpenses = async () => {
    try {
      const user = auth.currentUser;
      if (!user) return;
      const userEmail = user.email;

      const q = query(collection(db, 'expenses'), where('userId', '==', userEmail));
      const querySnapshot = await getDocs(q);
      const expensesData = querySnapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
      setExpenses(expensesData);
    } catch (e) {
      console.error("Error fetching documents: ", e);
    }
  };

  return (
    <Router>
      <div className="App">
        <Header isAuthenticated={isAuthenticated} />
        <Routes>
          <Route path="/signup" element={<Signup />} />
          <Route path="/login" element={<Login />} />
          <Route path="/welcome" element={<Welcome />} />
          <Route path="/complete-profile" element={<CompleteProfile />} />
          <Route path="/profile" element={<Profile />} />
          <Route
            path="/expenses"
            element={<ExpensesPage addExpense={addExpense} expenses={expenses} fetchExpenses={fetchExpenses} />}
          />
          <Route path="/" element={<Signup />} />
        </Routes>
      </div>
    </Router>
  );
};

const Header = ({ isAuthenticated }) => {
  const navigate = useNavigate();

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
    <header>
      {isAuthenticated && <button onClick={() => navigate('/expenses')}>Expenses</button>}
      <button onClick={handleLogout}>Logout</button>
    </header>
  );
};

const ExpensesPage = ({ addExpense, expenses, fetchExpenses }) => {
  useEffect(() => {
    fetchExpenses();
  }, [fetchExpenses]);

  return (
    <div>
      <ExpenseForm addExpense={addExpense} />
      {/* Optionally, render the ExpenseList component here */}
    </div>
  );
};

export default App;
