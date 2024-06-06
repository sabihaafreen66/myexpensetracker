// src/components/Profile.js
import React, { useEffect, useState } from 'react';
import { auth, db } from '../firebaseConfig';
import { doc, getDoc, setDoc } from 'firebase/firestore';
import { updateProfile } from 'firebase/auth';

const Profile = () => {
    const [profile, setProfile] = useState({
        displayName: '',
        photoURL: '',
        phoneNumber: ''
    });
    const [loading, setLoading] = useState(true);
    const [editing, setEditing] = useState(false);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const user = auth.currentUser;
                if (user) {
                    const userDoc = await getDoc(doc(db, "users", user.uid));
                    if (userDoc.exists()) {
                        const userData = userDoc.data();
                        setProfile({
                            displayName: user.displayName || '',
                            photoURL: userData.photoURL || '',
                            phoneNumber: userData.phoneNumber || ''
                        });
                        console.log('Profile fetched successfully:', {
                            displayName: user.displayName,
                            photoURL: userData.photoURL,
                            phoneNumber: userData.phoneNumber
                        });
                    }
                    setLoading(false);
                }
            } catch (error) {
                setError('Failed to fetch profile');
                setLoading(false);
            }
        };
        fetchProfile();
    }, []);

    const handleChange = (e) => {
        const { name, value } = e.target;
        setProfile((prevProfile) => ({
            ...prevProfile,
            [name]: value
        }));
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            const user = auth.currentUser;
            if (user) {
                await updateProfile(user, { displayName: profile.displayName });
                await setDoc(doc(db, "users", user.uid), { photoURL: profile.photoURL, phoneNumber: profile.phoneNumber }, { merge: true });
                alert('Profile updated successfully!');
                setEditing(false);
            }
        } catch (error) {
            setError('Failed to update profile');
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    // Check if profile is complete
    const isProfileComplete = profile.displayName && profile.photoURL && profile.phoneNumber;
    console.log('Is profile complete?', isProfileComplete);
    console.log('Profile state:', profile);

    return (
        <div className="container">
            <h2>User Profile</h2>
            {error && <p style={{ color: 'red' }}>{error}</p>}
            {!editing ? (
                <div>
                    <p><strong>Display Name:</strong> {profile.displayName}</p>
                    <p><strong>Photo URL:</strong> {profile.photoURL}</p>
                    <p><strong>Phone Number:</strong> {profile.phoneNumber}</p>
                    {isProfileComplete ? (
                        <button onClick={() => setEditing(true)}>Edit</button>
                    ) : (
                        <p>Complete all fields to edit your profile.</p>
                    )}
                </div>
            ) : (
                <form onSubmit={handleSubmit}>
                    <input
                        type="text"
                        name="displayName"
                        value={profile.displayName}
                        onChange={handleChange}
                        placeholder="Display Name"
                        required
                    />
                    <input
                        type="url"
                        name="photoURL"
                        value={profile.photoURL}
                        onChange={handleChange}
                        placeholder="Profile Photo URL"
                        required
                    />
                    <input
                        type="text"
                        name="phoneNumber"
                        value={profile.phoneNumber}
                        onChange={handleChange}
                        placeholder="Phone Number"
                    />
                    <button type="submit">Save</button>
                    <button type="button" onClick={() => setEditing(false)}>Cancel</button>
                </form>
            )}
        </div>
    );
};

export default Profile;
