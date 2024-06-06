// src/components/Welcome.js
import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db, updateProfile, setDoc, doc } from '../firebaseConfig';
import { getDoc } from 'firebase/firestore';

const Welcome = () => {
    const [profile, setProfile] = useState(null);
    const [loading, setLoading] = useState(true);
    const [editing, setEditing] = useState(false);

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

    const handleSubmit = async (event) => {
        event.preventDefault();
        try {
            const user = auth.currentUser;
            if (user) {
                await updateProfile(user, { displayName: profile.displayName });
                await setDoc(doc(db, "users", user.uid), profile, { merge: true });
                setEditing(false);
                alert("Profile updated successfully!");
            }
        } catch (error) {
            console.error(error);
            alert("Failed to update profile!");
        }
    };

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
                    {profile && (
                        <>
                            <button onClick={() => setEditing(true)}>Edit Profile</button>
                            {editing && (
                                <form onSubmit={handleSubmit}>
                                    <input
                                        type="text"
                                        placeholder="Display Name"
                                        value={profile.displayName}
                                        onChange={(e) => setProfile({ ...profile, displayName: e.target.value })}
                                        required
                                    />
                                    <input
                                        type="url"
                                        placeholder="Profile Photo URL"
                                        value={profile.photoURL}
                                        onChange={(e) => setProfile({ ...profile, photoURL: e.target.value })}
                                        required
                                    />
                                    <button type="submit">Save Changes</button>
                                </form>
                            )}
                        </>
                    )}
                </div>
            )}
        </div>
    );
};

export default Welcome;
