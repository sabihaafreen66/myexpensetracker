// src/components/Welcome.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../firebaseConfig';
import { doc, getDoc } from 'firebase/firestore';

const Welcome = () => {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const navigate = useNavigate();

    useEffect(() => {
        const fetchProfile = async () => {
            const user = auth.currentUser;
            if (user) {
                const userDoc = await getDoc(doc(db, "users", user.uid));
                setProfile({ ...userDoc.data(), displayName: user.displayName });
                setLoading(false);
            }
        };
        fetchProfile();
    }, []);

    const isProfileIncomplete = !profile || !profile.displayName || !profile.photoURL;

    return (
        <div className="container">
            <h2>Welcome to Expense Tracker</h2>
            {loading && <p>Loading...</p>}
            {isProfileIncomplete && (
                <p>Your profile is incomplete. <button onClick={() => navigate('/complete-profile')}>Click here to complete</button></p>
            )}
            {!isProfileIncomplete && !loading && (
                <div>
                    <p>Welcome, {profile.displayName}!</p>
                    {/* Add other content for the welcome page */}
                </div>
            )}
        </div>
    );
};

export default Welcome;
