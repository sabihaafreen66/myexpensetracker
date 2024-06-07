// import React, { useState } from 'react';
// import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
// import './App.css';
// import Signup from './components/Signup';
// import Login from './components/Login';
// import Welcome from './components/Welcome';
// import CompleteProfile from './components/CompleteProfile';
// import Profile from './components/Profile';
// import ExpenseForm from './components/ExpenseForm';
// import ExpenseList from './components/ExpenseList';
// import { auth } from './firebaseConfig';

// const App = () => {
//   const [expenses, setExpenses] = useState([]);

//   const addExpense = (expense) => {
//     setExpenses([...expenses, expense]);
//   };

//   return (
//     <Router>
//       <div className="App">
//         <Header />
//         <Routes>
//           <Route path="/signup" element={<Signup />} />
//           <Route path="/login" element={<Login />} />
//           <Route path="/welcome" element={<Welcome />} />
//           <Route path="/complete-profile" element={<CompleteProfile />} />
//           <Route path="/profile" element={<Profile />} />
//           <Route path="/expenses" element={<ExpensesPage addExpense={addExpense} expenses={expenses} />} />
//           <Route path="/" element={<Signup />} /> {/* Default to Signup */}
//         </Routes>
//       </div>
//     </Router>
//   );
// };

// const Header = () => {
//   const navigate = useNavigate();

//   const handleLogout = () => {
//     auth.signOut()
//       .then(() => {
//         localStorage.removeItem('idToken'); // Clear idToken from local storage
//         navigate('/login'); // Redirect to login page
//       })
//       .catch((error) => {
//         console.error("Error signing out: ", error);
//       });
//   };

//   return (
//     <header>
//       <button onClick={handleLogout}>Logout</button>
//       </header>
//   );
// };

// const ExpensesPage = ({ addExpense, expenses }) => {
//   return (
//     <div>
//       <ExpenseForm addExpense={addExpense} />
//       <ExpenseList expenses={expenses} />
//     </div>
//   );
// };

// export default App;
import React, { useState, useEffect } from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import Signup from './components/Signup';
import Login from './components/Login';
import Welcome from './components/Welcome';
import CompleteProfile from './components/CompleteProfile';
import Profile from './components/Profile';
import ExpenseForm from './components/ExpenseForm';
import ExpenseList from './components/ExpenseList';
import { auth } from './firebaseConfig';

const App = () => {
  const [expenses, setExpenses] = useState([]);
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  const addExpense = (expense) => {
    setExpenses([...expenses, expense]);
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged(user => {
      if (user) {
        setIsAuthenticated(true);
      } else {
        setIsAuthenticated(false);
      }
    });

    return () => unsubscribe();
  }, []);

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
          <Route path="/expenses" element={<ExpensesPage addExpense={addExpense} expenses={expenses} />} />
          <Route path="/" element={<Signup />} /> {/* Default to Signup */}
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
        localStorage.removeItem('idToken'); // Clear idToken from local storage
        navigate('/login'); // Redirect to login page
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

const ExpensesPage = ({ addExpense, expenses }) => {
  return (
    <div>
      <ExpenseForm addExpense={addExpense} />
      <ExpenseList expenses={expenses} />
    </div>
  );
};

export default App;
