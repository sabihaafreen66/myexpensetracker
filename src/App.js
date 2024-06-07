// import React from 'react';
// import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
// import './App.css';
// import Signup from './components/Signup';
// import Login from './components/Login';
// import Welcome from './components/Welcome';
// import CompleteProfile from './components/CompleteProfile';
// import Profile from './components/Profile';

// function App() {
//     return (
//         <Router>
//             <div className="App">
//                 <Routes>
//                     <Route path="/signup" element={<Signup />} />
//                     <Route path="/login" element={<Login />} />
//                     <Route path="/welcome" element={<Welcome />} />
//                     <Route path="/complete-profile" element={<CompleteProfile />} />
//                     <Route path="/profile" element={<Profile />} />
//                     <Route path="/" element={<Signup />} /> {/* Default to Signup */}
//                 </Routes>
//             </div>
//         </Router>
//     );
// }
import React from 'react';
import { BrowserRouter as Router, Route, Routes, useNavigate } from 'react-router-dom';
import './App.css';
import Signup from './components/Signup';
import Login from './components/Login';
import Welcome from './components/Welcome';
import CompleteProfile from './components/CompleteProfile';
import Profile from './components/Profile';
import { auth } from './firebaseConfig';

function App() {
    return (
        <Router>
            <div className="App">
                <Header />
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

const Header = () => {
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
            <button onClick={handleLogout}>Logout</button>
        </header>
    );
};

export default App;


