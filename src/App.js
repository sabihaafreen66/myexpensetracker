// src/App.js
import React from 'react';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Signup from './components/Signup';
import Login from './components/Login';
import Welcome from './components/Welcome';
import CompleteProfile from './components/CompleteProfile';
import Profile from './components/Profile';

function App() {
    return (
        <Router>
            <div className="App">
                <Routes>
                    <Route path="/signup" element={<Signup />} />
                    <Route path="/login" element={<Login />} />
                    <Route path="/welcome" element={<Welcome />} />
                    <Route path="/complete-profile" element={<CompleteProfile />} />
                    <Route path="/profile" element={<Profile />} />
                    <Route path="/" element={<Signup />} /> {/* Default to Signup */}
                </Routes>
            </div>
        </Router>
    );
}



export default App;
