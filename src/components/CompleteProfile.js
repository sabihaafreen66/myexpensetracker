// src/components/CompleteProfile.js
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, db } from '../firebaseConfig';
import { updateProfile } from "firebase/auth";
import { doc, setDoc } from "firebase/firestore";

const CompleteProfile = () => {
    const [displayName, setDisplayName] = useState('');
    const [photoURL, setPhotoURL] = useState('');
    const [error, setError] = useState(null);
    const navigate = useNavigate();

    const handleUpdateProfile = async (event) => {
        event.preventDefault();
        try {
            const user = auth.currentUser;
            if (user) {
                await updateProfile(user, { displayName, photoURL });
                await setDoc(doc(db, "users", user.uid), { photoURL }, { merge: true });
                alert("Profile updated successfully!");
                setError(null);
                navigate('/welcome');
            } else {
                throw new Error("No user is signed in");
            }
        } catch (error) {
            setError(error.message);
            console.error(error);
            alert(error.message);
        }
    };

    return (
        <div className="container">
            <h2>Complete Profile</h2>
            <form onSubmit={handleUpdateProfile}>
                <input
                    type="text"
                    placeholder="Display Name"
                    value={displayName}
                    onChange={(e) => setDisplayName(e.target.value)}
                    required
                />
                <input
                    type="url"
                    placeholder="Profile Photo URL"
                    value={photoURL}
                    onChange={(e) => setPhotoURL(e.target.value)}
                    required
                />
                {error && <p style={{ color: 'red' }}>{error}</p>}
                <button type="submit">Update</button>
            </form>
        </div>
    );
};

export default CompleteProfile;
